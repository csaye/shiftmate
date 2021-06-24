import FullCalendar from '@fullcalendar/react';

import firebase from 'firebase/app';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import './Calendar.css';

function Calendar() {
  const uid = firebase.auth().currentUser.uid;
  const eventsCol = firebase.firestore().collection('events');
  const [eventsData] = useCollectionData(eventsCol, { idField: 'id' });

  // turns given selection into firebase event
  async function createEvent(selectInfo) {
    await eventsCol.add({
      start: selectInfo.start.getTime(),
      end: selectInfo.end.getTime(),
      title: 'Event',
      creator: uid
    });
  }

  // deletes given event in firebase
  async function deleteEvent(eventInfo) {
    if (!window.confirm(`Delete ${eventInfo.event.title}?`)) return;
    await eventsCol.doc(eventInfo.event.id).delete();
  }

  // updates given event in firebase
  async function updateEvent(eventInfo) {
    await eventsCol.doc(eventInfo.event.id).update({
      start: eventInfo.event.start.getTime(),
      end: eventInfo.event.end.getTime()
    });
  }

  if (!eventsData) {
    return <h1>Loading events...</h1>;
  }

  return (
    <FullCalendar
      events={eventsData}
      plugins={[timeGridPlugin, interactionPlugin]}
      allDaySlot={false}
      slotMinTime="06:00:00"
      slotMaxTime="22:00:00"
      nowIndicator={true}
      selectable={true}
      editable={true}
      eventResizableFromStart={true}
      select={createEvent}
      eventClick={deleteEvent}
      eventDrop={updateEvent}
      eventResize={updateEvent}
    />
  );
}

export default Calendar;
