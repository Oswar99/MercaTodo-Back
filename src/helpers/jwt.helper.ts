import jwt from "jwt-simple";
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(__dirname, "../../.env") });

export function encodeResp(obj: any) {
    return jwt.encode(obj, process.env.ETK!, "HS256");
};

export async function decodeResp(tk: string) {
    return jwt.decode(tk, process.env.ETK!, false, "HS256");
};

export function encodeModel(obj: any) {
    return jwt.encode(obj, process.env.TK!);
};

export async function decodeModel(tk: string) {
    return jwt.decode(tk, process.env.TK!);
};
