import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "../../../../components/typography";

import style from "./style.module.css"
import type { IBatch } from "../batch";
import Batch from "../batch";

export interface IColumn {
    id?: string
    color?: string
    name?: string
    description?: string
    index: number
    batches: IBatch[]
}


interface ColumnProps {
    column: IColumn;
}

const Column = ({ column }: ColumnProps) => {
    return (
        <div className={style.padding}>
            <Card sx={{ width: "400px", height: "100%", backgroundColor: column.color }} elevation={3}>
                <CardContent>
                    <Typography weight="bold">{column.name}</Typography>
                </CardContent>

                <div className={style.box}>
                    <div className={style.cards}>
                        {column.batches.map((batch, index) => (
                            <Batch key={index} batch={batch} />
                        ))}
                    </div>
                </div>
            </Card>

        </div>
    )
};

export default Column;