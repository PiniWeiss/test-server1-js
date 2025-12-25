import express from "express";
import users from "./routes/users.js"
import events from "./routes/events.js"

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} ${new Date()}`);
  next();
});

app.use("/users", users)
app.use("/creator",events )

app.listen(3000, () => console.log("listening on port 3000"))