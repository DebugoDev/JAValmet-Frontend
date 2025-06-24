import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const Dashboard = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [board, setBoard] = useState<IBoard>();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchBoard = async () => {
      const response = await boardRequest(id!);
      setBoard(response.data);
    };
    fetchBoard();
  }, [id]);

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

      <div>aaa</div>
      <div>asdfasd</div>
    </main>
  );
};

export default Dashboard;
