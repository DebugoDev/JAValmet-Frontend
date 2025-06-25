import style from "./style.module.css";

interface ModalBackgroundProps {
    children: React.ReactNode;
    onClick?: () => void;
}

const ModalBackground = ({ children, onClick }: ModalBackgroundProps) => {
    return (
        <main className={style.model_background} onClick={onClick} >
            {children}
        </main>
    );
};

export default ModalBackground;
