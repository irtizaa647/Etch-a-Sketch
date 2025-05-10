// script.js

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const resetBtn = document.getElementById('resetBtn');
    const eraserBtn = document.getElementById('eraserBtn');
    const undoBtn = document.getElementById('undoBtn');
    let isEraserActive = false;   //Flag to track eraser mode
    let undoStack = [];   //Stack to store the grid states for undo
  
    //Function to create the grid
    function createGrid(size) {
      container.innerHTML = '';      //Clear previous grid
      const squareSize = 960 / size;
  
      // Store initial grid state for undo purposes
      const gridState = [];
  
      for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        square.dataset.opacity = 0;
  
        // Change square color on hover
        square.addEventListener('mouseover', () => {
          if (isEraserActive) {
            // Erase the square (reset to transparent)
            storeState();
            square.style.backgroundColor = 'rgba(0, 0, 0, 0)';
          } else {
            // Random RGB color with opacity
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
  
            let opacity = parseFloat(square.dataset.opacity);
            opacity = Math.min(opacity + 0.1, 1);
            square.dataset.opacity = opacity;
  
            storeState();
            square.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          }
        });
  
        gridState.push({ element: square, backgroundColor: square.style.backgroundColor });
        container.appendChild(square);
      }
  
      // Function to store the grid's state
      function storeState() {
        const currentState = Array.from(container.children).map(square => ({
          element: square,
          backgroundColor: square.style.backgroundColor
        }));
        undoStack.push(currentState);
      }
  
      return gridState;
    }
  
    // Reset button click handler
    resetBtn.addEventListener('click', () => {
      let size = parseInt(prompt("Enter grid size (max 100):"), 10);
      if (isNaN(size) || size < 1 || size > 100) {
        alert("Please enter a number between 1 and 100.");
        return;
      }
      createGrid(size);
    });
  
    // Toggle eraser mode when the eraser button is clicked
    eraserBtn.addEventListener('click', () => {
      isEraserActive = !isEraserActive;
      if (isEraserActive) {
        eraserBtn.style.backgroundColor = '#f44336';  // Change button color to indicate eraser is active
        eraserBtn.innerText = 'Drawing';  // Change button text to 'Drawing'
      } else {
        eraserBtn.style.backgroundColor = '#4CAF50';  // Change back to original color when drawing mode is active
        eraserBtn.innerText = 'Eraser';  // Change button text to 'Eraser'
      }
    });
  
    // Undo button click handler
    undoBtn.addEventListener('click', () => {
      if (undoStack.length > 0) {
        const lastState = undoStack.pop();
        lastState.forEach((state) => {
          state.element.style.backgroundColor = state.backgroundColor;
        });
      }
    });
  
    // Create a default 16x16 grid on page load
    createGrid(1);
  });
  
