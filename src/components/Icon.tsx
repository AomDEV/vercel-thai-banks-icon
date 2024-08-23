import BanksJson from "css-finances/banks.json";
import "css-finances/banks.css";
import { CSSProperties } from "react";

type Props = {
    readonly icon: keyof typeof BanksJson.th | string;
    readonly size?: "huge" | "xxxl" | "xxl" | "xl" | "l" | "s" | "xs";
    readonly round?: boolean;
    readonly shadow?: boolean;
    readonly className?: string;
    readonly style?: CSSProperties;
};
export function IconViewer({
    icon,
    size,
    round,
    shadow,
    className,
    style
}: Props) {
    return (
        <i
            className={[
                "bank",
                `bank-${icon}`,
                size,
                round && "round",
                shadow && "shadow",
                className
            ].filter(Boolean).join(' ')}
            style={style}
        />
    )
}