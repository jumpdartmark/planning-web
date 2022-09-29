import React from "react";

import { PokerSession } from "../../types"

export interface iMessagingContext{
    joinPokerSession: (sessionId:string, onSessionUpdate: (update:PokerSession ) => void) => void;
    leavePokerSession: (sessionId:string) => void;
    joinPoker: () => void;
    leavePoker: () => void;
    providerEstablished: boolean;
    isConnected: boolean;
}

const MessagingContext = React.createContext<iMessagingContext>({
    joinPoker(): void {},
    joinPokerSession(sessionId: string, onSessionUpdate: (update: PokerSession) => void): void {},
    leavePoker(): void {},
    leavePokerSession(sessionId: string): void {},
    providerEstablished: false,
    isConnected: false,
});

export default MessagingContext;
