import { Bell, Settings } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md w-full">
      <div
        className="mx-auto px-4 sm:px-6 lg:px-2 2xl:px-16"
        style={{ maxWidth: '1920px' }}
      >
        <div className="flex justify-between h-16 md:h-18 items-center">
          <div className="flex items-center">
            <img
              src="/LogoValmet.png"
              alt="Valmet"
              className="h-8 w-auto md:h-10 xl:h-10"
            />
          </div>
          <div className="flex items-center gap-4 md:gap-6 xl:gap-8">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
              aria-label="Configurações"
            >
              <Settings className="h-5 w-5 md:h-6 md:w-6 xl:h-6 xl:w-6" />
            </button>
            <button
              type="button"
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
              aria-label="Notificações"
            >
              <Bell className="h-5 w-5 md:h-6 md:w-6 xl:h-6 xl:w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
