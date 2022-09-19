import React from "react";

import { PokerSession } from "../types";

export interface ActivePokerSessionViewProps{
    session: PokerSession;
}

const ActivePokerSessionView: React.FC<ActivePokerSessionViewProps> = ({session}) => {
    return (
        <div>
            <div></div>
        </div>
    );
};

export default ActivePokerSessionView;