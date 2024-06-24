import { getMapInfo } from "$lib";
import { db } from "$lib/server/db";
import { mappools, maps } from "$lib/server/schema";
import type { Difficulty } from "$lib/types";
import { eq } from "drizzle-orm";

export async function load({ params }) {
    let pool = await db.select({
        id: mappools.id,
        name: mappools.name,
        maps: mappools.maps,
    }).from(mappools).where(eq(mappools.id, params.id)).limit(1);

    let webMaps = [];
    for (let map of pool[0].maps) {
        let mapData = await db.select({
            hex: maps.hex,
            diff: maps.diff
        }).from(maps).where(eq(maps.id, map)).limit(1);
        
        let webData = await getMapInfo(mapData[0].hex, mapData[0].diff as Difficulty);
        webMaps.push(webData);
    }

    console.log(webMaps)

    return {
        props: {
            pool: pool[0],
            maps: webMaps
        }
    }
}