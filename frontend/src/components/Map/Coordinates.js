import React, { useContext } from "react";
import { CoordinateContext } from "./CoordinateProvider";

function Coordinates() {
  const { response } = useContext(CoordinateContext);

  return (
    <>
      {response ? (
        <>
          <li>{response[0]}</li>
          <li>{response[1]}</li>
          <li>{response[2]}</li>
        </>
      ) : (
        <>No data stream</>
      )}
    </>
  );
}

export default Coordinates;
