import { APIRequestContext, APIResponse } from '@playwright/test';

export async function performPlaylistDelete(
    request: APIRequestContext,
    data: { [key: string]: any }
): Promise<APIResponse> {
    const response = await request.post('/playlist/delete', {
        data: {
            playlistID: data.playlistID,
            userID: data.userID,
        },
    });

    return response;
}
