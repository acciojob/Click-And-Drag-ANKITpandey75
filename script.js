const container = document.querySelector(".items");
const cubes = document.querySelectorAll(".item");

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

function setupCubes() {
  const containerRect = container.getBoundingClientRect();

  cubes.forEach((cube) => {
    const rect = cube.getBoundingClientRect();

    cube.style.left = `${rect.left - containerRect.left}px`;
    cube.style.top = `${rect.top - containerRect.top}px`;
    cube.style.position = "absolute";

    cube.addEventListener("mousedown", startDrag);
  });
}

function startDrag(event) {
  activeCube = event.target;

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

  let x = event.clientX - containerRect.left - offsetX;
  let y = event.clientY - containerRect.top - offsetY;

  const maxX = container.clientWidth - activeCube.offsetWidth;
  const maxY = container.clientHeight - activeCube.offsetHeight;

  x = Math.max(0, Math.min(x, maxX));
  y = Math.max(0, Math.min(y, maxY));

  activeCube.style.left = `${x}px`;
  activeCube.style.top = `${y}px`;
}

function stopDrag() {
  if (!activeCube) return;

  activeCube.classList.remove("dragging");
  activeCube.style.zIndex = "";

  activeCube = null;

  document.removeEventListener("mousemove", dragCube);
  document.removeEventListener("mouseup", stopDrag);
}

window.addEventListener("load", setupCubes);