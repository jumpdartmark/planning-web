
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
    cardOptions: string[]
}

export interface PokerParticipant{
    name: string;
    isActive: boolean;
    role: PlayerRole;
}

export interface PokerSession{
    config: PokerSessionConfig;
    items: PokerItem[];
    participants: PokerParticipant[];
}