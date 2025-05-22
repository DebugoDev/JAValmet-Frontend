export const Logo: React.FC = () => {
    return (
        <div className="flex items-center gap-2">
            <img
                src="/LogoValmet.png"
                alt="Valmet"
                className="h-8 w-auto sm:h-10 md:h-12"
            />
        </div>
    );
};