import { APIRequestContext, APIResponse } from '@playwright/test';

export async function performLogIn(request: APIRequestContext, login: string, password: string): Promise<APIResponse> {
    const response = await request.post(`/user/login`, {
        data: {
            login,
            password,
        },
    });

    if (response.status() != 200) {
        throw new Error(`Login failed with status ${response.status()}`);
    }

    return response;
}
