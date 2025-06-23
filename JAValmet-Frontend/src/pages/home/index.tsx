import TextField from "@mui/material/TextField";
import style from "./style.module.css";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Input from "@mui/material/Input";

const Home = () => {

    const { t } = useTranslation();

    const [search, setSearch] = useState("");

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
        </main>
    )
}

export default Home;