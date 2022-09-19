import React from "react";
import {PlanningUser} from "../../types";

export interface iAuthContext{
    user?: PlanningUser;
    setUser: (user:PlanningUser|undefined) => void;
}

const AuthContext = React.createContext<iAuthContext>({
    user: undefined,
    setUser: () => {},
});

export default AuthContext