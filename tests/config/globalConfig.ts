import { FullConfig } from '@playwright/test';
import { exchangeCredentialsForToken } from '@utils/tokenExchange';

async function globalSetup(config: FullConfig) {
    const access_token = await exchangeCredentialsForToken();
    if (access_token) {
        process.env.PW_ACCESS_TOKEN = access_token;
    }
}

export default globalSetup;
