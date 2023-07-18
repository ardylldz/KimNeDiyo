export interface LoginDto {
    name: string;
    password: string;
}

export interface CreateNewsDto {
    header: string;
    content?: string;
}

export interface RegisterDto {
    name: string;
    password: string;
}
