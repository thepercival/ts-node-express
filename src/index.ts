// src/index.ts
import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import poolRoutes from './routes/pools';
import { components } from "./models/sports";
var bodyParser = require('body-parser');
/*
 * Load up and parse configuration details from
 * the `.env` file to the `process.env`
 * object of Node.js
 */
dotenv.config();

/*
 * Create an Express application and get the
 * value of the PORT environment variable
 * from the `process.env`
 */
const app: Express = express();
const port = process.env.PORT || 3000;

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/pools', poolRoutes); // Add this line to mount the Task API routes
const x: components["schemas"]["Sport"] = {
  id: 0,
  name: 'testsport',
  isTeam: true,
  defaultGamemode: "against",
  defaultNrOfSidePlaces: 1
}
console.log(x);
/* Define a route for the root path ("/")
 using the HTTP GET method */
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server " + process.env.HELLO);
});

// Add this error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

/* Start the Express app and listen
 for incoming requests on the specified port */
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
