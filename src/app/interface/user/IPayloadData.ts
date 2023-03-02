export interface IPayloadData {
    aud: string[];
    updatePassword: boolean;
    id: number;
    user_name: string;
    scope: string[];
    name: string;
    exp: number;
    authorities: string[];
    jti: string;
    client_id: string;
}