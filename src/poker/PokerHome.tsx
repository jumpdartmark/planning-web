import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import useApi from "../context/api/useApi";

const PokerHome:React.FC = () => {
    const [ sessions, setSessions ] = useState<any>();
    const navigate = useNavigate();
    const { getPokerSessions } = useApi();

    useEffect(()=>{
        getPokerSessions().then(setSessions);
    },[]);

    const createNew = () => {
        navigate("new")
    };
    return (
        <div>
            <div>
                <Button onClick={createNew}>Create New Poker Session</Button>
            </div>
            <div>
                {JSON.stringify(sessions, null, 3)}
            </div>
        </div>
    );
};

export default PokerHome;