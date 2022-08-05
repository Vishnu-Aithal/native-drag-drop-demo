import styled from "styled-components";
import { COLORS } from "../../Constants/Colors";

export const SearchBar = styled.input`
    padding: 0.5rem;
    width: 100%;
    border: 1px solid ${COLORS.border};
    box-shadow: 0 1px 1px ${COLORS.textGray};
    border-radius: 0.25rem;
    margin-bottom: 1rem;
    outline: none;

    &:focus {
        box-shadow: 0 2px 3px ${COLORS.textGray};
    }
`;
