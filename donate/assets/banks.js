// Данные банков для донатов

const BANKS = {
  sber: {
    name: 'Сбербанк',
    phone: '+7 (926) 000-00-00',
    url: 'https://online.sberbank.ru/',
    qr: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://online.sberbank.ru/'
  },
  tbank: {
    name: 'Т-Банк',
    phone: '+7 (926) 000-00-00',
    url: 'https://www.tbank.ru/',
    qr: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://www.tbank.ru/'
  },
  vtb: {
    name: 'ВТБ',
    phone: '+7 (926) 000-00-00',
    url: 'https://online.vtb.ru/',
    qr: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://online.vtb.ru/'
  },
  yoomoney: {
    name: 'ЮMoney',
    phone: '+7 (926) 000-00-00',
    url: 'https://yoomoney.ru/transfer',
    qr: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://yoomoney.ru/transfer'
  }
};

// Экспорт для использования в модулях
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BANKS };
}

// Экспорт для браузера
if (typeof window !== 'undefined') {
  window.BANKS = BANKS;
}