const container = document.querySelector(".items");
const items = document.querySelectorAll(".item");

let activeItem = null;
let offsetX = 0;
let offsetY = 0;

items.forEach(item => {
  item.addEventListener("mousedown", startDrag);
});

function startDrag(e) {
  activeItem = e.target;

  const containerRect = container.getBoundingClientRect();
  const itemRect = activeItem.getBoundingClientRect();

  // Convert to absolute only when dragging starts
  if (activeItem.style.position !== "absolute") {
    activeItem.style.position = "absolute";
    activeItem.style.left = (itemRect.left - containerRect.left) + "px";
    activeItem.style.top = (itemRect.top - containerRect.top) + "px";
  }

  offsetX = e.clientX - activeItem.offsetLeft;
  offsetY = e.clientY - activeItem.offsetTop;

  activeItem.classList.add("dragging");

  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDrag);
}

function drag(e) {
  if (!activeItem) return;

  let x = e.clientX - container.getBoundingClientRect().left - offsetX;
  let y = e.clientY - container.getBoundingClientRect().top - offsetY;

  x = Math.max(0, Math.min(x, container.clientWidth - activeItem.offsetWidth));
  y = Math.max(0, Math.min(y, container.clientHeight - activeItem.offsetHeight));

  activeItem.style.left = x + "px";
  activeItem.style.top = y + "px";
}

function stopDrag() {
  if (!activeItem) return;

  activeItem.classList.remove("dragging");

  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", stopDrag);

  activeItem = null;
}