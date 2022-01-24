import { useState, useEffect, useRef } from "react";
import Puntuacion from "./puntuacion";
import FormGame from "./formGame";

function Board() {
  const canvasRef = useRef(null);
  const [puntuacion, setPuntuacion] = useState(0);
  const [counter, setCounter] = useState(30);
  const [game, setGame] = useState(true);

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    }

    if (counter === 0) {
      setGame(false);
    }
  }, [counter]);

  useEffect(() => {
    const canvas = canvasRef.current;

    const context = canvas.getContext("2d");

    canvas.style.background = "#ff8";

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    let circle_counter = 0;

    class Circle {
      constructor(xpos, ypos, radius, color, text, speed) {
        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.speed = speed;

        /* this.dy = 1 * this.speed; */
        this.dx = this.speed;
        this.dy = this.speed;
      }

      draw(context) {
        context.beginPath();

        context.lineWidth = 5;
        context.fillStyle = "blue";
        context.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false);
        context.stroke();

        context.strokeStyle = this.color;
        /*
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text, this.xpos, this.ypos);
 */
        context.closePath();
      }

      changeSpeed(newSpeed) {
        /*      this.radius = this.radius - newSize; */

        this.speed = this.speed + newSpeed;
        this.text = this.text + 0.5;
        setPuntuacion(this.text);
        console.log(circle_counter, `circle`);
        this.dx = this.speed;
        this.dy = this.speed;
      }

      /*   changeSize2(newSize) {
        this.radius = this.radius + newSize;
      } */

      clickCircle(xmouse, ymouse) {
        const distance = Math.sqrt(
          (xmouse - this.xpos) * (xmouse - this.xpos) + (ymouse - this.ypos) * (ymouse - this.ypos)
        );

        /*  console.log(`la distancia es`, distance, `el radio es`, this.radius); */
        if (distance - 10 < this.radius) {
          this.changeSpeed(0.95);
          console.log(this.dx, this.dy, `speed es:`, this.speed);
          return true;
        } else {
          /*  this.changeSize2(1.2);
          console.log(this.dx, this.dy); */
          return false;
        }
      }

      update() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.draw(context);

        if (this.xpos + this.radius > canvas.width) {
          this.dx = -this.dx;
        }

        if (this.xpos - this.radius < 0) {
          this.dx = -this.dx;
        }

        if (this.ypos - this.radius < 0) {
          this.dy = -this.dy;
        }

        if (this.ypos + this.radius > canvas.height) {
          this.dy = -this.dy;
        }

        this.ypos += this.dy;
        this.xpos += this.dx;
      }
    }

    let my_circle = new Circle(100, 200, 80, "blue", circle_counter, 5);

    my_circle.draw(context);

    let updateCircle = function () {
      requestAnimationFrame(updateCircle);
      my_circle.update();
    };

    updateCircle();

    canvas.addEventListener("click", (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      my_circle.clickCircle(x, y);
      console.log(my_circle.clickCircle(x, y));
    });

    /*     console.log(`la x`, random_x, `la y`, random_y); */

    /*  console.log(`medidas canvas`, canvas.height, canvas.width); */
    /*     console.log(`windows heigt`, window_height, `windows witfh`, window_width); */

    /*     for (var numbers = 0; numbers < 1; numbers++) {
      let random_x = Math.random() * window_width;
      let random_y = Math.random() * window_width;
      let my_circle = new Circle(random_x, random_y, 50, "black", circle_counter, 1);
      all_circles.push(my_circle);
      createCircle(all_circles[numbers]);
      circle_counter++;
    } */
  }, []);

  if (game === true) {
    return (
      <>
        <canvas id='canvas' ref={canvasRef} />
        <div>
          <Puntuacion puntuacion={puntuacion} />
        </div>
        <div className='divCounter'>
          <h1>{counter}</h1>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <Puntuacion puntuacion={puntuacion} />
        </div>
        <div>
          <FormGame puntuacion={puntuacion} />
        </div>
      </>
    );
  }
}

export default Board;
