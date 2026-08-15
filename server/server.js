const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api');

const User = require('./models/User');
const Zip = require('./models/Zip');
const Medicine = require('./models/Medicine');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Database Seeding Function
async function seedInitialData() {
  try {
    // Seed Admin User
    const adminCount = await User.countDocuments();
    if (adminCount === 0) {
      await User.create({ username: 'admin', password: 'password' });
      console.log('Seeded initial admin user (admin / password)');
    }

    // Seed Deliverable ZIP Codes
    const zipCount = await Zip.countDocuments();
    if (zipCount === 0) {
      const defaultZips = ['560001', '560002', '560034', '560037', '560066', '560068', '560100', '682001', '682020', '682030', '110001'];
      for (const z of defaultZips) {
        await Zip.create({ zip: z });
      }
      console.log('Seeded initial deliverable ZIP codes');
    }

    // Seed Medicines Catalog
    const medicineCount = await Medicine.countDocuments();
    if (medicineCount === 0) {
      const initialMedicines = [
        {
          name: 'Abhayarishtam',
          category: 'Arishtam',
          description: 'Effective Ayurvedic tonic for digestive health and relief from constipation & hemorrhoids.',
          price: 145,
          quantity: 50,
          img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60'
        },
        {
          name: 'Amrutharishtam',
          category: 'Arishtam',
          description: 'Potent immunity booster and restorative tonic for chronic fever and weakness.',
          price: 160,
          quantity: 45,
          img: 'https://images.unsplash.com/photo-1550572017-edf7b4458f4a?w=500&auto=format&fit=crop&q=60'
        },
        {
          name: 'Ashta Choornam',
          category: 'Choornam',
          description: 'Traditional herbal powder formula for gas relief, flatulence, and indigestion.',
          price: 120,
          quantity: 60,
          img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60'
        },
        {
          name: 'Brahmi Ghritham',
          category: 'Ghritam',
          description: 'Medicated ghee formulated to support memory, concentration, and nervous system health.',
          price: 380,
          quantity: 30,
          img: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500&auto=format&fit=crop&q=60'
        },
        {
          name: 'Dhanwantharam Thailam',
          category: 'Thailam',
          description: 'Nourishing massage oil recommended for post-delivery care, joint pain, and nerve rejuvenation.',
          price: 220,
          quantity: 40,
          img: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=60'
        },
        {
          name: 'Dasamoolarishtam',
          category: 'Arishtam',
          description: 'Comprehensive health tonic for fatigue, postpartum recovery, and vital energy.',
          price: 210,
          quantity: 35,
          img: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&auto=format&fit=crop&q=60'
        },
        {
          name: 'Sudarsanam Tablet',
          category: 'Tablets',
          description: 'Herbal tablets for fast relief from seasonal fevers, cold, and flu symptoms.',
          price: 95,
          quantity: 100,
          img: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&auto=format&fit=crop&q=60'
        },
        {
          name: 'Kumaryasavam',
          category: 'Arishtam',
          description: 'Ayurvedic syrup for liver health, anemia, and digestive wellness.',
          price: 175,
          quantity: 40,
          img: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500&auto=format&fit=crop&q=60'
        }
      ];
      await Medicine.insertMany(initialMedicines);
      console.log('Seeded initial medicine catalog');
    }
  } catch (err) {
    console.error('Error seeding data:', err);
  }
}

// Database Connection Logic with MongoMemoryServer Fallback
async function startServer() {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/medicine_delivery';
  
  try {
    console.log('Connecting to local MongoDB:', mongoURI);
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 2000
    });
    console.log('Connected to local MongoDB');
  } catch (err) {
    console.log('Local MongoDB not available. Starting MongoMemoryServer fallback...');
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongoServer = await MongoMemoryServer.create();
    const memoryUri = mongoServer.getUri();
    await mongoose.connect(memoryUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to In-Memory MongoDB');
  }

  await seedInitialData();

  // Serve static files from React build directory if it exists
  const buildPath = path.join(__dirname, '../build');
  app.use(express.static(buildPath));

  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(buildPath, 'index.html'));
    }
  });

  app.listen(PORT, () => {
    console.log(`MERN Backend Server listening on port ${PORT}`);
  });
}

startServer();
