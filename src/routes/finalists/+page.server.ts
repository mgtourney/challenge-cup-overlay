import { db } from "$lib/server/db";
import { players as pt, teams as teamsTable } from "$lib/server/schema";

export async function load() {
    let players = await db.select({
        game_id: pt.game_id,
        team: pt.team_id,
        captian: pt.captian
    }).from(pt);

    let teams = await db.select({
        id: teamsTable.id,
        name: teamsTable.name,
        avatar: teamsTable.avatar,
    }).from(teamsTable);

    return {
        props: {
            teams: teams,
            players: players
        }
    }
}