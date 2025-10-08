 LCM Puzzle – Interactive Learning Game
 
Author: Manonmani .M

Topic: Least Common Multiple (LCM)

Target Students: Grades 4–7

Overview

This is an interactive puzzle game designed to teach students the concept of LCM (Least Common Multiple) in a fun, engaging, and visual way.

Students can:
- Enter their own numbers or click Random Example.
- See multiples of each number visually on Rod 1 and Rod 2.
- Drag the correct multiples into Rod 3 to complete the LCM puzzle.
- Receive hints, sound effects, and confetti animation for correct answers.
  
Features
- Drag-and-drop interactive puzzle
- Hints sidebar for guidance
- Visual feedback for correct/incorrect blocks
- Confetti & sound effects for correct answers
- Continue/Quit options after completing a puzzle
- Responsive design for desktops and tablets
  
Instructions
1. Open index.html in a modern browser (Chrome, Edge, Firefox).
2. Enter two numbers or click Random Example.
3. Drag the correct multiples from Rod 1 and Rod 2 into Rod 3.
4. Complete all blocks to solve the LCM puzzle.
5. After completing the puzzle, choose Continue or Quit.

Hints:
- Rod 1: multiples of the first number
- Rod 2: multiples of the second number
- Rod 3: common multiples → drag only the correct blocks
  
File Structure
LCM_Puzzle_Assignment/
│

├── index.html      → Main HTML file

├── style.css       → Styling for rods, buttons, hints, etc.

├── script.js       → Drag-drop functionality, hints, 

└── README.docx     → This file

Example Code Snippets

Dragging a correct block into Rod 3:
if (selectedBlockValue === correctLCM) {

    rod3.appendChild(selectedBlock);
    
    celebrate(); // Confetti & sound
    
} else {

    alert('❌ Not correct, try again!');
    
}

Random Example button:

function randomExample() {

    let a = Math.floor(Math.random() * 8) + 2;
    
    let b = Math.floor(Math.random() * 8) + 2;
    
    document.getElementById('num1').value = a;
    
    document.getElementById('num2').value = b;
    
    buildRods();
}

## 🎥 Interactive Demo
Click the link below to watch a demo of the game in action:  

[Watch the LCM Puzzle Video](lcm puzzle.mp4)  

How to Use
- Make sure index.html, style.css, and script.js are in the same folder.
- Open index.html → start learning LCM interactively!
- Enjoy hints, animations, and confetti feedback! 🎉
  
Made with 💜 to make math fun and engaging for students.
