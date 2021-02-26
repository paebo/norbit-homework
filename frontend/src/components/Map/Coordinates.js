import React, { useContext } from "react";
import { CoordinateContext } from "./CoordinateProvider";

function Coordinates() {
  const { response } = useContext(CoordinateContext);

  return (
    <>
      {response ? (
        <>
          <li>Lat: {response.lat}</li>
          <li>Lon: {response.lon}</li>
          <li>Heading: {response.heading}</li>
        </>
      ) : (
        <>No data stream</>
      )}
    </>
  );
}

export default Coordinates;
