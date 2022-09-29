import React, { useState, useEffect, useCallback, PropsWithChildren } from "react";
import { io, Socket } from "socket.io-client";

import MessagingContext, {iMessagingContext} from "./MessagingContext";
import {PlanningMessage, PlanningUser} from "../../types";
import useAuth from "../auth/useAuth";

export interface MessagingProviderProps{}

const sendMessage = (socket: Socket, user: PlanningUser, messageChannel: string, messagePayload: any) => {
    const message: PlanningMessage = {
        user,
        payload: messagePayload,
    };
    socket.emit(messageChannel, message);
}

const MessagingProvider: React.FC<PropsWithChildren<MessagingProviderProps>> = ({children}) => {
    const { user } = useAuth();
    const [socket, setSocket] = useState<Socket>();
    const [isConnected, setIsConnected] = useState(false);
    const [localUser, setLocalUser] = useState(user);

    const serverUrl = process.env.REACT_APP_SERVER_URL;

    useEffect(() => {
        setLocalUser(user);
    },[user]);

    useEffect(() => {
        if(!serverUrl){
            return;
        }
        const localSocket = io(serverUrl);
        localSocket.on("connect", () => {
            setIsConnected(true);
        });
        localSocket.on("disconnect", () => {
            setIsConnected(false);
        });
        setSocket(localSocket);
        return(() => {
            if(socket?.connected){
                socket.disconnect();
            }
        });
    }, [serverUrl, socket]);

    const joinRoom = useCallback((roomName:string, socket?: Socket ) => {
        if (!localUser) { return; }
        if(!socket || !socket.connected){
            console.warn(`could not emit join message for room ${roomName}`);
            return;
        }
        sendMessage(socket, localUser, 'join-room', roomName);
    },[localUser]);

    const leaveRoom = useCallback((roomName:string, socket?: Socket ) => {
        if (!localUser) { return; }
        if(!socket || !socket.connected){
            console.warn(`could not emit leave message for room ${roomName}`);
            return;
        }
        sendMessage(socket, localUser, 'leave-room', roomName);
    },[localUser]);

    const joinPoker = useCallback(() => {
        joinRoom('planning-poker', socket);
    }, [joinRoom, socket]);
    const joinPokerSession = useCallback((sessionId: string) => {
        joinRoom(`planning-poker-${sessionId}`, socket);
    }, [joinRoom, socket]);
    const leavePoker = useCallback(() => {
        leaveRoom('planning-poker', socket);
    }, [leaveRoom, socket]);
    const leavePokerSession = useCallback((sessionId: string) => {
        leaveRoom(`planning-poker-${sessionId}`, socket);
    }, [leaveRoom, socket]);

    const contextValue: iMessagingContext = {
        joinPoker,
        joinPokerSession,
        leavePoker,
        leavePokerSession,
        providerEstablished: true,
        isConnected,
    };

    return (
        <MessagingContext.Provider value={contextValue}>{children}</MessagingContext.Provider>
    );
};

export default MessagingProvider;