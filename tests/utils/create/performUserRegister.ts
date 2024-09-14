import { APIRequestContext, APIResponse } from '@playwright/test';

export async function performUserRegister(
    request: APIRequestContext,
    data: { [key: string]: any }
): Promise<APIResponse> {
    const response = await request.post('/user/register', {
        data: data,
    });

    return response;
}
