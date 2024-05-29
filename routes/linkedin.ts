import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/post', async (req, res) => {
    const { accessToken, content } = req.body;
    console.log('Request received at /post with payload:', { accessToken, content });

    try {
        // Hacer la publicación en LinkedIn
        const postResponse = await axios.post('https://api.linkedin.com/rest/posts', {
            author: 'urn:li:person:5515', // Usando un URN estático de ejemplo
            commentary: content,
            visibility: "PUBLIC",
            distribution: {
                feedDistribution: "MAIN_FEED",
                targetEntities: [],
                thirdPartyDistributionChannels: []
            },
            lifecycleState: "PUBLISHED",
            isReshareDisabledByAuthor: false
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'X-Restli-Protocol-Version': '2.0.0',
                'LinkedIn-Version': '202305'
            }
        });

        res.json(postResponse.data);
    } catch (err) {
        const error = err as any;
        console.error('Error posting to LinkedIn:', {
            message: error.message,
            response: error.response ? {
                status: error.response.status,
                data: error.response.data
            } : null
        });
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
            details: error.response ? error.response.data : null,
        });
    }
});

export default router;