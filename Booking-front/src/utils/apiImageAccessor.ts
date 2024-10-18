import { API_URL } from "utils/getEnvData.ts";

export function getApiImageUrl(name: string, size: number) {
    return `${API_URL}/images/${size}_${name}`;
}