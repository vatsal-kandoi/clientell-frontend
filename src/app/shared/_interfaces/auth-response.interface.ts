export interface AuthFetchedResponse {
  success: boolean;
  message: string;
  code: number;
  access_token: string;
  refresh_token: string;
}
