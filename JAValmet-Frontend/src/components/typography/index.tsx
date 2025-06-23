import React from "react";
import style from "./style.module.css";
import classNames from "classnames";

interface TypographyProps extends React.HTMLAttributes<HTMLSpanElement> {
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
    weight?: "light" | "normal" | "medium" | "semibold" | "bold";
    color?: string;
    children: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = ({
    size = "md",
    weight = "normal",
    color,
    children,
    className,
    ...rest
}) => {
    const textClass = classNames(
        style.text,
        style[`text-${size}`],
        style[weight],
        className
    );


    return (
        <span className={textClass} style={{ color }} {...rest}>
            {children}
        </span>
    );
};

export default Typography;
