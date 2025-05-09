import express from "express";
import dbConnect from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

import cookieParser from "cookie-parser";
import cors from "cors";

import morgan from "morgan";

const app = express();

 app.use(
   cors({
     origin: [
       "https://sakhi-app-frontend.vercel.app",
       "http://localhost:5173",
     ],
     methods: "GET,POST,PUT,DELETE",
     credentials: true,
   })
 );


app.options("*", cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

dbConnect();



app.use("/api/v1/user", userRoutes);


app.get("/", (req, res) => {
  res.send("Hello from backend");
});

app.use("*", (req, res) => {
  res.send("route not founds");
});

export default app;
