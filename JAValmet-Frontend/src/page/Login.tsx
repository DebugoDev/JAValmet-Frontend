import { LoginForm } from '../components/LoginForm';

export const Login: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-neutral-900">
            <main className="flex flex-1 items-center justify-center bg-white">
                <LoginForm />
            </main>
        </div>
    );
};
