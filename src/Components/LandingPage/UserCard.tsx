import { forwardRef, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { COLORS } from "../../Constants/Colors";
import { Profile } from "../../Models/Profile";

interface Props {
    profile: Profile;
}
const fadeIn = keyframes`
    0%{opacity:0} 100%{opacity:1} 
`;
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border: 1px solid ${COLORS.border};
    border-radius: 0.25rem;
    cursor: grab;
    box-shadow: 0 2px 3px ${COLORS.border};
    animation-name: ${fadeIn};
    animation-duration: 0.2s;
    animation-fill-mode: backwards;
    &:active {
        cursor: grabbing;
    }
    &:hover {
        background-color: ${COLORS.lightGray};
    }
`;
const ProfileImg = styled.img`
    object-fit: cover;
    height: 3rem;
    border-radius: 50%;
    aspect-ratio: 1/1;
    margin-right: 1rem;
`;
const ProfileDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;
const ProfileHeader = styled.h4`
    color: ${COLORS.primary};
    & span {
        margin-left: rem;
        color: ${COLORS.secondary};
        font-size: small;
    }
`;
const ProfileTitle = styled.p`
    color: ${COLORS.textBlack};
    font-size: smaller;
    font-weight: 500;
`;
const ProfileInterests = styled.p`
    font-size: small;
    color: ${COLORS.textGray};
    font-weight: 500;
    @media only screen and (max-width: 992px) {
        display: none;
    }
`;

export const UserCard = forwardRef<HTMLDivElement, Props>(
    ({ profile }, ref) => {
        const localRef = useRef<HTMLDivElement>(null);
        return (
            <Wrapper
                ref={ref || localRef}
                draggable
                onDragStart={(e) => {
                    e.dataTransfer.effectAllowed = "move";
                    e.dataTransfer.dropEffect = "move";
                    e.dataTransfer.setData("text", JSON.stringify(profile));
                }}>
                <ProfileImg src={profile.img} alt={profile.name} />
                <ProfileDetails>
                    <ProfileHeader>
                        {profile.name} <span>{profile.username}</span>
                    </ProfileHeader>
                    <ProfileTitle>{profile.title}</ProfileTitle>
                    <ProfileInterests>
                        Interested in - {profile.interests.join(", ")}
                    </ProfileInterests>
                </ProfileDetails>
            </Wrapper>
        );
    }
);
