(function() {
  var root = document.getElementById('chat-root');
  if (!root) return;
  root.innerHTML = 
    <div class="chat-mini-title">Общий чат + донаты Сотика</div>
    <div class="chat-mini-sub">Полноэкранный режим, банки, QR, сервисы донатов — в отдельном хабе.</div>
    <div class="chat-mini-actions">
      <a class="chat-mini-link" href="/sitesotik/donate/chatv3.html" target="_blank">
        Открыть чат + донаты v3
      </a>
      <a class="chat-mini-link" href="/sitesotik/donate/chatv2.html" target="_blank">
        Резервный чат v2
      </a>
      <a class="chat-mini-link" href="/sitesotik/donate/chatv1.html" target="_blank">
        Лёгкая версия v1
      </a>
    </div>
  ;
})();
