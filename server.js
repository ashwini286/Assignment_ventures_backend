
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import stripeRoutes from './routes/stripe.js';
import webhookHandler from './webhook/webhookHandler.js';

dotenv.config();
const app = express();

app.use(express.json());
const allowedOrigins = [
  'http://localhost:3000',
  'https://konnectimpact-module-payment-ashwini.netlify.app'
];

app.use(cors({
  origin: function (origin, callback) {
    
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.use('/create-checkout-session', stripeRoutes);
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), webhookHandler);
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
