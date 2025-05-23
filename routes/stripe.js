import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Top Up Points',
            },
            unit_amount: 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://konnectimpact-module-payment-ashwini.netlify.app/success',
      cancel_url: 'https://konnectimpact-module-payment-ashwini.netlify.app/cancel',
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error('Stripe Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;

