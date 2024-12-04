const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/download', async (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl || !ytdl.validateURL(videoUrl)) {
        return res.status(400).send({ status: 'error', message: 'Invalid YouTube URL' });
    }

    try {
        const info = await ytdl.getInfo(videoUrl);
        const formats = ytdl.chooseFormat(info.formats, { quality: 'highest' });

        res.json({
            status: 'success',
            formats: formats.map(format => ({
                resolution: format.resolution || 'Audio',
                url: format.url
            }))
        });
    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Failed to fetch video data' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
