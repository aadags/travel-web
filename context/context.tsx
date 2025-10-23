import Location from "@/models/location";
import { createContext, useState } from "react";

let c: any = {};
export const ContextData = createContext(c);

function Context({ children }:any) {
  const [rate, setRate] = useState(c);
  const [location, setLocation] = useState(c);
  const [tz, setTz] = useState('');

  return (
    <ContextData.Provider value={{ rate, setRate, location, setLocation, tz, setTz }}>
      {children}
    </ContextData.Provider>
  );
}

export default Context;