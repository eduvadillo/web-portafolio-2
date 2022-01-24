import { useState, useEffect, useRef } from "react";

function FormGame({ puntuacion }) {
  return (
    <>
      <div className='puntuacion-div'>
        <h2> {puntuacion}</h2>
      </div>
    </>
  );
}

export default FormGame;
