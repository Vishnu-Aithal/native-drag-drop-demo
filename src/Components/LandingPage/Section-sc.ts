import styled from "styled-components";
import { COLORS } from "../../Constants/Colors";

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    width: 40vw;
    height: 80vh;
    border: 2px solid ${COLORS.border};
    padding: 1rem;
    border-radius: 0.25rem;

    box-shadow: 0 2px 5px ${COLORS.border};

    @media only screen and (max-width: 992px) {
        width: 90vw;
        height: 45vh;
        padding: 0.25rem;
        padding-top: 0.5rem;
    } ;
`;
