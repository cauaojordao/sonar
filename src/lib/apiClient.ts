export const api = async (url: string, options: RequestInit = {}) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return res.json();
};
