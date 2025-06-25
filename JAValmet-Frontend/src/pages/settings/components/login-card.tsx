import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import LogoValmet from "../../../assets/logo-valmet.png";
import style from "./style.module.css";

import { api } from '../../../services/api';
import { useNavigate } from 'react-router-dom';

const UserProfileCard = () => {
    const navigate = useNavigate();

    const [imageURL, setImageURL] = useState("user.jpg"); // imagem padrão
    const [user, setUser] = useState({
        nome: "Adrian Gobara",
        email: "adrian@example.com",
        cargo: "Desenvolvedor Front-end",
        telefone: "(11) 91234-5678",
        departamento: "TI"
    });

    useEffect(() => {
        const fetchUserImage = async () => {
            try {
                const token = sessionStorage.getItem("Token");
                const response = await api.get("/users/image?size=SMALL", {
                    responseType: "blob",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setImageURL(URL.createObjectURL(response.data));
            } catch (error) {
                console.error("Erro ao buscar imagem do usuário:", error);
                navigate("/");
            }
        };

        fetchUserImage();
    }, []);

    return (
        <Card elevation={3} sx={{
            width: 600,
            maxWidth: "100%",
            padding: "30px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            boxShadow: 15
        }}>
            <img id={style.logo} src={LogoValmet} alt="Logo Valmet" />
            <Avatar alt={user.nome} src={imageURL} sx={{ width: 100, height: 100 }} />
            <Typography variant="h6">{user.nome}</Typography>
            <Typography color="textSecondary">{user.email}</Typography>
            <Divider sx={{ width: '100%', margin: "15px 0" }} />
            <Typography><strong>Cargo:</strong> {user.cargo}</Typography>
            <Typography><strong>Telefone:</strong> {user.telefone}</Typography>
            <Typography><strong>Departamento:</strong> {user.departamento}</Typography>
        </Card>
    );
};

export default UserProfileCard;
