import { User } from "./user.model";


interface LoginResData{
    accessToken: string;
    user: User
}
export interface LoginResponse{
    data: LoginResData;
    message: string;
    status: string;
}