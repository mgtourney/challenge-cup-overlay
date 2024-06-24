use std::cell::Cell;

use poem::{get, handler, listener::TcpListener, middleware, post, web::{Json, Path}, EndpointExt, IntoResponse, Route, Server};
use serde::{Deserialize, Serialize};
use tokio::sync::RwLock;


const BIND_ADDR: &str = "127.0.0.1:5000";

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
struct MapPool {
    id: String,
    name: String,
    maps: Vec<Map>,
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
struct Map {
    icon: String,
    diff: Difficulty,
    hex: String,
    bpm: f32,
    name: String,
    artist: String,
    mapper: String,
    pick_status: MapStatus,
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
enum Difficulty {
    Easy,
    Normal,
    Hard,
    Expert,
    #[serde(rename = "Expert+")]
    ExpertPlus,
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
#[serde(rename_all = "lowercase")]
enum MapStatus {
    Banned,
    Picked,
    Tiebreaker,
    None,
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
struct Team {
    purple_id: Option<String>,
    red_id: Option<String>,
    purple_name: Option<String>,
    red_name: Option<String>,
    purple_icon: Option<String>,
    red_icon: Option<String>,
    purple_score: u32,
    red_score: u32,

    purple_players: Vec<String>,
    red_players: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
struct TeamReq {
    name: String,
    icon: String,
    players: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
struct Winners {
    first: String,
    second: String,
    third: String,
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
struct UpcommingMatch {
    team1_name: Option<String>,
    team2_name: Option<String>
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
struct Round {
    is_winners: bool,
    round_number: u32,
}

impl Team {
    const fn const_default() -> Self {
        Self {
            purple_id: None,
            red_id: None,
            purple_name: None,
            red_name: None,
            purple_icon: None,
            red_icon: None,
            purple_score: 0,
            red_score: 0,
            purple_players: Vec::new(),
            red_players: Vec::new(),
        }
    }
}

static CURRENT_POOL: RwLock<Option<MapPool>> = RwLock::const_new(None);
static CURRENT_TEAM: RwLock<Team> = RwLock::const_new(Team::const_default());
static CURRENT_WINNERS: RwLock<Option<Winners>> = RwLock::const_new(None);
static CURRENT_ROUND: RwLock<Round> = RwLock::const_new(Round { is_winners: false, round_number: 0 });
static CURRENT_MATCH: RwLock<UpcommingMatch> = RwLock::const_new(UpcommingMatch { team1_name: None, team2_name: None });

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    dotenv::dotenv().ok();
    tracing_subscriber::fmt().with_env_filter(tracing_subscriber::EnvFilter::from_default_env()).init();

    let app = Route::new()
        .at("/pool", post(set_current_pool).get(get_current_pool))
        .at("/teams", get(get_current_team))
        .at("/teams/:colour/:id", post(set_team_id))
        .at("/teams/:colour/score/:score", post(set_team_score))
        .at("/winners", post(set_winners).get(get_winners))
        .at("/round", post(set_round).get(get_round))
        .at("/upcoming", post(set_upcomming_match).get(get_upcomming_match))
        .with(middleware::Tracing)
        .with(middleware::Cors::new());

    Server::new(TcpListener::bind(BIND_ADDR))
        .run(app).await?;

    Ok(())
}

#[handler]
async fn set_upcomming_match(Json(match_data): Json<UpcommingMatch>) -> impl IntoResponse {
    let mut current_match = CURRENT_MATCH.write().await;
    *current_match = match_data;
    poem::http::StatusCode::CREATED.into_response()
}

#[handler]
async fn get_upcomming_match() -> impl IntoResponse {
    Json(&CURRENT_MATCH.read().await.clone()).into_response()
}

#[handler]
async fn set_round(Json(round): Json<Round>) -> impl IntoResponse {
    let mut current_round = CURRENT_ROUND.write().await;
    *current_round = round;
    poem::http::StatusCode::CREATED.into_response()
}

#[handler]
async fn get_round() -> impl IntoResponse {
    Json(&CURRENT_ROUND.read().await.clone()).into_response()
}

#[handler]
async fn set_winners(Json(winners): Json<Winners>) -> impl IntoResponse {
    let mut current_winners = CURRENT_WINNERS.write().await;
    *current_winners = Some(winners);
    poem::http::StatusCode::CREATED.into_response()
}

#[handler]
async fn get_winners() -> impl IntoResponse {
    Json(&CURRENT_WINNERS.read().await.as_ref()).into_response()
}

#[handler]
async fn set_team_id(Path((colour, id)): Path<(String, String)>, Json(team_name): Json<TeamReq>) -> impl IntoResponse {
    match colour.as_str() {
        "purple" => {
            let mut team = CURRENT_TEAM.write().await;
            team.purple_id = Some(id);
            team.purple_name = Some(team_name.name);
            team.purple_icon = Some(team_name.icon);
            team.purple_players = team_name.players;
        }
        "red" => {
            let mut team = CURRENT_TEAM.write().await;
            team.red_id = Some(id);
            team.red_name = Some(team_name.name);
            team.red_icon = Some(team_name.icon);
            team.red_players = team_name.players;
        }
        _ => return poem::http::StatusCode::BAD_REQUEST.into_response(),
    }
   
    poem::http::StatusCode::CREATED.into_response()
}

#[handler]
async fn set_team_score(Path((colour, score)): Path<(String, u32)>) -> impl IntoResponse {
    match colour.as_str() {
        "purple" => {
            let mut team = CURRENT_TEAM.write().await;
            team.purple_score = score;
        }
        "red" => {
            let mut team = CURRENT_TEAM.write().await;
            team.red_score = score;
        }
        _ => return poem::http::StatusCode::BAD_REQUEST.into_response(),
    }
   
    poem::http::StatusCode::CREATED.into_response()
}

#[handler]
async fn get_current_team() -> impl IntoResponse {
    Json(&CURRENT_TEAM.read().await.clone()).into_response()
}

#[handler]
async fn set_current_pool(Json(pool): Json<MapPool>) -> impl IntoResponse {
    let mut current_pool = CURRENT_POOL.write().await;
    *current_pool = Some(pool);
    poem::http::StatusCode::CREATED.into_response()
}

#[handler]
async fn get_current_pool() -> impl IntoResponse {
    Json(&CURRENT_POOL.read().await.as_ref()).into_response()
}