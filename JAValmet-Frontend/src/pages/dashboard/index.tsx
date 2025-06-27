import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import IconButton from "@mui/material/IconButton";
import DataUsageIcon from '@mui/icons-material/DataUsage';
import HotelClassIcon from '@mui/icons-material/HotelClass';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from "@mui/material/Tooltip";

import Typography from "../../components/typography";
import style from "./style.module.css";
import { api } from "../../services/api";
import Menu from "./components/menu";
import Column, { type IColumn } from "./components/column";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import BatchModal from "./components/batch-modal";

interface IBoard {
    id: string
    name?: string
    description?: string
    createdAt?: string
}

const boardRequest = async (id: string) => {
    const token = sessionStorage.getItem("Token");
    return await api.get(`/boards/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

const columnsRequest = async (id: string) => {
    const token = sessionStorage.getItem("Token");
    return await api.get(`/columns/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

const Dashboard = () => {
    const { t } = useTranslation();
    const { boardId } = useParams();

    const [board, setBoard] = useState<IBoard>();
    const [columns, setColumns] = useState<IColumn[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();

    const batchParam = searchParams.get('batchId');
    const columnParam = searchParams.get('columnId');

    useEffect(() => {
        const fetchBoard = async () => {
            const response = await boardRequest(boardId!);
            setBoard(response.data);
        };

        const fetchColumns = async () => {
            const response = await columnsRequest(boardId!);
            setColumns(response.data);
        };

        fetchBoard();
        fetchColumns();
    }, [boardId]);

    return (
        <main className={style.dashboard_main}>
            <Menu isOpen={menuOpen} onToggle={() => setMenuOpen(!menuOpen)}>
                <Typography>
                    {board?.description}
                </Typography>
                <hr />
            </Menu>

            <div className={style.top}>
                <Typography size="lg" weight="bold" id={style.board_name}>
                    {board?.name}
                </Typography>
                <Tooltip title={t("ratings")}><IconButton><HotelClassIcon /></IconButton></Tooltip>
                <Tooltip title={t("kpis")}><IconButton><DataUsageIcon /></IconButton></Tooltip>
                <Tooltip title={t("problem-solving-form")}><IconButton><SpaceDashboardIcon /></IconButton></Tooltip>
                <Tooltip title={t("edit-board")}><IconButton><EditIcon /></IconButton></Tooltip>
            </div>

            <div className={style.body}>
                <div className={style.columns}>
                    {
                        columns.map((col, index) =>
                            <div key={index} className={style.padding}>
                                <Column column={col}></Column>
                            </div>
                        )
                    }
                    <div className={style.padding}>
                        <Card sx={{ width: "300px", height: "fit-content" }} elevation={3} className={style.add_column} >
                            <CardContent className={style.center}>
                                <Typography weight="bold">New Column</Typography>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <footer id={style.footer}>Valmet</footer>
            {
                (batchParam || columnParam) &&
                <BatchModal />
            }
        </main>
    );
};

export default Dashboard;
