'use client';
import { myStore } from '@/app/event-context';
import { Field, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { useEffect, useState } from 'react'

const events = [
  { id: 1, name: 'Gainesville' },
  { id: 2, name: 'Dalton' },
  { id: 3, name: 'Gwinnett' },
  { id: 4, name: 'Statesboro' },
  { id: 5, name: 'Albany' },
  { id: 6, name: 'Macon' },
];

export default function EventDropdown() {
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const { eventID, setEvent } = myStore();

  useEffect(() => {
    setEvent(selectedEvent.id);
  }, [selectedEvent]);

  useEffect(() => {
    setEvent(selectedEvent.id);
  }, [selectedEvent.id])

  return (<>
    <div className="bg-white rounded-md flex align-middle border-white justify-center text-2xl">
    <Field>      
      <Listbox value={selectedEvent} onChange={setSelectedEvent}>
        <ListboxButton className="flex bg-white text-sidenav-color border-white rounded-md">{selectedEvent.name}</ListboxButton>
        <ListboxOptions anchor="bottom">
          {events.map((event) => (
            <ListboxOption key={event.id} value={event} className="data-[focus]:bg-blue-100 bg-sidenav-color text-white">
              {event.name}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </Field>
    </div>
    <div><p><br></br></p></div>
    </>)
}