import express from "express";

const PORT = process.env.PORT ?? 4000;

const app = express();
app.get("/", (req, res) => {
  res.send("<h1>Inicio del server pá</h1>");
});

app.listen(PORT, () => {
  console.log("Server en express iniciado en el port: ", PORT);
});
