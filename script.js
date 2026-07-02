const container = document.querySelector(".items");
const cubes = document.querySelectorAll(".item");

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

function setupCubes() {
  const containerRect = container.getBoundingClientRect();

  const positions = Array.from(cubes).map((cube) => {
    const rect = cube.getBoundingClientRect();

    return {
      cube: cube,
      left: rect.left - containerRect.left,
      top: rect.top - containerRect.top
    };
  });

  positions.forEach((position) => {
    position.cube.style.position = "absolute";
    position.cube.style.left = `${position.left}px`;
    position.cube.style.top = `${position.top}px`;

    position.cube.addEventListener("mousedown", startDrag);
  });
}

function startDrag(event) {
  event.preventDefault();

  activeCube = event.currentTarget;

  const cubeRect = activeCube.getBoundingClientRect();

  offsetX = event.clientX - cubeRect.left;
  offsetY = event.clientY - cubeRect.top;

  activeCube.classList.add("dragging");
  activeCube.style.zIndex = "1000";

  document.addEventListener("mousemove", dragCube);
  document.addEventListener("mouseup", stopDrag);
}

function dragCube(event) {
  if (!activeCube) return;

  const containerRect = container.getBoundingClientRect();

  let newLeft = event.clientX - containerRect.left - offsetX;
  let newTop = event.clientY - containerRect.top - offsetY;

  const maxLeft = container.clientWidth - activeCube.offsetWidth;
  const maxTop = container.clientHeight - activeCube.offsetHeight;

  newLeft = Math.max(0, Math.min(newLeft, maxLeft));
  newTop = Math.max(0, Math.min(newTop, maxTop));

  activeCube.style.left = `${newLeft}px`;
  activeCube.style.top = `${newTop}px`;
}

function stopDrag() {
  if (!activeCube) return;

  activeCube.classList.remove("dragging");
  activeCube.style.zIndex = "";

  activeCube = null;

  document.removeEventListener("mousemove", dragCube);
  document.removeEventListener("mouseup", stopDrag);
}

window.addEventListener("DOMContentLoaded", setupCubes);