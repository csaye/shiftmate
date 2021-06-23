import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import './Calendar.css';

function Calendar() {
  const [events, setEvents] = useState([]);

  // creates and appends new event
  function createEvent(start, end) {
    const newEvent = {
      id: Date.now().toString(),
      start: start.getTime(),
      end: end.getTime(),
      title: 'Event'
    };
    // append event
    setEvents(oldEvents => [...oldEvents, newEvent]);
  }

  return (
    <FullCalendar
      events={events}
      plugins={[timeGridPlugin, interactionPlugin]}
      allDaySlot={false}
      slotMinTime="06:00:00"
      slotMaxTime="22:00:00"
      nowIndicator={true}
      selectable={true}
      select={selectInfo => {
        createEvent(selectInfo.start, selectInfo.end);
      }}
      eventClick={eventInfo => {
        if (!window.confirm(`Delete ${eventInfo.event.title}?`)) return;
        const id = eventInfo.event.id;
        setEvents(oldEvents => oldEvents.filter(e => e.id !== id));
      }}
    />
  );
}

export default Calendar;
