import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import './Calendar.css';

function Calendar() {
  return (
    <FullCalendar
      plugins={[timeGridPlugin, interactionPlugin]}
      allDaySlot={false}
      slotMinTime="06:00:00"
      slotMaxTime="22:00:00"
      nowIndicator={true}
    />
  );
}

export default Calendar;
