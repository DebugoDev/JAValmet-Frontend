import Board from "../components/Board";
import Navbar from "../components/Navbar";
import ProgressBar from "../components/ProgressCard";

const Dashboard = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            <main className="flex-1 flex flex-col gap-6 items-center py-6 justify-center">
                <Board />
                <ProgressBar />
            </main>
        </div>
    );
};

export default Dashboard;
