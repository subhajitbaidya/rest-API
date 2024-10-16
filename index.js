const express = require("express");
const app = express();
const port = 3000;

app.get('/', (request, response) => {
    response.send("Welcome to your server!");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});