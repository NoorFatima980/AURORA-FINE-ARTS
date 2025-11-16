const mongoose = require('mongoose');
require('dotenv').config();

const Artist = require('./models/Artist');
const Exhibition = require('./models/Exhibition');

const sampleData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Artist.deleteMany({});
    await Exhibition.deleteMany({});

    // Insert sample artists
    const artists = await Artist.insertMany([
      {
        name: "Elena Rodriguez",
        specialty: "Mixed Media & Abstract Expressionism",
        bio: "Elena Rodriguez is known for her vibrant mixed-media works that explore the boundaries between traditional painting and contemporary digital art. Her work has been exhibited internationally and is held in numerous private collections.",
        image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&w=400&h=400&fit=crop&crop=face",
        featured: true,
        status: "active"
      },
      {
        name: "Marcus Chen",
        specialty: "Digital Art & Interactive Installations",
        bio: "Marcus Chen pushes the boundaries of digital art with his immersive interactive installations. Combining cutting-edge technology with traditional artistic sensibilities, his work creates unique viewer experiences.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=400&h=400&fit=crop&crop=face",
        featured: true,
        status: "active"
      },
      {
        name: "Sophie Williams",
        specialty: "Sculpture & Contemporary Craft",
        bio: "Sophie Williams transforms traditional materials into contemporary sculptural forms. Her work explores the relationship between materiality, memory, and the human experience through innovative crafting techniques.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&w=400&h=400&fit=crop&crop=face",
        featured: true,
        status: "active"
      }
    ]);

    // Insert sample exhibitions
    await Exhibition.insertMany([
      {
        title: "Ethereal Dimensions",
        description: "Exploring the boundaries between reality and imagination through immersive installations that challenge perception and invite viewers to question their relationship with space and form. This groundbreaking exhibition brings together works from twelve contemporary artists who push the boundaries of traditional art forms. Through mixed media, digital projections, and interactive installations, Ethereal Dimensions creates an environment where visitors become part of the artwork itself. Featured pieces include Elena Rodriguez's Quantum Dreams - a suspended installation that responds to movement and sound, Marcus Chen's Digital Consciousness - an AI-generated art experience that evolves in real-time, and Sophie Williams - sculptural works that incorporate both traditional and futuristic materials. The exhibition is curated to guide visitors through three distinct zones: The Gateway (exploring threshold spaces), The Labyrinth (navigating complex realities), and The Summit (achieving new perspectives). Each zone offers unique sensory experiences that challenge conventional ways of seeing and understanding art." ,
        startDate: new Date("2024-04-15"),
        endDate: new Date("2024-06-30"),
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
        status: "upcoming",
        featured: true,
        location: "Main Gallery Hall",
        admission: "Free"
      },
      {
        title: "Urban Narratives",
        description: "Contemporary artists reflect on city life, architecture, and urban transformation through a diverse range of media including photography, painting, and mixed-media installations.",
        startDate: new Date("2024-07-10"),
        endDate: new Date("2024-09-25"),
        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
        status: "upcoming",
        featured: true,
        location: "Contemporary Wing",
        admission: "Free"
      },
      {
        title: "Material Memories",
        description: "Sculptural works exploring memory, materiality, and the passage of time. This exhibition features artists who transform traditional materials into contemporary statements about preservation and transformation.",
        startDate: new Date("2024-10-05"),
        endDate: new Date("2024-12-20"),
        image: "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
        status: "upcoming",
        featured: true,
        location: "Sculpture Garden",
        admission: "Free"
      }
    ]);

    console.log('✅ Sample data inserted successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error inserting sample data:', error);
    process.exit(1);
  }
};

sampleData();