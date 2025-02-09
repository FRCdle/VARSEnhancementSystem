"use client"
import React, { useState } from 'react';

const useEventVariable = () => {
    const [event, setEvent] = useState("dalton");
  
    const handleEvent = (e : string) => {
      setEvent(e);
    };

    return { event, handleEvent };
  };
  
  export const useEvent = useEventVariable;
  