import { APIRequestContext, APIResponse } from '@playwright/test';

export async function performUserDelete(
    request: APIRequestContext,
    email: string,
    password: string,
    confDelete: boolean
): Promise<APIResponse> {
    const response = await request.post(`/user/delete`, {
        data: {
            email,
            password,
            confDelete,
        },
    });

    if (response.status() != 200) {
        throw new Error(`Login failed with status ${response.status()}`);
    }

    return response;
}
