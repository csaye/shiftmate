import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import Modal from 'react-modal';
import DeleteIcon from '@material-ui/icons/Delete';

import firebase from 'firebase/app';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import './Calendar.css';

function Calendar(props) {
  const [currEvent, setCurrEvent] = useState(null);
  const [currWorker, setCurrWorker] = useState('');
  const [title, setTitle] = useState('');
  const [worker, setWorker] = useState('');
  const [color, setColor] = useState('#3788d8');

  const uid = firebase.auth().currentUser.uid;

  // get events
  const eventsCol = firebase.firestore().collection('events');
  const [eventsData] = useCollectionData(eventsCol, { idField: 'id' });

  // get users
  const usersCol = firebase.firestore().collection('users');
  const [usersData] = useCollectionData(
    usersCol.orderBy('name'), { idField: 'id' }
  );

  // turns given selection into firebase event
  async function createEvent(selectInfo) {
    await eventsCol.add({
      start: selectInfo.start.getTime(),
      end: selectInfo.end.getTime(),
      title: 'New Event',
      backgroundColor: '#3788d8',
      extendedProps: {
        creator: uid,
        title: 'New Event',
        worker: ''
      }
    });
  }

  // deletes given event in firebase
  async function deleteEvent(eventInfo) {
    if (!window.confirm(`Delete ${eventInfo.event.title}?`)) return;
    setCurrEvent(null);
    await eventsCol.doc(eventInfo.event.id).delete();
  }

  // updates given event in firebase
  async function updateEvent(eventInfo) {
    setCurrEvent(null);
    await eventsCol.doc(eventInfo.event.id).update({
      title: worker ? `${getUserName(worker)} • ${title}` : title,
      backgroundColor: color,
      'extendedProps.title': title,
      'extendedProps.worker': worker
    });
  }

  // updates given event in firebase
  async function updateEventTime(eventInfo) {
    await eventsCol.doc(eventInfo.event.id).update({
      start: eventInfo.event.start.getTime(),
      end: eventInfo.event.end.getTime()
    });
  }

  // returns user name given user id
  function getUserName(uid) {
    const filtered = usersData.filter(user => user.id === uid);
    return filtered.length ? filtered[0].name : null;
  }

  if (!eventsData) {
    return <h1>Loading events...</h1>;
  }

  return (
    <div className="Calendar">
      <p>Viewing schedule for</p>
      <select
        value={currWorker}
        onChange={e => setCurrWorker(e.target.value)}
      >
        <option value="">All</option>
        {
          usersData.map(user =>
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          )
        }
      </select>
      <div className="fullcalendar">
        <FullCalendar
          height="auto"
          events={
            eventsData.filter(e =>
              !currWorker || e.extendedProps.worker === currWorker
            )
          }
          plugins={[timeGridPlugin, interactionPlugin]}
          allDaySlot={false}
          slotMinTime="06:00:00"
          slotMaxTime="22:00:00"
          nowIndicator={true}
          selectable={props.userData.admin}
          editable={props.userData.admin}
          eventResizableFromStart={props.userData.admin}
          select={createEvent}
          eventClick={setCurrEvent}
          eventDrop={updateEventTime}
          eventResize={updateEventTime}
        />
      </div>
      <Modal
        isOpen={currEvent ? true : false}
        onAfterOpen={() => {
          setTitle(currEvent.event.extendedProps.title);
          setWorker(currEvent.event.extendedProps.worker);
          setColor(currEvent.event.backgroundColor);
        }}
        onRequestClose={() => setCurrEvent(null)}
        ariaHideApp={false}
        style={{
          content: {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'fit-content',
            height: 'fit-content',
            textAlign: 'center'
          },
          overlay: {
            zIndex: '1'
          }
        }}
      >
        <h1>Editing {currEvent?.event.extendedProps.title}</h1>
        <form onSubmit={e => {
          e.preventDefault();
          updateEvent(currEvent);
        }}>
          <input
            placeholder="event title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <select
            value={worker}
            onChange={e => setWorker(e.target.value)}
          >
            <option value="">None</option>
            {
              usersData.map(user =>
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              )
            }
          </select>
          <input
            type="color"
            value={color}
            onChange={e => setColor(e.target.value)}
          />
          <div>
            <button
              type="button"
              onClick={() => setCurrEvent(null)}
            >
              Cancel
            </button>
            <button>Save</button>
          </div>
        </form>
        <button
          className="icon-button"
          onClick={() => deleteEvent(currEvent)}
        >
          <DeleteIcon />
        </button>
      </Modal>
    </div>
  );
}

export default Calendar;
