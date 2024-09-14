import { test, expect } from '@playwright/test';
import { performPlaylistCreate } from '@utils/create/performPlaylistCreate';
const objectIDs = require('../../utils/testObjectIDs');

require('dotenv').config();

test('should create playlist successfully without exercises', async ({ request }) => {
    const response = await performPlaylistCreate(request, {
        id: objectIDs[0],
        userID: process.env.USER_ID_SECRET,
        playlistName: 'My Playlist',
        playlistDescription: 'This is a test playlist',
    });

    expect(response.status()).toBe(200);
    expect(response.json()).toMatchObject({ message: 'Playlist created successfully' });
});

test('should create playlist successfully with one exercise', async ({ request }) => {
    const response = await performPlaylistCreate(request, {
        id: objectIDs[1],
        userID: process.env.USER_ID_SECRET,
        playlistName: 'My Playlist',
        playlistDescription: 'This is a test playlist',
        exercises: [{ exerciseID: '66486a6b5ac72e107ca67efe' }],
    });

    expect(response.status()).toBe(200);
    expect(response.json()).toMatchObject({ message: 'Playlist created successfully' });
});

test('should create playlist successfully with multiple exercise', async ({ request }) => {
    const response = await performPlaylistCreate(request, {
        id: objectIDs[2],
        userID: process.env.USER_ID_SECRET,
        playlistName: 'My Playlist',
        playlistDescription: 'This is a test playlist',
        exercises: [{ exerciseID: '66486a6b5ac72e107ca67efe' }, { exerciseID: '66486a7d5ac72e107ca67f01' }],
    });

    expect(response.status()).toBe(200);
    expect(response.json()).toMatchObject({ message: 'Playlist created successfully' });
});

test('should create playlist successfully with one exercise with details', async ({ request }) => {
    const response = await performPlaylistCreate(request, {
        id: objectIDs[3],
        userID: process.env.USER_ID_SECRET,
        playlistName: 'My Playlist',
        playlistDescription: 'This is a test playlist',
        exercises: [{ exerciseID: '66486a6b5ac72e107ca67efe', details: { sets: 3, repetitions: 12, weight: 65 } }],
    });

    expect(response.status()).toBe(200);
    expect(response.json()).toMatchObject({ message: 'Playlist created successfully' });
});

test('should reject playlist creation with missing userID', async ({ request }) => {
    const response = await performPlaylistCreate(request, {
        userID: '',
        playlistName: 'My Playlist',
        playlistDescription: 'This is a test playlist',
    });

    expect(response.status()).toBe(404);
});

test('should reject playlist creation with missing playlist name', async ({ request }) => {
    const response = await performPlaylistCreate(request, {
        userID: process.env.USER_ID_SECRET,
        playlistName: '',
        playlistDescription: 'This is a test playlist',
    });

    expect(response.status()).toBe(404);
});

test('should reject playlist creation when exercise does not exists', async ({ request }) => {
    const response = await performPlaylistCreate(request, {
        userID: process.env.USER_ID_SECRET,
        playlistName: 'My Playlist',
        playlistDescription: 'This is a test playlist',
        exercises: [{ exerciseID: objectIDs[-1] }],
    });

    expect(response.status()).toBe(400);
});
