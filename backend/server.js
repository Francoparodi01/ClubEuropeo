require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const admin = require('firebase-admin');
const axios = require('axios');

// Inicializar Firebase Admin SDK
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'club-europeo.appspot.com',
});

const bucket = admin.storage().bucket();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.error('Error al conectar a MongoDB:', error));

// Configuración de almacenamiento para Multer (en memoria)
const upload = multer({
  storage: multer.memoryStorage(),
});

// Ruta para obtener noticias desde una API externa
app.get('/external-news', async (req, res) => {
  try {
    const response = await axios.get('https://external-news-api.com/news'); // Reemplaza con la URL de la API externa
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error al obtener noticias de la API externa:', error);
    res.status(500).json({ error: 'Error al obtener noticias.' });
  }
});

// Ruta para manejar la subida de noticias con imagen
app.post('/news', upload.single('image'), async (req, res) => {
  const { title, content, publishedAt, author } = req.body;
  let imageUrl = null;

  if (req.file) {
    const blob = bucket.file(Date.now() + path.extname(req.file.originalname));
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on('error', (err) => {
      console.error('Error al subir la imagen a Firebase Storage:', err);
      return res.status(500).json({ error: 'Error al subir la imagen a Firebase Storage.' });
    });

    blobStream.on('finish', async () => {
      imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      try {
        const news = new News({ title, content, author, imageUrl, publishedAt });
        await news.save();
        res.status(201).json(news);
      } catch (error) {
        console.error('Error al publicar la noticia:', error);
        res.status(500).json({ error: 'Error al publicar la noticia.', details: error.message });
      }
    });

    blobStream.end(req.file.buffer);
  } else {
    try {
      const news = new News({ title, content, author, imageUrl, publishedAt });
      await news.save();
      res.status(201).json(news);
    } catch (error) {
      console.error('Error al publicar la noticia:', error);
      res.status(500).json({ error: 'Error al publicar la noticia.', details: error.message });
    }
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
