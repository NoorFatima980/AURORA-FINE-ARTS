# Aurora Fine Arts Gallery

A modern, responsive web application for showcasing contemporary art exhibitions and artists. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- Exhibition Showcase: Browse current and upcoming exhibitions with detailed information
- Artist Profiles: Discover featured artists with portfolio displays
- Image Galleries: Interactive image galleries with lightbox functionality
- Contact System: Integrated contact form for visitor inquiries
- Newsletter Subscription: Email newsletter signup functionality
- Responsive Design: Mobile-first design that works on all devices
- Custom CSS: Tailored styling without external frameworks

## Technology Stack

- Frontend: React.js with custom CSS
- Backend: Node.js with Express.js
- Database: MongoDB with Mongoose ODM
- Routing: React Router DOM
- HTTP Client: Axios
- Icons: React Feather Icons

## Project Structure


aurora-fine-arts/
├── backend/
│   ├── models/          # MongoDB data models
│   ├── routes/          # API route handlers
│   ├── middleware/      # Custom middleware
│   └── server.js        # Express server
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/          # Page components
│   ├── App.js          # Main application component
│   └── index.css       # Global styles
└── public/             # Static assets


## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
bash
cd backend


2. Install dependencies:
bash
npm install


3. Create environment file (.env):
env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/aurora-fine-arts
CLIENT_URL=http://localhost:3000


4. Start the backend server:
bash
npm run dev


### Frontend Setup

1. Install frontend dependencies:
bash
npm install


2. Start the development server:
bash
npm start


### Database Setup

1. Ensure MongoDB is running on your system
2. Seed the database with sample data:

bash
cd backend
npm run seed


## Available Scripts

- npm start - Start the React development server
- npm run build - Build the application for production
- npm test - Run the test suite
- npm run dev - Start both frontend and backend simultaneously (requires concurrently)
- npm run server - Start only the backend server

## API Endpoints

### Exhibitions
- GET /exhibitions - Get all exhibitions
- GET /exhibitions/upcoming - Get upcoming exhibitions
- GET /exhibitions/:id - Get single exhibition details

### Artists
- GET /artists - Get all artists
- GET /artists/featured - Get featured artists
- GET /artists/:id - Get single artist profile

### Contact & Newsletter
- POST /contact - Submit contact form
- POST /newsletter - Subscribe to newsletter

## Image Management

The application supports multiple image display options:

1. External Image URLs: Use high-quality images from services like Unsplash
2. Local Image Uploads: Upload and manage images through the admin interface
3. Image Galleries: Multiple images per exhibition with lightbox functionality

## Customization

### Styling
- All styles are custom CSS in src/index.css
- Color variables are defined in CSS custom properties
- Responsive breakpoints for mobile, tablet, and desktop

### Content Management
- Update sample data in backend/sampleData.js
- Modify exhibition and artist information through the database
- Add new image URLs or upload local images

## Deployment

### Backend Deployment
1. Set production environment variables
2. Build and deploy to your preferred Node.js hosting service
3. Configure MongoDB connection string for production

### Frontend Deployment
1. Run npm run build to create production build
2. Deploy the build folder to your static hosting service
3. Update API endpoints for production environment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
