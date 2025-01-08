import { User } from "./Users"

export type APISignIn = {
    user: User,
    access_token: string
}

export type APISignUp = {
    user: User,
    access_token: string;
}