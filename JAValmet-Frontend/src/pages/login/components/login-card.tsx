import toast from 'react-hot-toast';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LogoValmet from "../../../assets/logo-valmet.png"

import { useState } from 'react';
import { api } from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import style from "./style.module.css";

const loginRequest = async (email: string, password: string) => {
    const response = await api.post("/login", {
        email: email,
        password: password
    });
    return response;
};

const LoginCard = () => {

    const { t } = useTranslation();

    const navigate = useNavigate();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        toast.promise(
            loginRequest(login, password),
            {
                loading: "Logging in",
                success: "User logged in successfully!",
                error: (err) => err.response?.data?.detail || err.message
            }
        ).then((response) => {
            sessionStorage.setItem("Token", response.data.token);
            navigate("/home");
        });
    };

    return (
        <Card elevation={3} sx={{ width: 400, maxWidth: "100%" }}>
            <form className={style.card} onSubmit={handleSubmit} >
                <img id={style.logo} src={LogoValmet} alt="" />
                <TextField value={login} onChange={(e) => setLogin(e.target.value)} color="success" fullWidth label={t("email")} required />
                <TextField value={password} onChange={(e) => setPassword(e.target.value)} color="success" fullWidth label={t("password")} type="password" required />
                <Button fullWidth type="submit" variant="contained" color="success">
                    {t("login")}
                </Button>
            </form>
        </Card>
    )
}

export default LoginCard;