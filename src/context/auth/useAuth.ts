import { useContext } from "react";

import AuthContext from "./AuthContext";
import {PlanningUser} from "../../types";

const useAuth = () => {
    const { user, setUser } = useContext(AuthContext);

    return {
        user,
        setUser,
    };
};

export default useAuth;