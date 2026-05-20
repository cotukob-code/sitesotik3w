const CALENDAR_ID = '5f39f6939a8ea39cfa3ff7e0061a4418a5f4ab9edb4aedb0c6351372cee7ae4f@group.calendar.google.com';

/**
 * Принимает данные доната и создаёт событие в календаре
 */
function doPost(e) {
  try {
    let jsonData;

    // Пытаемся получить тело запроса
    if (e.postData && e.postData.contents) {
      jsonData = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      // Резерв: если данные пришли как параметры
      jsonData = e.parameter;
    } else {
      console.error('Нет данных в запросе', e);
      return errorResponse('Нет данных в запросе');
    }

    console.log('Получены данные:', jsonData);

    const name = jsonData.name || 'Аноним';
    const message = jsonData.message || '—';
    const amount = jsonData.amount || '0';

    const calendar = CalendarApp.getCalendarById(CALENDAR_ID);
    if (!calendar) {
      console.error('Календарь не найден:', CALENDAR_ID);
      return errorResponse('Календарь не найден. Проверьте ID: ' + CALENDAR_ID);
    }

    const eventName = `${amount} ₽ — ${name}`;
    const eventDesc = `Сообщение: ${message}`;

    console.log('Создаём событие:', eventName, 'в календаре:', calendar.getName());

    calendar.createEvent(eventName, new Date(), new Date(Date.now() + 3600000), {
      description: eventDesc
    });

    console.log('Событие успешно создано');
    return successResponse('Донат успешно добавлен');
  } catch (error) {
    console.error('Ошибка в doPost:', error);
    return errorResponse('Ошибка: ' + error.toString());
  }
}

/**
 * Возвращает список донатов из календаря
 */
function doGet(e) {
  try {
    const calendar = CalendarApp.getCalendarById(CALENDAR_ID);
    if (!calendar) {
      return errorResponse('Календарь не найден. Проверьте ID: ' + CALENDAR_ID);
    }

    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);

    const events = calendar.getEvents(thirtyDaysAgo, now);

    const donations = events.map(event => {
      const title = event.getTitle();
      const desc = event.getDescription() || '—';
      const match = title.match(/(\\d+) ₽ — (.+)/);
      
      return {
        name: match ? match[2] : title,
        amount: match ? match[1] : '0',
        message: desc.replace('Сообщение: ', ''),
        date: formatDate(event.getStartTime())
      };
    }).sort((a, b) => new Date(b.date) - new Date(a.date));

    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      message: 'Донаты загружены',
      donations: donations
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error('Ошибка в doGet:', error);
    return errorResponse('Ошибка загрузки: ' + error.toString());
  }
}

function successResponse(message) {
  return ContentService.createTextOutput(JSON.stringify({ result: 'success', message }))
    .setMimeType(ContentService.MimeType.JSON);
}

function errorResponse(message) {
  return ContentService.createTextOutput(JSON.stringify({ result: 'error', message }))
    .setMimeType(ContentService.MimeType.JSON);
}

function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}