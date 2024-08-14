import React from "react";
import {
    TableCell,
    TableRow,
    Avatar,
    IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function UserRow({ user, setCurrentUser, handleOpenModal }) {
    return (
        <TableRow key={user.id}>
            <TableCell>
                <Avatar alt={user.name} src={user.avatar} />
            </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell align="right">
                <IconButton
                    aria-label="deletar"
                    color="primary"
                    onClick={() => {
                        setCurrentUser(user);
                        handleOpenModal();
                    }}
                >
                    <EditIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}
