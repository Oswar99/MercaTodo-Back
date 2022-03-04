import { IUser } from "../models/user.model";
import { decodeResp } from "./jwt.helper";
import UserHelper from "./User.helper";

const UsHelp = new UserHelper();

class SessionHelper extends UserHelper {

    public getAccess(access: string): Promise<{ status: boolean, user: IUser }> {
        return new Promise<{ status: boolean, user: IUser }>(async (resolve) => {
            try {
                const AccessKey: any = await decodeResp(access);
                const end: Date = new Date(AccessKey.end);
                const user = await UsHelp.getUsers({ _id: AccessKey.user._id });

                if (user[0].enabled && (new Date().getTime() < end.getTime())) {
                    await UsHelp.updateUsers({ _id: AccessKey.user._id }, { last_session: new Date() });
                    resolve({ status: true, user: user[0] });
                } else {
                    resolve({ status: false, user: user[0] });
                };
            } catch (error) {
                console.log("SessionHelper: getAccess ha caido en un error!")
            };
        });
    };

};

export default SessionHelper;