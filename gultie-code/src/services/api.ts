const API_BASE_URL =
    import.meta.env.VITE_API_URL;

export const apiFetch = async (
    endpoint: string,
    options: RequestInit = {}
) => {

    const token =
        localStorage.getItem("token");

    const response =
        await fetch(
            `${API_BASE_URL}${endpoint}`,
            {
                ...options,

                headers: {
                    "Content-Type":
                        "application/json",

                    ...options.headers,

                    ...(token && {
                        Authorization:
                            `Bearer ${token}`
                    })
                }
            }
        );

    const data =
        await response.json();

    if (!response.ok) {

        if (
            response.status === 401
        ) {

            localStorage.removeItem(
                "token"
            );

            window.location.href =
                "/login";
        }

        throw new Error(
            data.detail ||
            "Request failed"
        );
    }

    return data;
};  