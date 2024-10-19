/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module.js */ \"./src/module.js\");\n\n\nfunction nameHandler(name, number) {\n  const h2 = document.getElementById(\"player-\" + number + \"-name\");\n  h2.textContent = name + \"'s Grid\";\n}\nconst form = document.querySelector(\"form\");\nconst input = document.querySelector(\"input\");\nform.addEventListener(\"submit\", (e) => {\n  e.preventDefault();\n  const start=document.createElement('button');\n  start.textContent=\"start\";\n  start.id=\"startButton\"\n  start.addEventListener('click',startGame);\n  const body=document.querySelector('body');\n  body.appendChild(start)\n  nameHandler(input.value, 1);\n});\nfunction dragHandler(coord, length, board, img) {\n  board.placeShip(coords, length, \"horizontal\");\n  boardUpdater(coord, \"place\", img);\n}\nfunction boardUpdater(div, action, img = null) {\n  //actions should be hit,miss,place or rotate (for now)\n  let a = document.createElement(\"p\");\n  a.textContent = \"X\";\n  switch (action) {\n    case \"miss\":\n      a.style.color = \"red\";\n      div.appendChild(a);\n      break;\n    case \"hit\":\n      a.style.color = \"green\";\n      div.appendChild(a);\n      break;\n    case \"place\":\n      div.appendChild(img);\n      break;\n    case \"rotate\":\n      img.style.transform = \"rotate(-90deg)\";\n      img.style.position = \"absolute\"; // Position it absolutely\n      // Update the position if needed based on rotation logic\n      img.style.top = \"-100%\"; // Adjust position to overflow upwards\n      img.style.left = \"0\";\n      break;\n  }\n}\nfunction rotateHandler(div, coord, length, img) {\n  //make sure that this doesnt work before game start(set variable gameStarted to true or false)\n  if ((0,_module_js__WEBPACK_IMPORTED_MODULE_0__.validPosition)(coord, length, \"vertical\")) {\n    board.placeShip(coord, length, \"vertical\");\n    boardUpdater(div, \"rotate\", img);\n  }\n}\nfunction clickHandler(div, board) {\n  //function that will handle clicking for misses or hits\n  let coord = JSON.parse(div.id);\n  let cell = board[coord.X][coord.Y];\n  board.receiveAttack(coord);\n  boardUpdater(div, cell.hitStatus);\n  if (board.allSunk) {\n    gameEnded = true;\n    loser = coord.player;\n  }\n}\nlet alreadyTargeted = [];\nfunction botPlay() {\n  //function that will make the bot play a turn\n  do {\n    let coordinates = {\n      X: Math.floor(Math.random() * 10),\n      Y: Math.floor(Math.random() * 10),\n    };\n    if (!alreadyTargeted.includes(coordinates)) {\n      humanBoard.receiveAttack(coordinates);\n      coordinates.player = 1;\n      const div = document.getElementById(JSON.stringify(coordinates));\n      boardUpdater(div, humanBoard[coordinates.X][coordinates.Y].hitStatus);\n      alreadyTargeted.push(coordinates);\n    }\n  } while (alreadyTargeted.includes(coordinates));\n  turn = \"human\";\n} //should add something to moderate turns\n\nfunction startGame() {\n  //when the form is submitted\n  // let player drag their pieces (add a reset pieces button?or allow moving them on the board)\n  turn = \"human\";\n  loser=null;\n  gameEnded=false;\n  const form = document.querySelector(\"form\");\n  const body = document.querySelector(\"body\");\n  form.remove();\n  const start=document.querySelector(\"#startButton\");\n  start.remove();\n  const button = document.createElement(\"button\");\n  button.textContent = \"Reset\";\n  button.addEventListener(\"click\", resetHandler);\n  body.appendChild(button);\n  while (!gameEnded) {\n    while (\n      botBoard.allSunk == false &&\n      humanBoard.allSunk == false &&\n      turn == \"bot\"\n    ) {\n      botPlay();\n    }\n  }\n  switch(loser){\n    case 1:\n      alert(\"The bot wins\");\n      break;\n    case 2:\n      alert('You win!');\n      break;\n  }\n}\nfunction resetHandler() {\n  turn = \"human\";\n  alreadyTargeted=[];\n  humanGameBoard = new _module_js__WEBPACK_IMPORTED_MODULE_0__.Gameboard();\n  humanBoard = humanGameBoard.board;\n  botGameBoard = new _module_js__WEBPACK_IMPORTED_MODULE_0__.Gameboard();\n  botBoard = botGameBoard.board;\n  const gridCells = document.querySelectorAll(\".grid-cell\");\n  gridCells.forEach((cell) => {\n    while (cell.firstChild) {\n      cell.removeChild(cell.firstChild);\n    }\n  });\n}\nlet turn;\nlet loser;\nlet gameEnded = false;\nlet humanGameBoard = new _module_js__WEBPACK_IMPORTED_MODULE_0__.Gameboard();\nlet humanBoard = humanGameBoard.board;\nlet botGameBoard = new _module_js__WEBPACK_IMPORTED_MODULE_0__.Gameboard();\nlet botBoard = botGameBoard.board;\n\nconst fleetImages = document.querySelectorAll(\"#fleet-1 img\");\n\n// Add dragstart event listener to each image in the fleet\nfleetImages.forEach((img) => {\n  img.addEventListener(\"dragstart\", (event) => {\n    // Store the ID of the dragged image\n    event.dataTransfer.setData(\"text/plain\", event.target.id);\n  });\n});\n\n// Add dragover event listener to each grid cell to allow dropping\nconst gridCells = document.querySelectorAll(\"#player1-grid .grid-cell\");\ngridCells.forEach((cell) => {\n  cell.addEventListener(\"dragover\", (event) => {\n    event.preventDefault(); // Prevent default behavior to allow drop\n  });\n\n  cell.addEventListener(\"drop\", (event) => {\n    event.preventDefault(); // Prevent default behavior\n    const imgId = event.dataTransfer.getData(\"text/plain\"); // Get the ID of the dragged image\n    const img = document.getElementById(imgId); // Get the image element using its ID\n\n    // Get the coordinates from the dropped cell\n    const coord = JSON.parse(event.target.id);\n    const length = img.width / 40; // Assuming each cell is 40px wide\n\n    // Call your existing dragHandler function\n    dragHandler(coord, length, humanBoard, img);\n\n    // Remove the image from the fleet after dropping\n    img.parentNode.removeChild(img);\n    img.addEventListener(\"dblclick\", () => {\n      rotateHandler(cell, coord, length, img);\n    });\n  });\n});\nconst player2GridCells = document.querySelectorAll(\"#player2-grid .grid-cell\");\n\n// Add click event listener to each cell in the player2 grid\nplayer2GridCells.forEach((cell) => {\n  cell.addEventListener(\"click\", () => {\n    if (turn == \"human\") {\n      clickHandler(cell, botBoard);\n      turn = \"bot\";\n    } // Call clickHandler with the clicked cell and botBoard\n  });\n});\n// IMPORTANT:moderate the turns!!\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/module.js":
/*!***********************!*\
  !*** ./src/module.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Gameboard: () => (/* binding */ Gameboard),\n/* harmony export */   Player: () => (/* binding */ Player),\n/* harmony export */   Ship: () => (/* binding */ Ship),\n/* harmony export */   validPosition: () => (/* binding */ validPosition)\n/* harmony export */ });\nclass Ship {\n  constructor(length) {\n    this.length = length;\n    this.hits = 0;\n    this.sunk = false;\n  }\n  hit() {\n    this.hits += 1;\n  }\n  isSunk() {\n    let state = this.hits >= this.length;\n    this.sunk = state;\n    return this.sunk;\n  }\n}\n\nclass Gameboard {\n  constructor() {\n    this.board = [...Array(10)].map(() =>\n      Array(10).map(() => ({ hitStatus: \"none\", ship: \"none\" }))\n    );\n    this.ships = [];\n    this.allSunk = false;\n  }\n  placeShip(coords, length, orientation) {\n    if (!validPosition(coords, length, orientation, this.board)) {\n      throw new Error(\"Invalid position!\"); // Invalid position, do not place the ship\n    }\n\n    const newShip = new Ship(length);\n\n    switch (orientation) {\n      case \"horizontal\":\n        for (let i = 0; i < length; i++) {\n          this.board[coords.X][coords.Y + i] = {\n            hitStatus: \"none\",\n            ship: newShip,\n          };\n        }\n        this.ships.push(newShip);\n        break;\n\n      case \"vertical\":\n        for (let i = 0; i < length; i++) {\n          this.board[coords.X + i][coords.Y] = {\n            hitStatus: \"none\",\n            ship: newShip,\n          };\n        }\n        this.ships.push(newShip);\n        break;\n    }\n  }\n  receiveAttack(coord) {\n    if (coord.X >= 10 || coord.X < 0 || coord.Y >= 10 || coord.Y < 0)\n      throw new Error(\"You can't attack this spot!\");\n    if (this.board[coord.X][coord.Y].ship == \"none\") {\n      this.board[coord.X][coord.Y].hitStatus = \"miss\";\n    } else {\n      this.board[coord.X][coord.Y].hitStatus = \"hit\";\n      this.board[coord.X][coord.Y].ship.hit();\n      if (this.board[coord.X][coord.Y].ship.isSunk()) {\n        this.allSunk = this.ships.every((ship) => ship.isSunk());\n      }\n    }\n  }\n}\n\nfunction validPosition(coords, length, orientation, arr) {\n  switch (orientation) {\n    case \"horizontal\":\n      if (coords.Y + length > arr.length) return false;\n      for (let i = 0; i < length; i++) {\n        if (arr[coords.X][coords.Y + i].ship != \"none\") return false;\n      }\n      return true;\n    case \"vertical\":\n      if (coords.X + length > arr.length) return false;\n      for (let i = 0; i < length; i++) {\n        if (arr[coords.X + i][coords.Y].ship != \"none\") return false;\n      }\n      return true;\n    default:\n      return false;\n  }\n}\n\nclass Player {\n  constructor(name, board) {\n    this.name = name;\n    this.board = board;\n  }\n}\n\n\n//# sourceURL=webpack:///./src/module.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;