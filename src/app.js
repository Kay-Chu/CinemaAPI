import express from "express";

const app = express();
const port = 80;

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const result = {
        token: 'test123'
    }
    res.json(result);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));