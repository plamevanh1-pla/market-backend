    const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const { product, user } = req.body;

    if (!product || !user) {
      return res.status(400).json({ error: "Missing data" });
    }

    const payload = {
      invoice: {
        total_amount: product.price,
        description: product.title,
      },
      store: {
        name: "Market Vocal",
      },
      custom_data: {
        buyer_id: user.id,
        seller_id: product.user_id,
        product_id: product.id,
      },
      actions: {
         return_url: "https://google.com",
         cancel_url: "https://google.com",

        // 🔥 IMPORTANT (callback backend)
        callback_url:
          "https://market-backend-ngcw.onrender.com/api/callback",
      },
    };

    const response = await axios.post(
      "https://app.paydunya.com/sandbox-api/v1/checkout-invoice/create",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "PAYDUNYA-MASTER-KEY": process.env.PAYDUNYA_MASTER_KEY,
          "PAYDUNYA-PRIVATE-KEY": process.env.PAYDUNYA_PRIVATE_KEY,
          "PAYDUNYA-TOKEN": process.env.PAYDUNYA_TOKEN,
        },
      }
    );

    // 🔥 LIEN PAYDUNYA
    const paymentUrl =
      response.data?.response_text ||
      response.data?.response?.url ||
      response.data?.response?.redirect_url;

    if (!paymentUrl) {
      return res.status(500).json({
        error: "No payment URL returned",
        debug: response.data,
      });
    }

    // ✅ RETURN FRONTEND
    return res.json({
      url: paymentUrl,
      productId: product.id,
      userId: user.id,
      amount: product.price,
    });

  } catch (err) {
    console.log("❌ PAY ERROR:", err.response?.data || err.message);

    return res.status(500).json({
      error: "payment failed",
    });
  }
});

module.exports = router;
    