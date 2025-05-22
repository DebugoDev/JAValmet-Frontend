import { Card } from './CardLogin';
import { Logo } from './Logo';
import { Input } from './Input';
import { Button } from './Button';
import { useState } from 'react';

export const LoginForm: React.FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ login, password });
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
                />
                <Input
                    label="Senha"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua Senha"
                />

                <Button type="submit" label="Login" />
            </form>
        </Card>
    );
};
