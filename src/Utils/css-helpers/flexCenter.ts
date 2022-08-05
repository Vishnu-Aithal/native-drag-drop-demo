import { css } from "styled-components";

type FlexDirections = "row" | "column" | "row-reverse" | "column-reverse";

export const flexCenter = (flexDirection: FlexDirections) => css`
    display: flex;
    flex-direction: ${flexDirection};
    align-items: center;
    justify-content: center;
`;
