export type Payload = {
  grant_type: string;
  refresh_token?: string;
};

export type Credentials = {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  scope?: string;
  expires_in: number;
  error: string;
  error_description?: string;
};
