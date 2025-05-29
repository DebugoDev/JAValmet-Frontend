import { X } from "lucide-react";

interface BigCardProps {
    status: "red" | "pink" | "blue" | "yellow" | "purple";
    onClose: () => void;
}

const statusColors: Record<string, string> = {
    red: "bg-red-400",
    pink: "bg-pink-400",
    blue: "bg-sky-400",
    yellow: "bg-yellow-400",
    purple: "bg-purple-400",
};

const BigCard = ({ status, onClose }: BigCardProps) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-8">
            <div className="bg-neutral-50 rounded-xl p-6 w-[800px] max-h-[90vh] overflow-y-auto shadow-lg relative">
                <button className="absolute top-4 right-4 text-gray-500 hover:text-black hover:cursor-pointer" onClick={onClose}>
                    <X />
                </button>

                <h3 className="font-semibold text-lg mb-4">Título</h3>

                <h4 className="text-sm font-semibold mb-1">Etiquetas</h4>
                <div className="flex flex-row gap-2 mb-4 flex-wrap">
                    <div className={`px-3 flex justify-center items-center py-1  rounded-[10px] text-xs ${statusColors.red}`}>
                        <p>Texto muito texto</p>
                    </div>
                    <div className={`px-3 flex justify-center items-center py-1  rounded-[10px] text-xs ${statusColors.blue}`}>
                        <p>texto</p>
                    </div>
                    <div className={`px-3 flex justify-center items-center py-1  rounded-[10px] text-xs ${statusColors.blue}`}>
                        <p>texto</p>
                    </div>
                    <div className={`px-3 flex justify-center items-center py-1  rounded-[10px] text-xs ${statusColors.blue}`}>
                        <p>texto</p>
                    </div>
                    <div className="flex justify-center items-center w-6 h-6 pb-1 rounded-[10px] bg-gray-200 text-sm font-bold text-gray-600 hover:cursor-pointer hover:bg-gray-300 hover:text-gray-700">
                        <p>+</p>
                    </div>
                </div>

                <h4 className="text-sm font-semibold mb-1">Descrição</h4>
                <div className="bg-neutral-100 p-3 rounded-lg mb-4 text-xs text-neutral-700 leading-relaxed">
                    <p>Descrição com muito texto enche de texto descrição descrição</p>
                </div>

                <h4 className="text-sm font-semibold mb-1">Processos</h4>
                <div className="bg-neutral-100 p-3 rounded-lg mb-4 space-y-2 text-sm w-5/12 min-w-[208px]">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <input type="checkbox" />
                                <span>Etapa</span>
                            </div>
                            <span className="text-xs text-neutral-500">xx/xx/xxxx</span>
                        </div>
                    ))}
                </div>

                <h4 className="text-sm font-semibold mb-1">Comentários</h4>
                <div className="space-y-2">
                    <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-semibold">
                            A
                        </div>
                        <input placeholder="Escreva seu comentário..." className="bg-neutral-100 rounded-lg px-3 py-1 text-sm w-5/12" />
                    </div>
                    <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-yellow-400 text-white flex items-center justify-center text-sm font-semibold">
                            L
                        </div>
                        <div className="text-sm">Top top</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BigCard;
