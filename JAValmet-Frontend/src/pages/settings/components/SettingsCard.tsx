// src/pages/settings/components/SettingsCard.tsx
import { useEffect, useState } from 'react';
import {
  Card,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@mui/material';

import { useTranslation } from 'react-i18next';

import AddUserModal from "./AddUserModal";
import LogoValmet from "../../../assets/logo-valmet.png";
import style from "../style.module.css";

const SettingsCard = () => {
  const { t, i18n } = useTranslation();

  const [language, setLanguage] = useState(i18n.language || "pt");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <>
      <Card elevation={3} sx={{
        width: 600,
        maxWidth: "100%",
        padding: "30px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        boxShadow: 15
      }}>
        <img id={style.logo} src={LogoValmet} alt="Logo Valmet" />
        <Typography variant="h5">{t("settings")}</Typography>

        <Divider sx={{ width: '100%' }} />

        {/* Idioma */}
        <FormControl fullWidth>
          <InputLabel>{t("language")}</InputLabel>
          <Select
            value={language}
            label={t("language")}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <MenuItem value="pt">Português</MenuItem>
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="es">Español</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setModalOpen(true)}
        >
          {t("Novo Usuário")}
        </Button>
      </Card>

      <AddUserModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default SettingsCard;
