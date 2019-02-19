"use strict";

const puzzleBtn = document.querySelector("#puzzleBtn");
const puzzleImage = document.querySelector("img");
const container = document.querySelector("#container");
const looseDiv = document.querySelector("#looseDiv");

document.addEventListener("DOMContentLoaded", startTheScript);

//load image when button is clicked
function startTheScript() {
  puzzleBtn.addEventListener("click", loadTheImage);
}

function loadTheImage() {
  puzzleImage.src = document.querySelector("#imageurl").value;
  puzzleImage.onload = theImageHasLoaded;
}

function theImageHasLoaded() {
  //   alert("THE IMAGE HAS LOADED");
  createGrid();
}

//display puzzle grid

let pieceCounter = 0;

function createGrid() {
  // user input x and y number of pieces
  const numOfXPieces = document.querySelector("#xPieces").value;
  const numOfYPieces = document.querySelector("#yPieces").value;

  // grid container size adjusts to image
  const container_width = puzzleImage.clientWidth;
  const container_height = puzzleImage.clientHeight;

  //create grid template
  container.style.gridTemplateColumns = `repeat(${numOfXPieces}, 1fr)`;
  container.style.width = `${container_width}px`;

  looseDiv.style.gridTemplateColumns = `repeat(${numOfXPieces}, 1fr)`;
  looseDiv.style.width = `${container_width}px`;

  //create div for each x/y input number
  for (let y = 0; y < numOfYPieces; y++) {
    for (let x = 0; x < numOfXPieces; x++) {
      //create grid - dropzone
      let gridPiece = document.createElement("div");

      gridPiece.style.height = container_height / numOfYPieces + "px";
      gridPiece.dataset.id = `${x}${y}`;

      gridPiece.classList.add("dropzone");
      container.appendChild(gridPiece);
      pieceCounter++;
    }
  }

  //for each gridPiece that is created - create a puzzle Piece of same size
  for (let y = 0; y < numOfYPieces; y++) {
    for (let x = 0; x < numOfXPieces; x++) {
      //create loose puzzle pieces
      let puzzlePiece = document.createElement("div");

      let pieceHeight = container_height / numOfYPieces + "px";
      let pieceWidth = container_width / numOfXPieces + "px";

      puzzlePiece.style.height = pieceHeight;
      puzzlePiece.style.width = pieceWidth;
      puzzlePiece.dataset.id = `${x}${y}`;
      puzzlePiece.classList.add("draggable");
      puzzlePiece.draggable = "true";

      let imageURL = document.querySelector("#imageurl").value;
      puzzlePiece.style.backgroundImage = `url("${imageURL}")`;
      puzzlePiece.style.backgroundSize = `${container_width}px ${container_height}px`;
      puzzlePiece.style.backgroundRepeat = "no-repeat";
      puzzlePiece.style.backgroundPositionX = `calc(-${pieceWidth}*${x})`;
      puzzlePiece.style.backgroundPositionY = `calc(-${pieceHeight}*${y})`;
      puzzlePiece.style.top = `calc(${Math.random() * 500}px + 15vh)`;
      puzzlePiece.style.left = `calc(${Math.random() * 400}px + 45vw)`;

      looseDiv.appendChild(puzzlePiece);
    }
  }
}

//drag & drop puzzle pieces

let dragged;

/* events fired on the draggable target */
document.addEventListener("drag", function(event) {});

document.addEventListener("dragstart", function(event) {
  // store a ref. on the dragged elem
  dragged = event.target;
  // make it half transparent
  dragged.style.opacity = 0.5;
});

document.addEventListener("dragend", function(event) {
  // reset the transparency
  event.target.style.opacity = "";
});

/* events fired on the drop targets */
document.addEventListener("dragover", function(event) {
  // prevent default to allow drop
  event.preventDefault();
});

document.addEventListener("dragenter", function(event) {
  // highlight potential drop target when the draggable element enters it
  if (event.target.className == "dropzone") {
    event.target.style.background = "purple";
  }
});
document.addEventListener("dragleave", function(event) {
  // reset background of potential drop target when the draggable element leaves it
  if (event.target.className == "dropzone") {
    event.target.style.background = "";
  }
});

let counter = 0;

document.addEventListener("drop", function(event) {
  // prevent default action (open as link for some elements)
  event.preventDefault();
  console.log("DROP", event.target.className);
  // move dragged elem to the selected drop target
  if (event.target.className == "dropzone") {
    event.target.style.background = "";

    dragged.parentNode.removeChild(dragged);
    event.target.appendChild(dragged);

    dragged.style.left = event.target.style.left;
    dragged.style.top = event.target.style.top;

    if (event.target.dataset.id == dragged.dataset.id) {
      // alert("Good one!");
      counter++;
    }

    setTimeout(function() {
      if (counter == pieceCounter) {
        alert("WOW YOU'RE A GENIUS'! Amazing job :D");
      }
    }, 200);
  } else if (event.target.className == "theBody") {
    // park the dragged elem somewhere on the body
    dragged.style.left = event.pageX + "px";
    dragged.style.top = event.pageY + "px";
  }
});
