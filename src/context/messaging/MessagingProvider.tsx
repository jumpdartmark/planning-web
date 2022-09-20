import React, { useState, useEffect, useCallback, PropsWithChildren } from "react";
import { io, Socket } from "socket.io-client";

import MessagingContext, {iMessagingContext} from "./MessagingContext";

export interface MessagingProviderProps{}

const MessagingProvider: React.FC<PropsWithChildren<MessagingProviderProps>> = ({children}) => {
    const [socket, setSocket] = useState<Socket>();
    const [isConnected, setIsConnected] = useState(false);

    const serverUrl = process.env.REACT_APP_SERVER_URL;

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
    }, [serverUrl]);

    const joinRoom = (roomName:string, socket?: Socket ) => {
        if(!socket || !socket.connected){
            console.warn(`could not emit join message for room ${roomName}`);
            return;
        }
        socket.emit('join-room', roomName);
    };

    const leaveRoom = (roomName:string, socket?: Socket ) => {
        if(!socket || !socket.connected){
            console.warn(`could not emit leave message for room ${roomName}`);
            return;
        }
        socket.emit('leave-room', roomName);
    };

    const joinPoker = useCallback(() => {
        joinRoom('planning-poker', socket);
    }, [socket]);
    const joinPokerSession = useCallback((sessionId: string) => {
        joinRoom(`planning-poker-${sessionId}`, socket);
    }, [socket]);
    const leavePoker = useCallback(() => {
        leaveRoom('planning-poker', socket);
    }, [socket]);
    const leavePokerSession = useCallback((sessionId: string) => {
        leaveRoom(`planning-poker-${sessionId}`, socket);
    }, [socket]);

    const contextValue: iMessagingContext = {
        joinPoker,
        joinPokerSession,
        leavePoker,
        leavePokerSession,
        providerEstablished: true,
    };

    return (
        <MessagingContext.Provider value={contextValue}>{children}</MessagingContext.Provider>
    );
};

export default MessagingProvider;