export enum Difficulty {
    Easy = "Easy",
    Normal = "Normal",
    Hard = "Hard",
    Expert = "Expert",
    ExpertPlus = "Expert+"
}

export enum TeamTypes {
    Red = "Red",
    Purple = "Purple",
}

export interface Team {
    name: string;
    icon: string;
    team: TeamTypes;
    score: number;
}

export interface MapPool {
    id: string;
    name: string;
    maps: Map[];
}

export interface Map {
    icon: string
    diff: Difficulty
    hex: string
    bpm: number
    name: string
    artist: string
    mapper: string
    pick_status: MapStatus
}

export enum RoundType {
    Winners = "Winners",
    Losers = "Losers",
}

export enum MapStatus {
    Banned = "banned",
    Picked = "picked",
    Tiebreaker = "tiebreaker",
    None = "none"
}

export interface ApiTeams {
    purple_id: string;
    purple_score: number;
    red_id: string;
    red_score: number;
    purple_name: string;
    red_name: string;
    purple_icon: string;
    red_icon: string;

    purple_players: string[];
    red_players: string[];
}