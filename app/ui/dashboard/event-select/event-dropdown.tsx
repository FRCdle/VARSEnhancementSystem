'use client';
import { myStore } from '@/app/event-context';
import { Field, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
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
    <div className= "rounded-md flex align-middle text-center border-white justify-center text-2xl">
    <Field>
      <Label className="text-gray-400 text-center text-md">Event Select:</Label>   
      <Listbox value={selectedEvent} onChange={setSelectedEvent} >
        <ListboxButton className="flex px-12 py-2 hover:bg-sidenav-color-hover bg-sidenav-color text-white border-white rounded-md">
          {selectedEvent.name}
        </ListboxButton>
        <ListboxOptions anchor="bottom" className="p-1 w-40 text-center bg-sidenav-color rounded-md shadow-xl border border-stroke">
          {events.map((event) => (
            <ListboxOption key={event.id} value={event} className="data-[focus]:bg-sidenav-color-hover bg-sidenav-color rounded-md text-white text-md my-1 mx-2 p-1 ">
              {event.name}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </Field>
    </div>
    </>)
}