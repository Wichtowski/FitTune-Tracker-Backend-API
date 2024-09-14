import { test, expect } from '@playwright/test';
import { performLogIn } from '@utils/read/performLogin';

test('should hit log in', async ({ request }) => {
    const initialLogin = await performLogIn(request, 'oskyy', 'zaq1@WSX');
    console.log(await initialLogin.text());
    expect(initialLogin.status()).toBe(200);
    expect(await initialLogin.json()).toContainText('User logged in successfully');
    expect(await initialLogin.json()).toHaveProperty('token');
});
