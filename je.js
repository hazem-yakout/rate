

let btn = document.getElementById("btn");
let inp = document.getElementById("inp");
let boxs = document.querySelectorAll(".box");
let drag = null;

btn.onclick = function () {
  if (inp.value != "") {
    boxs[0].innerHTML += `
        <p class='item' draggable='true'>${inp.value}</p>
        `;
    inp.value = "";
    dragitem(); // Call to initialize the newly added items
  }
};

function dragitem() {
  let items = document.querySelectorAll(".item");
  items.forEach((item) => {
    item.addEventListener("dragstart", function () {
      drag = item;
      item.style.opacity = "0.5";
    });

    item.addEventListener("dragend", function () {
      drag = null;
      item.style.opacity = "1";
    });

    // Touch events
    item.addEventListener("touchstart", function (e) {
      drag = item;
      item.style.opacity = "0.5";
    });

    item.addEventListener("touchend", function () {
      drag = null;
      item.style.opacity = "1";
    });

    item.addEventListener("touchmove", function (e) {
      e.preventDefault();
      let touch = e.touches[0];
      let elementUnderTouch = document.elementFromPoint(touch.clientX, touch.clientY);
      if (elementUnderTouch && elementUnderTouch.classList.contains('box')) {
        elementUnderTouch.style.background = "#090";
        elementUnderTouch.style.color = "#fff";
      }
    });
  });
}

// Add event listeners to boxes only once
boxs.forEach((box) => {
  box.addEventListener("dragover", function (e) {
    e.preventDefault();
    this.style.background = "#090";
    this.style.color = "#fff";
  });

  box.addEventListener("dragleave", function () {
    resetBoxStyle(this);
  });

  box.addEventListener("drop", function () {
    this.append(drag);
    resetBoxStyle(this);
  });

  // Touch events for boxes
  box.addEventListener("touchmove", function (e) {
    e.preventDefault();
    let touch = e.touches[0];
    let elementUnderTouch = document.elementFromPoint(touch.clientX, touch.clientY);
    if (elementUnderTouch && elementUnderTouch === box) {
      box.append(drag);
      resetBoxStyle(box);
    }
  });

  box.addEventListener("touchend", function () {
    resetBoxStyle(this);
  });
});

function resetBoxStyle(box) {
  box.style.background = "#fff";
  box.style.color = "#000";
}

// Initialize drag events for any pre-existing items
dragitem();
