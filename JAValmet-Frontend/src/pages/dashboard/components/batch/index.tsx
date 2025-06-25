import Card from "@mui/material/Card";
import style from "./style.module.css";
import CardContent from "@mui/material/CardContent";
import Typography from "../../../../components/typography";
import { useSearchParams } from "react-router-dom";

export interface IBatch {
    id: string
    items: {
        [key: string]: number;
    }
    priority: number
    observation: string

    pcs?: string
    bu: null
    client: null
    cost: null
    expectedDate?: string
    deliveryDate?: string
}

interface CardProps {
    batch: IBatch;
}

const getBatchName = (batch: IBatch) => {
    return Object.entries(batch.items)
        .map(([name, quantity]) =>
            quantity > 1 ? `${name} (${quantity}X)` : name
        )
        .join(", ");
};

const Batch = ({ batch }: CardProps) => {

    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <>
            <Card
                onClick={() => {
                    setSearchParams(prev => {
                        const newParams = new URLSearchParams(prev);
                        newParams.set('batchId', batch.id);
                        return newParams;
                    });
                }}
                sx={{ cursor: "pointer" }}
                elevation={1}
            >
                <CardContent>
                    <div className={style.info}>
                        <Typography className={style.name} weight="bold">{getBatchName(batch)}</Typography>
                        <Typography className={style.obs} size="xs">{batch.observation}</Typography>
                        <Typography className={style.text} size="xs" weight="semibold">{batch.pcs}</Typography>
                    </div>
                </CardContent>
            </Card>
        </>
    )
};

export default Batch;