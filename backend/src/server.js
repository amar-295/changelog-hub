import dotenv from 'dotenv';
import connectDB from './db/index.js';

// Load specific environment variables based on NODE_ENV
const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : process.env.NODE_ENV === 'staging'
      ? '.env.staging'
      : '.env.development'; // Defaults to development locally

dotenv.config({
  path: `./${envFile}`,
});

import app from './app.js';

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.on('error', (error) => {
      console.log('error', error);
      throw error;
    });

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log('MonogoDB connection failed', error);
  });
