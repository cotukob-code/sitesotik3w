// УНИВЕРСАЛЬНЫЙ API: локал → localhost:3001, прод → Render
// Тестовое изменение для проверки деплоя
const isLocal =
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1" ||
    (location.hostname.includes("sitesotik") && location.protocol === "http:");

const API = isLocal
    ? "http://localhost:3001"
    : "https://sos-s6g7.onrender.com";

async function loadMessages() {
    try {
        const res = await fetch(`${API}/messages`);
        const messages = await res.json();

        const box = document.getElementById("chat-messages");
        box.innerHTML = "";

        messages.forEach(m => {
            box.innerHTML += `
                <div class="msg">
                    <b>${m.name} ${m.surname || ""}</b>: ${m.message}
                    ${m.donate > 0 ? `<span class="donate">+${m.donate} ₽</span>` : ""}
                </div>
            `;
        });
    } catch (e) {
        console.log("Ошибка загрузки сообщений:", e);
    }
}

setInterval(loadMessages, 2000);

document.getElementById("chat-send").onclick = async () => {
    const name = document.getElementById("chat-name").value;
    const surname = document.getElementById("chat-surname").value;
    const message = document.getElementById("chat-msg").value;
    const donate = window.lastDonateSum || 0;

    if (!name || !message) return;

    await fetch(`${API}/send-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, surname, message, donate })
    });

    document.getElementById("chat-msg").value = "";
    loadMessages();
};
