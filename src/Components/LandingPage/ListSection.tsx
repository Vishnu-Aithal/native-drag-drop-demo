import { useState } from "react";
import { Profile } from "../../Models/Profile";
import { List } from "./List-sc";
import { Section } from "./Section-sc";
import { UserCard } from "./UserCard";

interface Props {
    selectedUsers: Profile[];
    addUser: (droppedProfile: Profile) => void;
}

export const ListSection: React.FC<Props> = ({ addUser, selectedUsers }) => {
    const [dragEnter, setDragEnter] = useState(false);
    return (
        <Section>
            <List
                DragEnter={dragEnter}
                id="selected-users"
                onDragEnter={(e) => setDragEnter(true)}
                onDragOver={(e) => e.preventDefault()}
                onDragLeave={(e) => {
                    if (
                        !(e.relatedTarget as HTMLElement)?.closest(
                            "#selected-users"
                        )
                    ) {
                        setDragEnter(false);
                    }
                }}
                onDrop={(e) => {
                    setDragEnter(false);
                    const droppedProfile = JSON.parse(
                        e.dataTransfer.getData("text")
                    ) as Profile;
                    if (
                        !selectedUsers.find(
                            (user) => user.username === droppedProfile.username
                        )
                    ) {
                        addUser(droppedProfile);
                    }
                }}>
                {selectedUsers.map((user) => (
                    <UserCard profile={user} />
                ))}
            </List>
        </Section>
    );
};
