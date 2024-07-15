export interface Token{
    accessToken: string;
}
export interface LoginResponse{
    data: Token;
    message: string;
    status: string;
}