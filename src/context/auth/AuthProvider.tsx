import React, { useState, PropsWithChildren } from "react";

import AuthContext from "./AuthContext";
import {PlanningUser} from "../../types";

export interface AuthProviderProps{
    providedUser?: PlanningUser;
}

const AuthProvider: React.FC<PropsWithChildren<AuthProviderProps>> = ({providedUser, children}) => {
    const [user, setUser] = useState<PlanningUser|undefined>(providedUser);
    return (
        <AuthContext.Provider value={{user, setUser}}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;