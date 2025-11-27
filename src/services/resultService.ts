import { api } from "@/lib/apiClient";

export async function getTracks(id: string) {
    return api(`/tracks?id=${id}`);
}

export async function getEdl(id: string) {
    const res = await fetch(`/edl?id=${id}`);

    return await res.text();
}
