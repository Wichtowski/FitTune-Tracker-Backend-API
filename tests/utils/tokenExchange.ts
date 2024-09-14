import axios from 'axios';
import jwt from 'jsonwebtoken';

async function exchangeCredentialsForToken(credentials: any): Promise<string> {
    try {
        const response = await axios.post('https://example.com/token', credentials);
        const token = response.data.token;

        // Verify the token and return it
        const decodedToken = jwt.verify(token, 'your-secret-key');
        return decodedToken;
    } catch (error) {
        throw new Error('Failed to exchange credentials for token');
    }
}
