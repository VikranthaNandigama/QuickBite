const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
    key_id: "YOUR_KEY_ID",
    key_secret: "YOUR_KEY_SECRET",
});

// API to create order
app.post("/create-order", async (req, res) => {
    const { amount } = req.body;

    try {
        const order = await razorpay.orders.create({
            amount: amount * 100,  // Convert to paise
            currency: "INR",
            receipt: "receipt#1",
        });
        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
