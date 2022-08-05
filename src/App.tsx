import { ListSection } from "./Components/LandingPage/ListSection";
import { SearchSection } from "./Components/LandingPage/SearchSection";
import { PageLayout } from "./Components/LandingPage/PageLayout-sc";
import DATA from "./Data/poly-data.json";
import { Profile } from "./Models/Profile";
import { useState } from "react";

function App() {
    const [selectedUsers, setSelectedUsers] = useState<Profile[]>([]);
    const addUser = (droppedProfile: Profile) => {
        setSelectedUsers((prev) => [...selectedUsers, droppedProfile]);
    };
    const removeUser = (droppedProfile: Profile) => {
        setSelectedUsers((prev) =>
            prev.filter(
                (selectedUser) =>
                    selectedUser.username !== droppedProfile.username
            )
        );
    };

    const selectedUserNames = selectedUsers.map((user) => user.username);
    return (
        <PageLayout
            selectedUserNames={selectedUserNames}
            removeUser={removeUser}>
            <ListSection selectedUsers={selectedUsers} addUser={addUser} />
            <SearchSection
                selectedUserNames={selectedUserNames}
                users={DATA as Profile[]}
            />
        </PageLayout>
    );
}

export default App;
