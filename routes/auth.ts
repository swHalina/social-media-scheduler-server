import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/linkedin/callback', async (req, res) => {
    const { code } = req.query;
    try {
        const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
            params: {
                grant_type: 'authorization_code',
                code,
                redirect_uri: 'http://localhost:3000',
                client_id: process.env.LINKEDIN_CLIENT_ID,
                client_secret: process.env.LINKEDIN_CLIENT_SECRET,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const accessToken = response.data.access_token;
        res.json({ access_token: accessToken });
    } catch (err) {
        const error = err as any; // Asegurar que error es de tipo 'any'
        console.error('Error exchanging code for access token:', {
            message: error.message,
            response: error.response ? {
                status: error.response.status,
                data: error.response.data,
            } : null,
        });
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
            details: error.response ? error.response.data : null,
        });
    }
});

export default router;