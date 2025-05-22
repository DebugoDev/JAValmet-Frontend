interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
}

export const Button: React.FC<ButtonProps> = ({ label, ...props }) => {
    return (
        <button
            {...props}
            className="bg-green-600 hover:bg-green-700 transition text-white font-medium px-6 py-2 rounded-md shadow-md w-full"
        >
            {label}
        </button>
    );
};
