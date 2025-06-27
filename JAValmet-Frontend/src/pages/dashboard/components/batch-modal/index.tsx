import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import ModalBackground from "../../../../components/modal-background";
import Typography from "../../../../components/typography";
import AutoComplete, { type IOption } from "../../../../components/auto-complete";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTranslation } from "react-i18next";

import style from "./style.module.css";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import type { Dayjs } from "dayjs";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { api } from "../../../../services/api";
import { useParams, useSearchParams } from "react-router-dom";

const getBatchName = (items: Record<string, number>) => {
    return Object.entries(items)
        .map(([name, quantity]) =>
            quantity > 1 ? `${name} (${quantity}X)` : name
        )
        .join(", ");
};

const busRequest = async (boardId: string) => {
    const token = sessionStorage.getItem("Token");

    const response = await api.get(`bus/board/${boardId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return response;
};

const clientsRequest = async (boardId: string) => {
    const token = sessionStorage.getItem("Token");

    const response = await api.get(`clients/board/${boardId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return response;
};

const batchRequest = async (batchId: string) => {
    const token = sessionStorage.getItem("Token");

    const response = await api.get(`batches/${batchId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return response;
}

interface BatchModalProps {
    id?: string
}

const BatchModal = () => {

    const { t } = useTranslation();
    const { boardId } = useParams();

    const [searchParams, setSearchParams] = useSearchParams();

    const batchParam = searchParams.get('batchId');
    const columnParam = searchParams.get('columnId');

    const [name, setName] = useState("");
    const [priority, setPriority] = useState<number>(0);
    const [pcs, setPcs] = useState<string>("");
    const [bu, setBu] = useState<IOption | null>(null);
    const [client, setClient] = useState<IOption | null>(null);
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [cost, setCost] = useState<"J" | "K" | "L">("J");
    const [obs, setObs] = useState<string>("");

    const [bus, setBus] = useState<IOption[]>([]);
    const [clients, setClients] = useState<IOption[]>([]);

    useEffect(() => {
        const fetchBUs = async () => {
            const response = await busRequest(boardId!);
            setBus(response.data.map((b: { name: any; id: any; }) => ({
                name: b.name,
                value: b.id
            })));
        }

        const fetchClients = async () => {
            const response = await clientsRequest(boardId!);
            setClients(response.data.map((c: { name: any; id: any; }) => ({
                name: c.name,
                value: c.id
            })));
        }

        const fetchBatches = async () => {
            const response = await batchRequest(batchParam!);
            console.log(response.data);

            const batch = response.data;

            setBu(batch.bu);
            setClient(batch.client);
            setCost(batch.cost);
            setName(getBatchName(batch.items));
            setObs(batch.observation);
            setPcs(batch.pcs);
            setPriority(batch.priority);
        }

        if (batchParam)
            fetchBatches();

        fetchBUs();
        fetchClients();
    }, [batchParam, columnParam]);

    return (
        <ModalBackground
            onClick={() => {
                searchParams.delete("batchId");
                searchParams.delete("columnId");
                setSearchParams(searchParams);
            }}
        >
            <Card sx={{ width: "100%", maxWidth: "1200px" }}>
                <CardContent>
                    <form className={style.main}>
                        <Typography size="lg" weight="bold" >
                            {name}
                        </Typography>
                        <div className={style.line}>
                            <div className={style.twenty}>
                                <TextField
                                    fullWidth
                                    label={t("Priority")}
                                    type="number"
                                    value={priority}
                                    onChange={(e) => setPriority(Number(e.target.value))}
                                />

                            </div>
                            <div className={style.forty}>
                                <AutoComplete label={"BU"} options={{
                                    get: bus,
                                    add: function (name: string): IOption {
                                        throw new Error("Function not implemented.");
                                    }
                                }} />
                            </div>
                            <div className={style.forty}>
                                <TextField value={pcs} onChange={(e) => setPcs(e.target.value)} fullWidth label="PCS" />
                            </div>
                        </div>
                        <AutoComplete label={t("client")} options={{
                            get: clients,
                            add: function (name: string): IOption {
                                throw new Error("Function not implemented.");
                            }
                        }} />
                        <div className={style.line}>
                            <div className={style.forty}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            label="Basic date picker"
                                            slotProps={{
                                                popper: {
                                                    sx: { zIndex: 2000 },
                                                },
                                                textField: {
                                                    fullWidth: true,
                                                }
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                            <div className={style.forty}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            label="Basic date picker"
                                            slotProps={{
                                                popper: {
                                                    sx: { zIndex: 2000 },
                                                },
                                                textField: {
                                                    fullWidth: true,
                                                }
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                            <div className={style.twenty}>
                                <ToggleButtonGroup
                                    value={cost}
                                    exclusive
                                    onChange={(_, e) => setCost(e)}
                                    color="success"
                                    aria-label="text alignment"
                                    fullWidth
                                    aria-required
                                    sx={{ marginTop: "8px", height: "56px" }}
                                >
                                    <ToggleButton value="J" aria-label="left aligned">
                                        J
                                    </ToggleButton>
                                    <ToggleButton value="K" aria-label="centered">
                                        K
                                    </ToggleButton>
                                    <ToggleButton value="L" aria-label="right aligned">
                                        L
                                    </ToggleButton>
                                </ToggleButtonGroup>

                            </div>
                        </div>
                        <TextField
                            label={"obs"}
                            multiline
                            rows={4}
                            value={obs}
                            onChange={(e) => setObs(e.target.value)}
                        />
                    </form>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Button variant="outlined">{t("cancel")}</Button>
                    <Button variant="contained">{("save")}</Button>
                </CardActions>
            </Card>
        </ModalBackground >
    )
}

export default BatchModal;