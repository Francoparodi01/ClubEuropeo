require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const admin = require('firebase-admin');

// Inicializar Firebase Admin SDK
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'club-europeo.appspot.com', // Asegúrate de que este bucket sea correcto
});

const bucket = admin.storage().bucket();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de Multer (en memoria)
const upload = multer({
  storage: multer.memoryStorage(),
});

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.error('Error al conectar a MongoDB:', error));

// Esquema de Noticias en MongoDB
const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: String,
  publishedAt: { type: Date, required: true },
});

const News = mongoose.model('News', newsSchema);

// Ruta de prueba
app.get('/api', (req, res) => {
  res.send('Backend funcionando!');
});

// Ruta para manejar noticias
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

    blobStream.on('finish', () => {
      imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      const news = new News({ title, content, author, imageUrl, publishedAt });
      news.save()
        .then((news) => res.status(201).json(news))
        .catch((error) => {
          console.error('Error al publicar la noticia:', error);
          res.status(500).json({ error: 'Error al publicar la noticia.', details: error.message });
        });
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

// Obtener todas las noticias
app.get('/news', async (req, res) => {
  try {
    const newsList = await News.find();
    res.status(200).json(newsList);
  } catch (error) {
    console.error('Error al obtener las noticias:', error);
    res.status(500).json({ error: 'Error al obtener las noticias.', details: error.message });
  }
});

// Obtener una noticia específica por ID
app.get('/news/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const news = await News.findById(id);
    if (news) {
      res.status(200).json(news);
    } else {
      res.status(404).json({ error: 'Noticia no encontrada.' });
    }
  } catch (error) {
    console.error('Error al obtener la noticia:', error);
    res.status(500).json({ error: 'Error al obtener la noticia.', details: error.message });
  }
});

// Actualizar una noticia por ID
app.put('/news/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { title, content, publishedAt, author } = req.body;
  let imageUrl = null;

  try {
    const updatedNews = {
      title,
      content,
      publishedAt,
      author
    };

    if (req.file) {
      const blob = bucket.file(Date.now() + path.extname(req.file.originalname));
      const blobStream = blob.createWriteStream({
        resumable: false,
      });

      blobStream.on('error', (err) => {
        console.error('Error al subir la imagen a Firebase Storage:', err);
        return res.status(500).json({ error: 'Error al subir la imagen a Firebase Storage.' });
      });

      blobStream.on('finish', () => {
        imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        updatedNews.imageUrl = imageUrl;

        News.findByIdAndUpdate(id, updatedNews, { new: true })
          .then((news) => {
            if (news) {
              res.status(200).json(news);
            } else {
              res.status(404).json({ error: 'Noticia no encontrada.' });
            }
          })
          .catch((error) => {
            console.error('Error al actualizar la noticia:', error);
            res.status(500).json({ error: 'Error al actualizar la noticia.', details: error.message });
          });
      });

      blobStream.end(req.file.buffer);
    } else {
      News.findByIdAndUpdate(id, updatedNews, { new: true })
        .then((news) => {
          if (news) {
            res.status(200).json(news);
          } else {
            res.status(404).json({ error: 'Noticia no encontrada.' });
          }
        })
        .catch((error) => {
          console.error('Error al actualizar la noticia:', error);
          res.status(500).json({ error: 'Error al actualizar la noticia.', details: error.message });
        });
    }
  } catch (error) {
    console.error('Error al actualizar la noticia:', error);
    res.status(500).json({ error: 'Error al actualizar la noticia.', details: error.message });
  }
});

// Eliminar una noticia por ID
app.delete('/news/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const news = await News.findByIdAndDelete(id);
    if (news) {
      res.status(200).json({ message: 'Noticia eliminada con éxito.' });
    } else {
      res.status(404).json({ error: 'Noticia no encontrada.' });
    }
  } catch (error) {
    console.error('Error al eliminar la noticia:', error);
    res.status(500).json({ error: 'Error al eliminar la noticia.', details: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
