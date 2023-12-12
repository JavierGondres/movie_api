import { createApp } from "../..";
import { AuthModel } from "../../models/mongo/auth";
import { UserModel } from "../../models/mongo/users";

createApp({ userModel: UserModel, authModel: AuthModel});
