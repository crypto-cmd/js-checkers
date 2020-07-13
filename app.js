"use strict";
//Current selected piece
/**
 * @type {HTMLDivElement} selectedPiece
 */
let selectedPiece;
//Create UI Board.
const boardDisplay = document.querySelector(".boardDisplay");

//Create gameboard.
const [ tiles, gameboard ] = createBoard();
tiles.forEach((arr) =>
	arr.forEach((tile) => {
        tile.addEventListener("click",()=>handleClick(tile));
		boardDisplay.appendChild(tile);
	})
);
updateDisplay();

