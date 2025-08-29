import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface compilerSliceStateType {
  fullCode: {
    html: string;
    css: string;
    javascript: string;
  };
  currentLang: "html" | "css" | "javascript";
}

const initialState: compilerSliceStateType = {
  fullCode: {
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Crazy Bouncing Ball</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Welcome to CodePaint</h1>
  <div id="box">
    <div id="ball"></div>
    <div class="impact top"></div>
    <div class="impact bottom"></div>
    <div class="impact left"></div>
    <div class="impact right"></div>
  </div>
  
  <!-- Subtitle -->
  <p id="subtitle">Your virtual front-end playground.</p>

  <script src="script.js"></script>
</body>
</html>

    `,
    css: `
body {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  background-color: #1e1e1e; /* dark theme background */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  margin: 30px 0;
  font-size: 3rem;
  color: #f5f5f5; /* light color for contrast */
  letter-spacing: 2px;
}

#box {
  width: 600px;
  height: 450px;
  border: 3px solid #4a90e2;
  border-radius: 12px;
  background-color: #2c2c2c; /* dark box */
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0,0,0,0.7);
  margin-bottom: 20px; /* space for subtitle */
}

/* Ball styling */
#ball {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #50e3c2, #4a90e2);
  border: 2px solid #ffffff;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0 4px 15px rgba(0,255,255,0.5);
}

/* Wall impact effects */
.impact {
  position: absolute;
  background: rgba(255, 255, 0, 0.5); /* neon yellow flash */
  pointer-events: none;
  opacity: 0;
}

.impact.top, .impact.bottom {
  height: 10px;
  width: 100%;
  left: 0;
}

.impact.left, .impact.right {
  width: 10px;
  height: 100%;
  top: 0;
}

/* initial positions */
.impact.top { top: 0; }
.impact.bottom { bottom: 0; }
.impact.left { left: 0; }
.impact.right { right: 0; }

/* Impact animation */
@keyframes flash {
  0% { opacity: 1; }
  100% { opacity: 0; }
}

.impact.active {
  animation: flash 0.2s ease-out;
}

/* Subtitle styling */
#subtitle {
  color: #cfcfcf; /* subtle light gray */
  font-size: 1.2rem; /* medium-small font */
  text-align: center;
  margin-top: 10px;
}

    `,
    javascript: `
const ball = document.getElementById('ball');
const box = document.getElementById('box');

// impact divs
const impactTop = document.querySelector('.impact.top');
const impactBottom = document.querySelector('.impact.bottom');
const impactLeft = document.querySelector('.impact.left');
const impactRight = document.querySelector('.impact.right');

let posX = 0;
let posY = 0;
let speedX = Math.random() * 6 + 3; 
let speedY = Math.random() * 6 + 3;

function triggerImpact(impact) {
  impact.classList.add('active');
  setTimeout(() => impact.classList.remove('active'), 200);
}

function animate() {
  const boxWidth = box.clientWidth - ball.offsetWidth;
  const boxHeight = box.clientHeight - ball.offsetHeight;

  posX += speedX;
  posY += speedY;

  // Bounce off left/right walls
  if (posX <= 0 || posX >= boxWidth) {
    speedX = -speedX;
    speedX += (Math.random() - 0.5) * 2; 
    posX = posX <= 0 ? 0 : boxWidth;
    triggerImpact(posX === 0 ? impactLeft : impactRight);
  }

  // Bounce off top/bottom walls
  if (posY <= 0 || posY >= boxHeight) {
    speedY = -speedY;
    speedY += (Math.random() - 0.5) * 2;
    posY = posY <= 0 ? 0 : boxHeight;
    triggerImpact(posY === 0 ? impactTop : impactBottom);
  }

  ball.style.left = posX + 'px';
  ball.style.top = posY + 'px';

  requestAnimationFrame(animate);
}

animate();

    `,
  },
  currentLang: "html",
};

const compilerSlice = createSlice({
  name: "compilerSlice",
  initialState,
  reducers: {
    updateCurrentLang: (
      state,
      action: PayloadAction<compilerSliceStateType["currentLang"]>
    ) => {
      state.currentLang = action.payload;
    },
    updateCodeValue: (state, action: PayloadAction<string>) => {
      state.fullCode[state.currentLang] = action.payload;
    },
    updateFullCode: (
      state,
      action: PayloadAction<compilerSliceStateType["fullCode"]>
    ) => {
      // Replace completely with what's loaded from Firebase
      state.fullCode = {
        html: action.payload.html ?? "",
        css: action.payload.css ?? "",
        javascript: action.payload.javascript ?? "",
      };
    },

  },
});

export default compilerSlice.reducer;
export const { updateCurrentLang, updateCodeValue, updateFullCode } =
  compilerSlice.actions;
