import React, { useContext } from "react";
import { CoordinateContext } from "./CoordinateProvider";

function Coordinates() {
  const { records } = useContext(CoordinateContext);

  return (
    <>
      {records ? (
        <>
          <li>Lat: {records.lat}</li>
          <li>Lon: {records.lon}</li>
          <li>Heading: {records.heading}</li>
        </>
      ) : (
        <>No data stream</>
      )}
    </>
  );
}

export default Coordinates;
