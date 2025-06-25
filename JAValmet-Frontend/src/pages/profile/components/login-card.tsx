import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import LogoValmet from "../../../assets/logo-valmet.png";
import style from "./style.module.css";

import { api } from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface User {
  name: string;
  email: string;
  position: string;
  phone?: string;
  department?: string;
}

const UserProfileCard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [imageURL, setImageURL] = useState("user.jpg");
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    position: "",
    phone: "",
    department: ""
  });

  useEffect(() => {
    const token = sessionStorage.getItem("Token");

    const fetchUser = async () => {
      try {
        const [imageRes, userRes] = await Promise.all([
          api.get("/users/image?size=SMALL", {
            responseType: "blob",
            headers: { Authorization: `Bearer ${token}` }
          }),
          api.get("/users", {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setImageURL(URL.createObjectURL(imageRes.data));
        setUser(userRes.data);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        navigate("/");
      }
    };

    fetchUser();
  }, []);

  return (
    <Card elevation={3} sx={{
      width: 500,
      maxWidth: "100%",
      padding: "30px 20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
      boxShadow: 15
    }}>
      <img id={style.logo} src={LogoValmet} alt="Logo Valmet" />
      <Avatar alt={user.name} src={imageURL} sx={{ width: 100, height: 100 }} />
      <Typography variant="h6">{user.name}</Typography>
      <Typography color="textSecondary">{user.email}</Typography>

      <Divider sx={{ width: '100%', margin: "15px 0" }} />

      <Typography><strong>{t("position")}:</strong> {user.position}</Typography>
    </Card>
  );
};

export default UserProfileCard;
