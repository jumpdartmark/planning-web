import React from "react";
import {PlanningUser} from "../../types";

export interface iAuthContext{
    user?: PlanningUser;
    setUser: (user:PlanningUser|undefined) => void;
    providerEstablished: boolean;
}

const AuthContext = React.createContext<iAuthContext>({
    user: undefined,
    setUser: () => {},
    providerEstablished: false,
});

export default AuthContext