import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import Modal from 'react-modal';

import firebase from 'firebase/app';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import './Calendar.css';

function Calendar() {
  const [editingEvent, setEditingEvent] = useState(null);
  const [title, setTitle] = useState('');

  const uid = firebase.auth().currentUser.uid;
  const eventsCol = firebase.firestore().collection('events');
  const [eventsData] = useCollectionData(eventsCol, { idField: 'id' });

  // turns given selection into firebase event
  async function createEvent(selectInfo) {
    await eventsCol.add({
      start: selectInfo.start.getTime(),
      end: selectInfo.end.getTime(),
      title: 'New Event',
      creator: uid
    });
  }

  // deletes given event in firebase
  async function deleteEvent(eventInfo) {
    if (!window.confirm(`Delete ${eventInfo.event.title}?`)) return;
    setEditingEvent(null);
    await eventsCol.doc(eventInfo.event.id).delete();
  }

  // updates given event in firebase
  async function updateEvent(eventInfo) {
    setEditingEvent(null);
    await eventsCol.doc(eventInfo.event.id).update({
      title: title
    });
  }

  // updates given event in firebase
  async function updateEventTime(eventInfo) {
    await eventsCol.doc(eventInfo.event.id).update({
      start: eventInfo.event.start.getTime(),
      end: eventInfo.event.end.getTime()
    });
  }

  if (!eventsData) {
    return <h1>Loading events...</h1>;
  }

  return (
    <div className="Calendar">
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
        eventClick={setEditingEvent}
        eventDrop={updateEventTime}
        eventResize={updateEventTime}
      />
      <Modal
        isOpen={editingEvent ? true : false}
        onAfterOpen={() => {
          setTitle(editingEvent?.event?.title);
        }}
        onRequestClose={() => setEditingEvent(null)}
        ariaHideApp={false}
        style={{
          content: {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px'
          },
          overlay: {
            zIndex: '1'
          }
        }}
      >
        <h1>Editing {editingEvent?.event?.title}</h1>
        <button onClick={() => deleteEvent(editingEvent)}>Delete</button>
        <form onSubmit={e => {
          e.preventDefault();
          updateEvent(editingEvent);
        }}>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setEditingEvent(null)}
          >
            Cancel
          </button>
          <button>Save</button>
        </form>
      </Modal>
    </div>
  );
}

export default Calendar;
