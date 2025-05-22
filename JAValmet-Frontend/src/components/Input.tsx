interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label className="text-sm text-neutral-600">{label}</label>
            <input
                {...props}
                className="px-4 py-2 rounded-md border border-neutral-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition placeholder:text-sm"
            />
        </div>
    );
};
