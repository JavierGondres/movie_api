import { createApp } from "../..";
import { UserModel } from "../../models/mongo/users";

createApp({ userModel: UserModel });
