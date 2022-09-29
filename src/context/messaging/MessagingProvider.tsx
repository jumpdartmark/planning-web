import React, { useState, useEffect, useCallback, PropsWithChildren } from "react";
import { io, Socket } from "socket.io-client";

import MessagingContext, {iMessagingContext} from "./MessagingContext";
import {PlanningMessage, PlanningUser} from "../../types";
import useAuth from "../auth/useAuth";
import CONSTANTS from "../../constants";

export interface MessagingProviderProps{}

const sendMessage = (socket: Socket, user: PlanningUser, messageChannel: string, messagePayload: any) => {
    const message: PlanningMessage = {
        user,
        payload: messagePayload,
    };
    console.log(`emmitting message ${messageChannel}`, message);
    socket.emit(messageChannel, message);
}

const MessagingProvider: React.FC<PropsWithChildren<MessagingProviderProps>> = ({children}) => {
    const { user } = useAuth();
    const [socket, setSocket] = useState<Socket>();
    const [isConnected, setIsConnected] = useState(false);
    const [localUser, setLocalUser] = useState(user);
    const [pokerUpdateHandler, setPokerUpdateHandler] = useState<(args:any[])=>void>(console.log);
    const [pokerSessionUpdateHandler, setPokerSessionUpdateHandler] = useState<(args:any[])=>void>(console.info);

    const serverUrl = process.env.REACT_APP_SERVER_URL;

    useEffect(() => {
        setLocalUser(user);
    },[user]);

    useEffect(() => {
        if(!serverUrl){
            return;
        }
        const localSocket = io(serverUrl);
        localSocket.onAny((m) => {
            console.log("&&&&&&&&&&&&&&&&&&&&&&");
            console.log(m);
        });
        localSocket.on(CONSTANTS.MESSAGING.POKER_UPDATE_MESSAGE, (m) => {
            console.log("&&&&&&&&&CONSTANTS.MESSAGING.POKER_UPDATE_MESSAGE&&&&&&&&&&&&&");
            console.log(m);
        });
        localSocket.on("connect", () => {
            localSocket.emit("woohoo","I think it worked");
            console.log("connect");
            setIsConnected(true);
        });
        localSocket.on("disconnect", () => {
            console.log("disconnect");
            setIsConnected(false);
        });
        setSocket(localSocket);
        return(() => {
            localSocket.off('connect');
            localSocket.off('disconnect');
            if(localSocket?.connected){
                localSocket.disconnect();
            }
        });
    }, [serverUrl]);

    /*
    useEffect(() => {
        if(socket){
            socket.off(CONSTANTS.MESSAGING.POKER_SESSION_MESSAGE);
            socket.on(CONSTANTS.MESSAGING.POKER_SESSION_MESSAGE, pokerSessionUpdateHandler);
        }
        return(() => {
            if(socket){
                socket.off(CONSTANTS.MESSAGING.POKER_SESSION_MESSAGE);
            }
        });
    }, [socket, pokerUpdateHandler, pokerSessionUpdateHandler]);

    useEffect(() => {
        if(socket){
            socket.off(CONSTANTS.MESSAGING.POKER_UPDATE_MESSAGE);
            socket.on(CONSTANTS.MESSAGING.POKER_UPDATE_MESSAGE, pokerUpdateHandler);
        }
        return(() => {
            if(socket){
                socket.off(CONSTANTS.MESSAGING.POKER_UPDATE_MESSAGE);
            }
        });
    }, [socket, pokerUpdateHandler, pokerSessionUpdateHandler]);
    */

    const joinRoom = useCallback((roomName:string, socket?: Socket ) => {
        if (!localUser) { return; }
        if(!socket || !socket.connected){
            console.warn(`could not emit join message for room ${roomName}`);
            return;
        }
        console.log('joining room', roomName);
        sendMessage(socket, localUser, CONSTANTS.MESSAGING.JOIN_ROOM_MESSAGE, roomName);
    },[localUser]);

    const leaveRoom = useCallback((roomName:string, socket?: Socket ) => {
        if (!localUser) { return; }
        if(!socket || !socket.connected){
            console.warn(`could not emit leave message for room ${roomName}`);
            return;
        }
        sendMessage(socket, localUser, CONSTANTS.MESSAGING.LEAVE_ROOM_MESSAGE, roomName);
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