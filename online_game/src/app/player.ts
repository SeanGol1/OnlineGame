import { Card } from "./models/card";

export interface Player {
    username:string;
    connectionIds: string[];
    isHost: boolean;
    avatar: string;
    score: string;
    guess: string;
    timer: string;
    hand: Card[];
    order:number;
    total:number;
}