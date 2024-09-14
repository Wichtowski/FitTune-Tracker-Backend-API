import { APIRequestContext, APIResponse } from '@playwright/test';

export async function performPlaylistCreate(
    request: APIRequestContext,
    data: { [key: string]: any }
): Promise<APIResponse> {
    const response = await request.post('/playlist/create', {
        data: data,
    });

    return response;
}
