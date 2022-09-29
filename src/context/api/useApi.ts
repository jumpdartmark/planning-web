import { useCallback } from "react";

import axios from "axios";

import { PokerSession, PokerSessionConfig, PokerItem } from "../../types";

const useApi = () => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const baseUrl = `${serverUrl}/api/poker`;

    const getPokerSessions = useCallback(async() => {
        const sessions = await axios.get(`${baseUrl}/sessions`);
        return sessions.data as PokerSession[];
    },[baseUrl]);

    const getPokerSessionById = useCallback(async(sessionId:String) => {
        const sessions = await axios.get(`${baseUrl}/sessions/${sessionId}`);
        return sessions.data as PokerSession;
    },[baseUrl]);

    const getPokerSessionItems = useCallback(async(sessionId:String) => {
        const sessions = await axios.get(`${baseUrl}/sessions/${sessionId}/items`);
        return sessions.data as PokerItem[];
    },[baseUrl]);

    const getPokerSessionParticipants = useCallback(async(sessionId:String) => {
    },[]);

    const addPokerSession = useCallback(async(config: PokerSessionConfig) => {
    },[]);

    const modifyPokerSession = useCallback(async(sessionId:String, config: PokerSessionConfig) => {
    },[]);

    const addPokerSessionItem = useCallback(async(sessionId:String, title:string, description?: string) => {
    },[]);

    const getSessionItem = useCallback(async(sessionItemId:string) => {
    },[]);

    const editPokerSessionItem = useCallback(async(itemChanges: PokerItem) => {
    },[]);

    const removePokerSessionItem = useCallback(async(sessionItemId: string) => {
    },[]);

    const voteOnPokerSessionItem = useCallback(async(sessionItemId: string, playerId: string, vote?: string) => {
    },[]);

    return {
        getPokerSessions,
        getPokerSessionById,
        getPokerSessionItems,
        getPokerSessionParticipants,
        addPokerSession,
        modifyPokerSession,
        addPokerSessionItem,
        getSessionItem,
        editPokerSessionItem,
        removePokerSessionItem,
        voteOnPokerSessionItem
    };
};

export default useApi;
