import { MoreHorizontal, Plus } from "lucide-react";
import Card from "./Card";
import NewCardButton from "./NewCardButton";

interface ColumnProps {
    title: string;
}

const Column = ({ title }: ColumnProps) => {
    return (
        <div className="bg-neutral-100 rounded w-full max-w-xs flex flex-col shadow-md">
            <div className="flex items-center justify-between p-4 bg-neutral-300 rounded-t-sm mb-3.5">
                <h2 className="font-semibold text-base">{title}</h2>
                <MoreHorizontal className="w-5 h-5 cursor-pointer" />
            </div>
            <NewCardButton />
            <div className="flex flex-col gap-3 p-4">
                <Card status="red" />
                <Card status="pink" />
                <Card status="blue" />
            </div>
        </div>
    );
};

export default Column;
