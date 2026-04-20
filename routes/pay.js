    const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const { product, user } = req.body;

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
        return_url: "myapp://success",
        cancel_url: "myapp://cancel",
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

    res.json({
      url: response.data.response_text,
    });
  } catch (err) {
    console.log("PAY ERROR:", err.message);
    res.status(500).json({ error: "payment failed" });
  }
});

module.exports = router;