// routes/profile.ts
import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/profile', async (req, res) => {
    const { accessToken } = req.query;
    try {
        const response = await axios.get('https://api.linkedin.com/v2/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'X-Restli-Protocol-Version': '2.0.0'
            }
        });
        res.json(response.data);
    } catch (err) {
        const error = err as any;
        console.error('Error fetching LinkedIn profile:', error.response ? error.response.data : error.message);
        res.status(500).send('Internal Server Error');
    }
});

export default router;