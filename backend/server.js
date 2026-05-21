const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Файл для хранения сообщений
const FILE = path.join(__dirname, "messages.json");

// Загружаем сообщения из файла
function loadMessages() {
    try {
        return JSON.parse(fs.readFileSync(FILE, "utf8"));
    } catch {
        return [];
    }
}

// Сохраняем сообщения в файл
function saveMessages(data) {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// Получить все сообщения
app.get("/messages", (req, res) => {
    res.json(loadMessages());
});

// Отправить сообщение
app.post("/send-message", (req, res) => {
    const { name, surname, message, donate } = req.body;

    if (!name || !message) {
        return res.status(400).json({ ok: false, error: "name and message required" });
    }

    const messages = loadMessages();

    const msg = {
        name,
        surname: surname || "",
        message,
        donate: Number(donate) || 0,
        time: Date.now()
    };

    messages.push(msg);
    saveMessages(messages);

    res.json({ ok: true });
});

// Запуск сервера
const port = process.env.PORT || 3001;
app.listen(port, () => console.log("LOCAL BACKEND RUNNING ON PORT " + port));
