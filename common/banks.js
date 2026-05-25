// Данные банков и реквизитов

const BANKS = [
  {
    name: 'Сбербанк',
    phone: '+7 (926) 000-00-00',
    qrCode: 'https://example.com/qrcode/sber.png' // Заменить на реальный URL
  },
  {
    name: 'Тинькофф',
    phone: '+7 (926) 000-00-00',
    qrCode: 'https://example.com/qrcode/tinkoff.png' // Заменить на реальный URL
  },
  {
    name: 'Райффайзен',
    phone: '+7 (926) 000-00-00',
    qrCode: 'https://example.com/qrcode/raiffeisen.png' // Заменить на реальный URL
  }
];

// Экспорт для использования в модулях
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BANKS };
}

// Экспорт для браузера
if (typeof window !== 'undefined') {
  window.BANKS = BANKS;
}