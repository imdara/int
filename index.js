import express from "express";
import mongoose from "mongoose";
import taskRoute from "./routes/taskRoute.js";
import userRoute from "./routes/userRoute.js";
import {config} from "dotenv";
config();
const port = process.env.port || 8080;

const app = express();

//middleware to parse json
app.use(express.json());

//connecting to the database
mongoose
  .connect(process.env.connectionUrl || "mongodb://127.0.0.1:27017/test", {})
  .then(app.listen(port, () => console.log("Connected to the database")))
  .catch((err) => console.log(err));

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to the database");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

//routes
app.get("/", (req, res) =>
  res.send({ status: "OK", message: "Welcome to my server" })
);

app.use("/tasks", taskRoute);
app.use("/users", userRoute);
