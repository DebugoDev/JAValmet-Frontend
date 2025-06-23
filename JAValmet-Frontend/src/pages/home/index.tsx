import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useTranslation } from "react-i18next";

import style from "./style.module.css";
import Typography from "../../components/typography";

interface IBoard {
    name?: string
    description?: string
    createdAt?: string
    responsibleUser?: {
        name?: string
        profileImageGuid?: string
    }
}

const boardsRequest = async () => {
    const token = sessionStorage.getItem("Token");

    const response = await api.get("/boards", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response;
}

const imageRequest = async (fileId: string) => {
    const token = sessionStorage.getItem("Token");

  const response = await api.get(`/images/${fileId}`, {
    responseType: "blob",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

const Home = () => {

    const { t } = useTranslation();

    const [search, setSearch] = useState("");
    const [boards, setBoards] = useState<IBoard[]>([]);

    useEffect(() => {
        const getBoards = async () => {
            setBoards((await boardsRequest()).data);
        }

        getBoards();
    }, []);

    return (
        <main>
            <div className={style.search}>
                <div id={style.search_container}>
                    <TextField
                        label={t("search-board")}
                        variant="filled"
                        size="small"
                        color="success"
                        slotProps={{
                            input: {
                                endAdornment: <SearchIcon />
                            },
                        }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        fullWidth
                    />
                </div>
            </div>
            <div className={style.boards}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                    {boards.map((board, index) => (
                        <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                            <Card elevation={3} >
                                <CardContent>
                                    <div className={style.card_content}>
                                        <Typography weight="bold">{board.name}</Typography>
                                        <Typography weight="light">{board.description}</Typography>
                                        {
                                            board.createdAt &&
                                            <Typography weight="light" size="xs">{`Created at: ${new Date(board.createdAt).toLocaleDateString()}`}</Typography>
                                        }
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </main>
    )
}

export default Home;