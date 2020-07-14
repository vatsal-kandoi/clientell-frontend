export interface UserAuthResponse {
    code: number,
    success: boolean;
    access_token: string;
}

export interface RefreshTokenResponse {
    code: number;
    success: boolean;
    message?: string;
    access_token?: string;
}