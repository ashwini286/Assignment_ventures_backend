// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import bodyParser from 'body-parser';

// import stripeRoutes from './routes/stripe.js';
// import webhookHandler from './webhook/webhookHandler.js';

// dotenv.config();
// const app = express();

// app.use(cors({
//   origin: 'https://konnectimpact-module-payment-ashwini.netlify.app/',
// }));
// app.use(express.json());


// app.get('/', (req, res) => {
//   res.send('Backend is running ');
// });
// app.use('/create-checkout-session', stripeRoutes);
// app.post('/webhook', bodyParser.raw({ type: 'application/json' }), webhookHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import stripeRoutes from './routes/stripe.js';
import webhookHandler from './webhook/webhookHandler.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: 'https://konnectimpact-module-payment-ashwini.netlify.app',
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.use('/create-checkout-session', stripeRoutes);
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), webhookHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
