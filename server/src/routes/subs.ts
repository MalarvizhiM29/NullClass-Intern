import express from "express";
import User from "../models/user";
//import MyPost from "../models/post";
import checkAuth from "../middleware/checkAuth";
import stripe from "../utils/stripe";

const router = express.Router();

router.get("/prices", checkAuth, async (req, res) => {
  const prices = await stripe.prices.list({
    apiKey: process.env.STRIPE_SECRET_KEY,
  });
  return res.json(prices);
});

router.post("/session", checkAuth, async (req, res) => {
  const user = await User.findOne({ email: (req as any).user.email });

  // MyPost.create({
  //   title: "Payment details",
  //   content: "How to add Stripe or Razopay",
  //   access: "Gold",
  // });

  const session = await stripe.checkout.sessions.create(
    {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: req.body.priceId,
          quantity: 1,
        },
      ],
      success_url: "http://localhost:5000/subscription",
      cancel_url: "http://localhost:5000/sub-plan",
      customer: user?.customerStripeId,
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  );
  return res.json(session);
});

export default router;
