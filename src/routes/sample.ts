import express from "express";
import validateResource from "../middlewares/validateResource";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

export default router;
