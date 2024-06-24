import { writable, type Writable } from "svelte/store";
import {Difficulty, MapStatus, type Map, type MapPool } from "$lib/types";

// place files you want to import through the `$lib` alias in this folder.
export interface webPlayer {
    name: string;
    game_id: string;
    avatar: string;
}

export const getPlayerInfo = async (player_id: string): Promise<webPlayer | null> => {
    let res_ss = await fetch(`https://skillsaber.vercel.app/api/player?id=${player_id}`)
    if (res_ss.ok) {
        let data2 = await res_ss.json();
        return { name: data2.name, game_id: player_id, avatar: data2.profilePicture };
    } else {
        let res_bl = await fetch(`https://api.beatleader.xyz/player/${player_id}`);
        if (res_bl.ok) {
            let data = await res_bl.json();
            return { name: data.name, game_id: player_id, avatar: data.avatar };
        } else {
            return null;
        }
    }
}

export const getMapInfo = async (map_id: string, diff: Difficulty): Promise<Map | null> => {
    let map_data = await fetch(`https://api.beatsaver.com/maps/id/${map_id}`);

    if (map_data.ok) {
        let map_info = await map_data.json();
        return {
            icon: map_info.versions[0].coverURL,
            diff: diff,
            hex: map_info.id,
            bpm: map_info.metadata.bpm,
            name: map_info.metadata.songName,
            artist: map_info.metadata.songAuthorName,
            mapper: map_info.metadata.levelAuthorName,
            pick_status: MapStatus.None
        }
    }

    return null
}