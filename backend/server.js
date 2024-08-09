const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/api', (req, res) => {
    res.send('Backend funcionando!');
});

// Ruta para manejar noticias
app.post('/news', async (req, res) => {
    const { title, content, imageUrl, publishedAt } = req.body;
    try {
        const news = await prisma.news.create({
            data: {
                title,
                content,
                imageUrl,
                publishedAt
            },
        });
        res.status(201).json(news);
    } catch (error) {
        res.status(500).json({ error: 'Error al publicar la noticia.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
