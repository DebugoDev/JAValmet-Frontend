import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import BigCard from "./BigCard";

interface CardProps {
    status: "red" | "pink" | "blue" | "yellow" | "purple";
}

const statusColors: Record<string, string> = {
    red: "bg-red-500",
    pink: "bg-fuchsia-500",
    blue: "bg-blue-500",
    yellow: "bg-yellow-400",
    purple: "bg-purple-500",
};

const Card = ({ status }: CardProps) => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 shadow-sm items-center">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${statusColors[status]}`} />
                        <h3 className="font-semibold text-sm">Card Title</h3>
                    </div>
                    <MoreHorizontal className="w-4 h-4 cursor-pointer justify-center" onClick={handleOpenModal} />
                </div>

                <p className="text-xs text-neutral-600 mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non.
                </p>

                <div className="flex justify-between items-center mt-3">
                    <div className="h-2 w-1/2 bg-neutral-300 rounded-full">
                        <div className={`h-2 rounded-full bg-green-500 w-1/3`} />
                    </div>
                    <span className="text-[10px] text-neutral-500">12/12/2025</span>
                </div>
            </div>
            {showModal && <BigCard status={status} onClose={handleCloseModal} />}
        </>
    );
};

export default Card;
