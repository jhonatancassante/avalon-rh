import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { ERRORSMSG } from "../_constants/errorsMessages";
import { Roles } from "../_constants/roles";

const verifySessionAndRoleAdmin = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error(ERRORSMSG.UNAUTHORIZED.NOSESSION);
    }

    if (session.user.role !== Roles.Admin) {
        throw new Error(ERRORSMSG.UNAUTHORIZED.NOROLEADMIN);
    }
};

export default verifySessionAndRoleAdmin;
