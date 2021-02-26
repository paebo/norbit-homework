import React, { useContext } from "react";
import { CoordinateContext } from "./CoordinateProvider";

function Coordinates() {
  const { response } = useContext(CoordinateContext);

  return (
    <>
      {response ? (
        <>
          <li>{response.lat}</li>
          <li>{response.lon}</li>
          <li>{response.heading}</li>
        </>
      ) : (
        <>No data stream</>
      )}
    </>
  );
}

export default Coordinates;
