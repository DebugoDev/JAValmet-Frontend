// src/pages/settings/components/AddUserModal.tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
}

const AddUserModal = ({ open, onClose }: AddUserModalProps) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const handleAdd = () => {
    // Aqui você pode integrar com a API futuramente
    console.log("E-mail do novo usuário:", email);
    setEmail("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("Novo Usuário")}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={t("email")}
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("cancelar")}</Button>
        <Button variant="contained" onClick={handleAdd}>{t("confirmar")}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserModal;
