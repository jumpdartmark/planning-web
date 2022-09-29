import React, {ChangeEvent, useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import {PlanningUser} from "../types";

export interface EditUserProps{
    user?: PlanningUser,
    onUpdate: (user: PlanningUser) => void,
}

const EditUser: React.FC<EditUserProps> = ({user, onUpdate}) => {
    const [userName, setUserName] = useState(user?.name ?? "");

    const onUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newName = event.target.value;
        setUserName(newName);
    };

    const saveChanges = () => {
        const newUser: PlanningUser = new PlanningUser(userName, user?.id);
        onUpdate(newUser);
    };

    return (
        <div>
            <TextField id="outlined-basic" label="User Name" variant="outlined" value={userName} onChange={onUserNameChange} />
            <Button onClick={saveChanges}>{user ? "Save" : "Login"}</Button>
        </div>
    );
};

export default EditUser;