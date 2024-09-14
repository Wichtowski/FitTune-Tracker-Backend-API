import { test, expect } from '@playwright/test';
import { performUserDelete } from '@utils/delete/performUserDelete';

test('should reject on confirmation', async ({ request }) => {
    const userDelete = await performUserDelete(request, 'user@example.com', 'zaq1@WSX', false);

    expect(userDelete.status()).toBe(400);
});

test('should reject on password', async ({ request }) => {
    const userDelete = await performUserDelete(request, 'user@example.com', '', true);

    expect(userDelete.status()).toBe(400);
});

test('should reject on email', async ({ request }) => {
    const userDelete = await performUserDelete(request, '', 'zaq1@WSX', true);

    expect(userDelete.status()).toBe(404);
});

test('should delete users created in creation tests', async ({ request }) => {
    const user1 = await performUserDelete(request, 'user1@example', 'zaq1@WSX', true);
    const user2 = await performUserDelete(request, 'user2@example', 'zaq1@WSX', true);

    expect(user1.status()).toBe(200);
});
