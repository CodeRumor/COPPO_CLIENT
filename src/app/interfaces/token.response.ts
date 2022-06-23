/**
 * Model returned when a user successfully logs into the application.
 */
export interface TokenResponse {
  token: string;
  expiration: number;
  refresh_token: string;
}
