import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/router";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

const port = process.env.PORT || 3002;

app.get("/", (req, res) => {
    res.send("Backend is working");
});

app.use("/api/v1", router)

app.listen(port, () => {
    console.log(`Port is listening on ${port}`)
})