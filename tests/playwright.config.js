// @ts-check
import { defineConfig, devices } from '@playwright/test';

require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    testDir: './tests',
    fullyParallel: false,
    workers: 1,
    // forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    reporter: 'html',
    use: {
        baseURL: `http://localhost:${process.env.PORT}/fitTune-api`,
        paths: {
            '@utils': '/utils',
        },
        extraHTTPHeaders: {
            Authorization: 'Bearer ' + process.env.ACCESS_TOKEN_SECRET,
        },

        trace: 'on-first-retry',
    },

    projects: [
        {
            name: 'create',
            testDir: './tests/create',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'update',
            testDir: './tests/update',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'read',
            testDir: './tests/read',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'delete',
            testDir: './tests/delete',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
