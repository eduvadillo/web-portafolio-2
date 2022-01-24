import { useState, useEffect, useRef } from "react";

function Puntuacion({ puntuacion }) {
  return (
    <>
      <div className='puntuacion-div'>
        <h2> {puntuacion}</h2>
      </div>
    </>
  );
}

export default Puntuacion;
