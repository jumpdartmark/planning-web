import { v4 as uuidv4 } from 'uuid';

export class PlanningUser{
    #name: string;
    #id: string;
    constructor(userName?:string, userId?:string) {
        this.#name = userName || "unknown";
        this.#id = userId || uuidv4().substring(0,5);
    }
    get name(){
        return this.#name;
    }
    set name(name:string){
        this.#name = name;
    }

    get id(){
        return this.#name;
    }
    set id(userId:string){
        this.#id = userId;
    }
}

export interface PokerVote{
    playerName: string;
    vote: string;
}

export enum PlayerRole{
    Spectator = 0,
    Player = 1,
}

export interface PokerItem{
    id: string;
    title: string;
    description: string;
    estimate: number;
}

export interface PokerSessionConfig{
    name: string;
    cardOptions: string[]
}

export interface PokerParticipant{
    name: string;
    isActive: boolean;
    role: PlayerRole;
}

export interface PokerSession{
    id: string;
    config: PokerSessionConfig;
    items: PokerItem[];
    participants: PokerParticipant[];
}

export interface PokerSessionSummary{
    id: string;
    title: string;
    itemCount:number;
    activeParticipantCount:number;
}

export interface PlanningMessage{
    user: PlanningUser;
    payload: any;
}