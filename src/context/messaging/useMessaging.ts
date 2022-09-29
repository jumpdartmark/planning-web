import { useContext } from "react";

import MessagingContext from "./MessagingContext";
import useLogUpdates from "../../hooks/useLogUpdates";

const useAuth = () => {
    const { joinPoker, joinPokerSession, leavePoker, leavePokerSession, providerEstablished } = useContext(MessagingContext);

    useLogUpdates({joinPoker, joinPokerSession, leavePoker, leavePokerSession, providerEstablished},"useAuth");

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