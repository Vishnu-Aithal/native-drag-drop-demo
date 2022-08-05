import { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../Constants/Colors";
import { useDebounce } from "../../Hooks/useDebounce";
import { useInterSectionObserver } from "../../Hooks/useIntersectionObserver";
import { Profile } from "../../Models/Profile";
import { filterUsersBySearch } from "../../Utils/filterUsersBySearch";
import { List } from "./List-sc";
import { SearchBar } from "./SearchBar-sc";
import { Section } from "./Section-sc";
import { UserCard } from "./UserCard";

const EmptyText = styled.p`
    text-align: center;
    color: ${COLORS.textGray};
`;

interface Props {
    users: Profile[];
    selectedUserNames: string[];
}

export const SearchSection: React.FC<Props> = ({
    users,
    selectedUserNames,
}) => {
    const [search, setSearch] = useState("");
    const [filteredUsers, setFilteredUsers] = useState<Profile[]>([]);
    const [noResults, setNoResults] = useState(false);
    const [displayLength, setDisplayLength] = useState(10);
    const rootRef = useRef<HTMLUListElement>(null);
    const targetRef = useRef<HTMLDivElement>(null);
    const onScrollEnd: IntersectionObserverCallback = (entries) => {
        if (entries[0].isIntersecting) {
            setDisplayLength((prev) => prev + 10);
        }
    };
    const handleSearch = useCallback(() => {
        if (search === "") {
            setFilteredUsers([]);
            setNoResults(false);
            return;
        }
        const newFilteredUsers = filterUsersBySearch(search, users);
        if (newFilteredUsers.length === 0) {
            setNoResults(true);
        } else {
            setNoResults(false);
        }
        setFilteredUsers(newFilteredUsers);
        setDisplayLength(10);
    }, [search, users]);

    useInterSectionObserver(rootRef, targetRef, onScrollEnd);
    useDebounce(search, handleSearch, 500);

    const usersToDisplay = filteredUsers
        .filter((user) => !selectedUserNames.includes(user.username))
        .slice(0, displayLength);
    return (
        <Section>
            <SearchBar
                placeholder="Search for name, username, title or interests..."
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <List ref={rootRef}>
                {noResults && (
                    <EmptyText>
                        Could not find any users matching your query...
                    </EmptyText>
                )}

                {usersToDisplay.map((user, idx, arr) => (
                    <UserCard
                        key={user.username}
                        ref={
                            idx === arr.length - 2 &&
                            arr.length !== filteredUsers.length
                                ? targetRef
                                : null
                        }
                        profile={user}
                    />
                ))}
                {filteredUsers.length !== 0 &&
                    displayLength >= filteredUsers.length && (
                        <EmptyText>Reached end of search results...</EmptyText>
                    )}
            </List>
        </Section>
    );
};
