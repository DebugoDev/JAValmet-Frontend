import Column from "./Column";

const Board = () => {
    const columns = ["To Do", "In Progress", "Done"];

    return (
        <div className="flex flex-col items-center w-full px-4">
            <div className="flex flex-col xl:flex-row gap-10 w-full justify-center">
                {columns.map((title) => (
                    <Column key={title} title={title} />
                ))}
            </div>
        </div>
    );
};

export default Board;
