import { ReactNode } from "react";
import styled from "styled-components";
import { Profile } from "../../Models/Profile";
import { flexCenter } from "../../Utils/css-helpers/flexCenter";

export const Main = styled.main`
    ${flexCenter("row")}
    gap:10%;
    padding: 10%;
    height: 100vh;
    width: 100vw;
    @media only screen and (max-width: 992px) {
        & {
            flex-direction: column;
            gap: 5%;
            padding: 5%;
        }
    }
`;

interface Props {
    selectedUserNames: string[];
    children: ReactNode;
    removeUser: (droppedProfile: Profile) => void;
}

export const PageLayout: React.FC<Props> = ({
    children,
    removeUser,
    selectedUserNames,
}) => {
    return (
        <Main
            onDragOver={(e) => {
                e.preventDefault();
            }}
            onDrop={(e) => {
                if ((e.target as HTMLElement)?.closest("#selected-users")) {
                    return;
                }
                const droppedProfile = JSON.parse(
                    e.dataTransfer.getData("text")
                ) as Profile;
                if (selectedUserNames.includes(droppedProfile.username)) {
                    removeUser(droppedProfile);
                }
            }}>
            {children}
        </Main>
    );
};
