const items = document.querySelectorAll(".item");
let itemsQty = document.querySelectorAll(".item").length;
const boards = document.querySelectorAll(".board:not(:last-child)");
const create = document.getElementById("create");
const startBoard = document.getElementById("start");
const crosses = document.querySelectorAll("span");

create.addEventListener("click", () => {
  let text = prompt("Enter new task");

  if (text) {
    const newItem = document.createElement("p");
    newItem.className = "item";
    newItem.draggable = "true";
    newItem.innerText = text;
    const cross = document.createElement("span");
    cross.innerHTML = `&times`;
    newItem.append(cross);

    cross.addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });

    startBoard.append(newItem);

    newItem.addEventListener("dragstart", dragStart);
    newItem.addEventListener("dragend", dragEnd);
    itemsQty++;
  }
});

items.forEach((item) => {
  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dragend", dragEnd);
});

crosses.forEach((cross) => {
  cross.addEventListener("click", (e) => {
    e.target.parentElement.remove();
  });
});

boards.forEach((board) => {
  board.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = locationToDrag(board, e.clientY);
    const dragging = document.querySelector(".moving");

    if (afterElement == null) {
      board.appendChild(dragging);
    } else {
      board.insertBefore(dragging, afterElement);
    }
  });
});

function locationToDrag(board, y) {
  const draggableElements = [...board.querySelectorAll(".item:not(.moving)")];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

function dragStart(e) {
  e.target.className = "item";
  e.target.classList.add("moving");
}

function dragEnd(e) {
  e.target.classList.remove("moving");
  if (e.target.parentElement.id === "start") e.target.classList.add("start");
  else if (e.target.parentElement.id === "running")
    e.target.classList.add("running");
  else e.target.classList.add("finish");
}
