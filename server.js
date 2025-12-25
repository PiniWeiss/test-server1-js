import express from "express";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} ${new Date()}`);
  next();
});


app.listen(3000, () => console.log("listening on port 3000"))