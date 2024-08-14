import React, { useState, useEffect } from "react";
import { styles } from './styles';
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Title from "../Title";
import UserRow from "./UserRow";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import APIClient from "../../baseApi";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Nome requerido")
    .min(2, "O nome deve conter no mínimo 2 caracteres")
    .max(30, "O nome deve conter no mínimo 30 caracteres"),
});

export default function TableUser() {
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await APIClient.get("/customers");
      setUsers(response.data);
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    const response = await APIClient.put(`/customers/${currentUser.id}`, {
      ...currentUser,
      ...values,
    });

    if (response.status === 200) {
      setOpen(!open);
    }

    const updatedUser = { ...currentUser, ...values }
    setUsers([updatedUser, ...users])

    setSubmitting(false);
  };

  return (
    <React.Fragment>
      <Title>Lista de usuários</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user) => (
            <UserRow user={user} setCurrentUser={setCurrentUser} handleOpenModal={handleOpenModal} />
          ))}
        </TableBody>
      </Table>

      {open && currentUser && (
        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styles}>
            <Typography id="modal-modal-title" component="h2" variant="h5">
              Editar usuário
            </Typography>
            <Stack mt={2}>
              <Formik
                initialValues={{ name: currentUser.name }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Stack width="100%" gap={2}>
                      <div>
                        <Field name="name">
                          {(props) => (
                            <TextField
                              {...props.field}
                              id="name"
                              label="Nome"
                              variant="outlined"
                              fullWidth
                              error={props.meta.touched && !!props.meta.error}
                              helperText={
                                props.meta.touched && props.meta.error
                              }
                            />
                          )}
                        </Field>
                      </div>
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Enviar
                      </Button>
                    </Stack>
                  </Form>
                )}
              </Formik>
            </Stack>
          </Box>
        </Modal>
      )}
    </React.Fragment>
  );
}
