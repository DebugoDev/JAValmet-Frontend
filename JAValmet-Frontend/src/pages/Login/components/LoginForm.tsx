import { Card } from '../../../components/CardLogin';
import { Logo } from '../../../components/Logo';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import toast from "react-hot-toast";
import { api } from '../../../services/api';

const loginRequest = async (email: string, password: string) => {
    const response = await api.post("/login", {
        email: email,
        password: password
    });
    return response;
}

export const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

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
            localStorage.setItem("Token", response.data.token);
            navigate("/home");
        });
    };

    return (
        <Card>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex justify-center">
                    <Logo />
                </div>

                <Input
                    label="Login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    placeholder="Digite seu Login"
                    required={true}
                />
                <Input
                    label="Senha"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua Senha"
                    required={true}
                />

                <Button type="submit" label="Login" />
            </form>
        </Card>
    );
};
