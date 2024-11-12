export const buildAxiosConfigWithToken = (token: string) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};