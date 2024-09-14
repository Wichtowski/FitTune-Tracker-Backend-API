import { test, expect } from '@playwright/test';
import { performPlaylistDelete } from '@utils/delete/performPlaylistDelete';
const objectIDs = require('../../utils/testObjectIDs');

require('dotenv').config();

for (let i = 3; i < 0; i--) {
    test(`should delete previously created playlists`, async ({ request }) => {
        const response = await performPlaylistDelete(request, {
            playlistID: objectIDs[i],
            userID: process.env.USER_ID_SECRET,
        });
        expect(response.status()).toBe(400);
    });
}
