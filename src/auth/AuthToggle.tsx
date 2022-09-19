import React from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import useAuth from "../context/auth/useAuth";
import EditUser from "./EditUser"
import {PlanningUser} from "../types";

const AuthToggle: React.FC = () => {
    const { user, setUser } = useAuth();
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);
    const handleTriggerClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        setUser(undefined);
        setAnchorEl(null);
    };

    const editUser = () => {
        setModalOpen(true);
        setAnchorEl(null);
    };

    const updateUserFromModal = (user?:PlanningUser) => {
        setUser(user);
        setModalOpen(false);
    };

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <Modal open={modalOpen} className="MrMODAL">
                <Box sx={style}>
                    <EditUser user={user} onUpdate={updateUserFromModal} />
                </Box>
            </Modal>
            { user?.name ? (
                <>
                    <Button
                        id="demo-positioned-button"
                        aria-controls={menuOpen ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={menuOpen ? 'true' : undefined}
                        onClick={handleTriggerClick}
                    >
                        {user?.name}
                    </Button>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={menuOpen}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <MenuItem onClick={editUser}>Edit User</MenuItem>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                </>
            ) : (
                <>
                    <Button onClick={handleModalOpen}>
                        login
                    </Button>
                </>
            )}
        </div>
    );
};

export default AuthToggle;