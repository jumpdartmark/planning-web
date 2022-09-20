import { useContext } from "react";

import MessagingContext from "./MessagingContext";

const useAuth = () => {
    const { joinPoker, joinPokerSession, leavePoker, leavePokerSession, providerEstablished } = useContext(MessagingContext);

    if (!providerEstablished) {
        throw new Error("useAuth requires existing MessagingProvider implementation");
    }

    return {
        joinPoker,
        joinPokerSession,
        leavePoker,
        leavePokerSession,
    };
};

export default useAuth;