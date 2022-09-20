import axios from "axios";

import { PokerSession, PokerSessionConfig, PokerItem } from "../../types";

const useApi = () => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const baseUrl = `${serverUrl}/api/poker`;

    const getPokerSessions = async() => {
        const sessions = await axios.get(`${baseUrl}/sessions`);
        return sessions.data as PokerSession[];
    }

    const getPokerSessionById = async(sessionId:String) => {
        const sessions = await axios.get(`${baseUrl}/sessions/${sessionId}`);
        return sessions.data as PokerSession[];
    }

    const getPokerSessionItems = async(sessionId:String) => {
        const sessions = await axios.get(`${baseUrl}/sessions/${sessionId}/items`);
        return sessions.data as PokerSession[];
    }

    const getPokerSessionParticipants = async(sessionId:String) => {
    }

    const addPokerSession = async(config: PokerSessionConfig) => {
    }

    const modifyPokerSession = async(sessionId:String, config: PokerSessionConfig) => {
    }

    const addPokerSessionItem = async(sessionId:String, title:string, description?: string) => {
    }

    const getSessionItem = async(sessionItemId:string) => {
    }

    const editPokerSessionItem = async(itemChanges: PokerItem) => {
    }

    const removePokerSessionItem = async(sessionItemId: string) => {
    }

    const voteOnPokerSessionItem = async(sessionItemId: string, playerId: string, vote?: string) => {
    }

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
