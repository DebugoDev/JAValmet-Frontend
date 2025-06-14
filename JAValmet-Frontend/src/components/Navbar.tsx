import { Bell, Settings } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md w-full">
            <div
                className="mx-auto px-7 sm:px-7 lg:px-10 2xl:px-16"
                style={{ maxWidth: '1920px' }}
            >
                <div className="flex justify-between h-14 items-center">
                    <div className="flex items-center">
                        <img
                            src="/LogoValmet.png"
                            alt="Valmet"
                            className="h-7 w-auto"
                        />
                    </div>
                    <div className="flex items-center gap-3 md:gap-6 xl:gap-8 h-full">
                        <button
                            type="button"
                            className="text-gray-600 hover:text-gray-800 focus:outline-none cursor-pointer duration-150"
                            aria-label="Notificações"
                        >
                            <Bell className="h-4 w-4 md:h-5 md:w-5 xl:h-5 xl:w-5" />
                        </button>
                        <button
                            type="button"
                            className="text-gray-600 hover:text-gray-800 focus:outline-none cursor-pointer duration-150"
                            aria-label="Configurações"
                        >
                            <Settings className="h-4 w-4 md:h-5 md:w-5 xl:h-5 xl:w-5" />
                        </button>
                        <button
                            type="button"
                            aria-label="Perfil"
                            className="h-full"
                        >
                            <img className="h-4/6 rounded-full hover:brightness-75 cursor-pointer duration-150" src="User.jpg" alt="Profile image" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
