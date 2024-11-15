// OM NAMASIVAYA
import express from "express";
import apiRouter from "./api.router.js"
import swaggerUi from "swagger-ui-express"
import swaggerDoc from "./swagger.json" assert { type: "json" };

//middleware
import { errorHandlerMiddleware, urlNotExistMiddlerare } from "./src/middlewares/applicationError.middleware.js"
import Loggers from "./src/middlewares/logger.middleware.js"

export const server = express();
const logger = new Loggers();

//swagger middleware
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

server.use(express.json()); 
server.use(logger.requestLogger);


server.use("/api", apiRouter);


server.get("/", (req, res)=>{
    res.status(200).send("welcome to social-media-app");
})


server.use(urlNotExistMiddlerare);
server.use(errorHandlerMiddleware);




