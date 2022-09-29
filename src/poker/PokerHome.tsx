import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate, NavLink } from "react-router-dom";
import useApi from "../context/api/useApi";

import { PokerSession } from "../types";
import useMessaging from "../context/messaging/useMessaging";
import useLogUpdates from "../hooks/useLogUpdates";

const PokerHome:React.FC = () => {
    const [ sessions, setSessions ] = useState<PokerSession[]>([]);
    const { joinPoker, leavePoker } = useMessaging();
    const navigate = useNavigate();
    const { getPokerSessions } = useApi();

    useLogUpdates({getPokerSessions, joinPoker, leavePoker},"PokerHome");


    useEffect(()=>{
        console.log('@@@@@@@@@@@@@@@@@');
        getPokerSessions().then(setSessions);
        joinPoker();
        return (()=>{
            leavePoker();
        });
    },[getPokerSessions, joinPoker, leavePoker]);

    const createNew = () => {
        navigate("new")
    };
    return (
        <div>
            <div>
                <Button onClick={createNew}>Create New Poker Session</Button>
            </div>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>Session</td>
                            <td>Items</td>
                            <td>Players</td>
                        </tr>
                        {sessions.map((sesh) => {
                            return (
                                <tr>
                                    <td><NavLink to={sesh.id}>{sesh.config.name}</NavLink></td>
                                    <td>{sesh.items.length}</td>
                                    <td>{sesh.participants.length}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PokerHome;