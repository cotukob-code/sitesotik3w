import express from "express";
const app = express();

app.use(express.static("public")); // или твоя папка с сайтом

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on port " + port));
