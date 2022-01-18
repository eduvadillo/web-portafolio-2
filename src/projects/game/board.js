import { useState, useEffect, useRef } from "react";

function Board() {
  const canvasRef = useRef(null);

  const window_height = window.innerHeight;
  const window_width = window.innerWidth;

  useEffect(() => {
    const canvas = canvasRef.current;

    const context = canvas.getContext("2d");

    canvas.height = window_height;
    canvas.width = window_width;

    canvas.style.background = "#ff8";

    class Circle {
      constructor(xpos, ypos, radius, color, text) {
        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.color = color;
        this.text = text;
      }

      draw(context) {
        context.beginPath();

        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text, this.xpos, this.ypos);

        context.lineWidth = 5;
        context.arc(this.xpos, this.xpos, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
      }
    }

    let circle_counter = 1;
    let all_circles = [];

    let createCircle = function (circle) {
      circle.draw(context);
    };

    for (var numbers = 0; numbers < 10; numbers++) {
      let random_x = Math.random() * window_width;
      let random_y = Math.random() * window_width;
      let my_circle = new Circle(random_x, random_y, 50, "black", circle_counter);
      all_circles.push(my_circle);
      createCircle(all_circles[numbers]);
      circle_counter++;
    }

    console.log(all_circles);
  }, []);

  return <canvas id='canvas' ref={canvasRef} />;
}

export default Board;
