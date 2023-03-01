export interface IPayloadData {
    aud: string[];
    updatePassword: boolean;
    belt: beltThemeType;
    user_name: string;
    scope: string[];
    name: string;
    exp: number;
    authorities: string[];
    jti: string;
    client_id: string;
}

export type beltThemeType = 'Black' | 'Blue' | 'Brown' | 'Green' | 'Orange' | 'Purple' | 'White' | 'Yellow'; 