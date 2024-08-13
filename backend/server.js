require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const app = express();

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); 

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.error('Error al conectar a MongoDB:', error));

// Definir el esquema y el modelo para Noticias
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
  const imageUrl = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null;

  try {
    const news = new News({ title, content, author, imageUrl, publishedAt });
    await news.save();
    res.status(201).json(news);
  } catch (error) {
    console.error('Error al publicar la noticia:', error);
    res.status(500).json({ error: 'Error al publicar la noticia.', details: error.message });
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
  
  try {
    // Crear un objeto para almacenar los datos actualizados
    const updatedNews = {
      title,
      content,
      publishedAt,
      author
    };

    // Si se carga una nueva imagen, añade la URL de la imagen al objeto actualizado
    if (req.file) {
      updatedNews.imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    // Actualizar la noticia en la base de datos
    const news = await News.findByIdAndUpdate(id, updatedNews, { new: true });

    if (news) {
      res.status(200).json(news);
    } else {
      res.status(404).json({ error: 'Noticia no encontrada.' });
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
  console.log(`Server is running on port ${PORT}`);
});
