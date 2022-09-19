import React from "react";
import { Routes, Route } from "react-router-dom"
import PokerHome from "./PokerHome";
import ActivePokerSession from "./session/ActivePokerSession";
import EditPokerSession from "./session/EditPokerSession";

const PokerApp:React.FC = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<PokerHome/>}/>
                <Route path="/new" element={<EditPokerSession/>}/>
                <Route path="/:sessionId" element={<ActivePokerSession/>}/>
                <Route path="/:sessionId/manage" element={<EditPokerSession/>}/>
                <Route path="/:sessionId/summary" element={<EditPokerSession/>}/>
                <Route path="/:sessionId/vote" element={<EditPokerSession/>}/>
            </Routes>
        </div>
    );
};

export default PokerApp;