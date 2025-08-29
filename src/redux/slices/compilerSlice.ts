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
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to CodePaint</title>
</head>
<body>
  <div class="welcome-container">
    <div class="welcome-text">
      <h1>Welcome to CodePaint</h1>
      <p>The best place to build, test, and discover front-end code.</p>
    </div>
    <div class="moving-elements">
      <div class="circle"></div>
      <div class="triangle"></div>
      <div class="square"></div>
    </div>
  </div>
</body>
</html>
    `,
    css: `
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  background-color: #111;
  color: #fff;
  overflow: hidden;
}

.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

.welcome-text h1 {
  font-size: 3em;
  margin-bottom: 20px;
}

.welcome-text p {
  font-size: 1.5em;
  margin-bottom: 40px;
}

.welcome-text button {
  padding: 10px 20px;
  font-size: 1.2em;
  color: #fff;
  background-color: #f9a825;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.welcome-text button:hover {
  background-color: #c79100;
}

.moving-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}

.moving-elements div {
  position: absolute;
  opacity: 0.7;
}

.circle {
  width: 50px;
  height: 50px;
  background-color: #f9a825;
  border-radius: 50%;
  animation: moveCircle 15s linear infinite;
}

.triangle {
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 60px solid #f9a825;
  animation: moveTriangle 10s linear infinite;
}

.square {
  width: 50px;
  height: 50px;
  background-color: #f9a825;
  animation: moveSquare 12s linear infinite;
}

@keyframes moveCircle {
  0% { top: 0; left: 0; }
  25% { top: 50%; left: 25%; }
  50% { top: 100%; left: 50%; }
  75% { top: 50%; left: 75%; }
  100% { top: 0; left: 100%; }
}

@keyframes moveTriangle {
  0% { top: 100%; left: 0; }
  25% { top: 50%; left: 25%; }
  50% { top: 0; left: 50%; }
  75% { top: 50%; left: 75%; }
  100% { top: 100%; left: 100%; }
}

@keyframes moveSquare {
  0% { top: 50%; left: 0; }
  25% { top: 75%; left: 25%; }
  50% { top: 50%; left: 50%; }
  75% { top: 25%; left: 75%; }
  100% { top: 50%; left: 100%; }
}
    `,
    javascript: `
document.addEventListener('DOMContentLoaded', function() {
  console.log('Welcome to CodePaint! Enjoy coding!');
});
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
