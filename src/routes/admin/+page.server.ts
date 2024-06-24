import { db } from "$lib/server/db";
import { players as pt, teams as teamsTable, mappools, maps} from "$lib/server/schema";
// import type { MapPool } from "$lib/types";
import { eq } from "drizzle-orm";

export async function load() {
    let players = await db.select({
        game_id: pt.game_id,
        team: pt.team_id,
    }).from(pt);

    let teams = await db.select({
        id: teamsTable.id,
        name: teamsTable.name,
        avatar: teamsTable.avatar,
    }).from(teamsTable);

    let pools = await db.select({
        id: mappools.id,
        name: mappools.name,
        maps: mappools.maps,
    }).from(mappools);

    return {
        props: {
            teams: teams,
            pools: pools,
            players: players
        }
    }
}