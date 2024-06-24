import { getPlayerInfo, type webPlayer } from "$lib";
import { db } from "$lib/server/db";
import { players as pt, teams as teamsTable} from "$lib/server/schema";
import { eq } from "drizzle-orm";

export async function load({ params }) {
    let team_id = params.id;

    let players = await db.select({
        game_id: pt.game_id,
    }).from(pt).where(eq(pt.team_id, team_id));

    let team: any = await db.select({
        id: teamsTable.id,
        name: teamsTable.name,
        avatar: teamsTable.avatar,
    }).from(teamsTable).where(eq(teamsTable.id, team_id)).limit(1);

    team[0].players = [];

    for (let player of players) {
        let playerInfo = await getPlayerInfo(player.game_id);
        if (playerInfo) {
            team[0].players.push(playerInfo);
        }            
    }

    return {
        props: {
            team: team[0] as {id: string, name: string, avatar: string, players: webPlayer[]}
        }
    }
}