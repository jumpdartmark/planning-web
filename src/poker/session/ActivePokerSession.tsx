import React from "react";
import { useParams } from "react-router-dom";

const EditPokerSession:React.FC = () => {
    const { sessionID } = useParams<{sessionID:string}>()
    return (<div>Active Poker Session</div>);
};

export default EditPokerSession;