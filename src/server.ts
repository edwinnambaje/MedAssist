import "dotenv/config";
import express from "express";
import compression from "compression";
import cookieparser from "cookie-parser";
import swaggerUi from 'swagger-ui-express';
import { errorHandler, notFoundHandler } from "./middlewares/errors";
import { specs } from './config/swagger';
import morgan from 'morgan';

import validateResource from "./middlewares/validateResource";
import sampleRoute from "./routes/sample";
import connectDB from "./config/db";
import router from "./routes/user";
import medrouter from "./routes/medicine";
import medicinedetailsRouter from "./routes/medicineName";
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(compression());
app.use(cookieparser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req: Request, res: any) => {
  res.json({
    msg: "Med assisst...",
  });
});

app.use("/api/sample", sampleRoute);
app.use("/api/v1/users", router);
app.use("/api/v1/medication", medrouter);
app.use("/api/v1/medication-details", medicinedetailsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

connectDB();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
