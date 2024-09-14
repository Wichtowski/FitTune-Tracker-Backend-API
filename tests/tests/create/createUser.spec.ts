import { test, expect } from '@playwright/test';
import { performUserRegister } from '@utils/create/performUserRegister';
require('dotenv').config();

test.only('should register user successfully with full info', async ({ request }) => {
    const response = await performUserRegister(request, {
        username: 'oskyy',
        email: 'user1@example.com',
        password: 'zaq1@WSX',
        confPasswd: 'zaq1@WSX',
        name: 'Oskar',
        surname: 'Wichtowski',
        birthdate: '2002-07-02',
    });
    console.log(response.status());

    expect(response.status()).toBe(201);
    expect(await response.json()).toMatchObject({ message: 'User created successfully' });
});

test('should register user successfully with minimal info', async ({ request }) => {
    const response = await performUserRegister(request, {
        username: 'anotherUser',
        email: 'user2@example.com',
        password: 'zaq1@WSX',
        confPasswd: 'zaq1@WSX',
    });

    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject({ message: 'User created successfully' });
});

test('should reject on duplicate email', async ({ request }) => {
    const response = await performUserRegister(request, {
        username: 'anotherUser',
        email: 'user1@example.com',
        password: 'zaq1@WSX',
        confPasswd: 'zaq1@WSX',
        name: 'John',
        surname: 'Doe',
        birthdate: '1990-01-01',
    });

    expect(response.status()).toBe(400);
    expect(await response.json()).toMatchObject({ message: 'Email already in use!' });
});

test('should reject on missing fields', async ({ request }) => {
    const response = await performUserRegister(request, {
        username: '',
    });
    expect(response.status()).toBe(404);
});

test('should reject on invalid email', async ({ request }) => {
    const response = await performUserRegister(request, {
        email: 'userexample.com',
    });

    expect(response.status()).toBe(400);
    expect(await response.json()).toMatchObject({ message: 'Invalid email' });
});

test('should reject on password length', async ({ request }) => {
    const response = await performUserRegister(request, {
        username: 'oskyy',
        email: 'user@example.com',
        password: 'pass',
    });
    expect(response.status()).toBe(400);
    expect(response.json()).toMatchObject({ message: 'Password must be at least 6 characters long' });
});

test('should reject on password with no Capital character', async ({ request }) => {
    const response = await performUserRegister(request, {
        username: 'oskyy',
        email: 'user@example.com',
        password: 'password',
    });
    expect(response.status()).toBe(400);
    expect(await response.json()).toMatchObject({ message: 'Password must contain at least one special character' });
});

test('should reject on password with username', async ({ request }) => {
    const response = await performUserRegister(request, {
        username: 'oskyy',
        email: 'user@example.com',
        password: 'passwordoskyy',
    });
    expect(response.status()).toBe(400);
    expect(await response.json()).toMatchObject({ message: 'Password must contain at least one special character' });
});

test('should reject on password with no special character', async ({ request }) => {
    const response = await performUserRegister(request, {
        username: 'oskyy',
        email: 'user@example.com',
        password: 'Password',
    });
    expect(response.status()).toBe(400);
    expect(await response.json()).toMatchObject({ message: 'Password must contain at least one special character' });
});

test('should reject on password mismatch', async ({ request }) => {
    const response = await performUserRegister(request, {
        username: 'oskyy',
        email: 'user@example.com',
        password: 'zaq1@WSX',
        confPasswd: 'wrongPassword',
        name: 'Oskar',
        surname: 'Wichtowski',
        birthdate: '2002-07-02',
    });

    expect(response.status()).toBe(400);
    expect(await response.json()).toMatchObject({ message: 'Passwords do not match' });
});
