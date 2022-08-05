import { Profile } from "../Models/Profile";

export const filterUsersBySearch = (search: string, users: Profile[]) => {
    if (search.trim() === "") {
        return [];
    }
    const searchTermsArray = search.toLowerCase().split(" ");
    const newFilteredData = users.filter(
        ({ title, name, username, interests }) => {
            for (const term of searchTermsArray) {
                if (
                    !title.toLowerCase().includes(term) &&
                    !name.toLowerCase().includes(term) &&
                    !username.toLowerCase().includes(term) &&
                    !interests.some((interest) =>
                        interest
                            .replaceAll(" ", "")
                            .toLowerCase()
                            .includes(term)
                    )
                )
                    return false;
            }
            return true;
        }
    );
    return newFilteredData;
};
