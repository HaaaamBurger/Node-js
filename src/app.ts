import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = "4444";
app.listen(PORT, () => {});
