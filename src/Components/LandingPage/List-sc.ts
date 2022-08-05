import styled, { css } from "styled-components";
import { COLORS } from "../../Constants/Colors";

interface Props {
    DragEnter?: boolean;
}

export const List = styled.ul<Props>`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
    list-style: none;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    padding: 0.5rem;
    border-radius: 0.25rem;
    ${(props) =>
        props.DragEnter &&
        css`
            box-shadow: 0 2px 6px ${COLORS.lightGray};
        `}

    &::-webkit-scrollbar {
        width: 0.5rem;
        height: 0.5rem;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${COLORS.textGray};
        border-radius: 25px;
    }
    &::-webkit-scrollbar-track {
        background-color: ${COLORS.border};
    }

    @media only screen and (max-width: 992px) {
        padding: 0.25rem;
    } ;
`;
