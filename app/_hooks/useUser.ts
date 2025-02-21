import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { UserComplete } from "../_types/userComplete";
import { getUser } from "../_data/getUser";

export const useUser = () => {
    const { data: session } = useSession();
    const [user, setUser] = useState<UserComplete | null>(null);

    const fetchUser = useCallback(async () => {
        if (!session?.user?.id) {
            throw new Error("User ID is not available.");
        }

        try {
            const userFound = await getUser(session?.user?.id);
            setUser(userFound);
        } catch (error) {
            console.error("Failed to fetch user:", error);
        }
    }, [session]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return { user };
};
