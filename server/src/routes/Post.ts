import express from "express";
import User from "../models/user";
import MyPost from "../models/post";
import checkAuth from "../middleware/checkAuth";
import stripe from "../utils/stripe";

const router = express.Router();

router.get("/", checkAuth, async (req, res) => {
  const user = await User.findOne({ email: (req as any).user.email });

  const subscriptions = await stripe.subscriptions.list(
    {
      customer: user?.customerStripeId,
      status: "all",
      expand: ["data.default_payment_method"],
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  );

  if (!subscriptions.data.length) return res.json([]);

  //@ts-ignore
  const plan = subscriptions.data[0].plan.nickname;

  let articles;

  if (plan === "Basic") {
    articles = await MyPost.find({ access: "Basic" });
  } else if (plan === "Standard") {
    articles = await MyPost.find({
      access: { $in: ["Basic", "Standard"] },
    });
  } else {
    articles = await MyPost.find({});
  }

  const postsWithComments = await MyPost.find().populate("comments.user");

  return res.json(postsWithComments);
});

export default router;
