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
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";

interface IBoard {
    id: string
    name?: string
    description?: string
    createdAt?: string
    responsibleUser?: {
        name?: string
        profileImageGuid?: string
        imageURL: string
    }
}

const boardsRequest = async (search: string) => {
    const token = sessionStorage.getItem("Token");

    const response = await api.get("/boards", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            search: search
        }
    });

    return response;
};


const imageRequest = async (fileId: string) => {
    const token = sessionStorage.getItem("Token");

    const response = await api.get(`/images/${fileId}?size=SMALL`, {
        responseType: "blob",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response;
}

const Home = () => {

    const { t } = useTranslation();
    const { boardId } = useParams();

    const [search, setSearch] = useState("");
    const [boards, setBoards] = useState<IBoard[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const getBoards = async () => {
            const responseBoards: IBoard[] = (await boardsRequest(search)).data;

            const boardsWithImages = await Promise.all(responseBoards.map(async b => {
                if (b.responsibleUser?.profileImageGuid) {
                    const response = await imageRequest(b.responsibleUser.profileImageGuid);
                    b.responsibleUser.imageURL = response.data.size === 0
                        ? "user.jpg"
                        : URL.createObjectURL(response.data);
                } else {
                    b.responsibleUser = {
                        ...b.responsibleUser,
                        imageURL: "user.jpg"
                    };
                }

                return b;
            }));

            setBoards(boardsWithImages);
        };

        getBoards();
    }, [search]);


    return (
        <main>
            <div className={style.search}>
                <Button variant="contained" color="success" >+ board</Button>
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
                            <Card elevation={3} className={style.card} onClick={() => navigate(`/dashboard/${board.id}`)} >
                                <CardContent className={style.space}>
                                    <div className={style.card_content}>
                                        <Typography weight="bold">{board.name}</Typography>
                                        <Typography size="sm" weight="light">{board.description}</Typography>
                                    </div>
                                    <div className={style.card_info}>
                                        {
                                            board.responsibleUser &&
                                            <img className={style.user_image} src={board.responsibleUser?.imageURL ?? "user.jpg"} alt="" />
                                        }
                                        <Typography weight="light" size="xs">
                                            {t("created", {
                                                by: board.responsibleUser?.name ? t("by", { name: board.responsibleUser.name }) : "",
                                                at: board.createdAt ? t("at", { date: new Date(board.createdAt).toLocaleDateString() }) : ""
                                            })}
                                        </Typography>

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