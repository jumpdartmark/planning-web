import { useContext } from "react";

import AuthContext from "./AuthContext";

const useAuth = () => {
    const { user, setUser, providerEstablished } = useContext(AuthContext);

    if (!providerEstablished) {
       throw new Error("useAuth requires existing AuthProvider implementation");
    }

    return {
        user,
        setUser,
    };
};

export default useAuth;