const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/ask", async (req, res) => {
    const message = req.body.message;

    try {
        const response = await axios.post(
            "https://api.deepseek.com/v1/chat/completions",
            {
                model: "deepseek-chat",
                messages: [
                    { role: "user", content: message }
                ]
            },
            {
                headers: {
                    "Authorization": "Bearer " + process.env.DEEPSEEK_KEY,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json(response.data);
    } catch (err) {
        res.status(500).send("Error");
    }
});

app.listen(3000, () => console.log("Running"));
