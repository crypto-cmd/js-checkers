const pieces = {
	"1": "white pawn piece",
	"-1": "black pawn piece",
	"0": "empty",
	"2": "white king piece",
	"-2": "black king piece"
};
const MOVE = "move";

/**
 * @returns {[HTMLElement[][], Number[][]]}
 */
function createBoard() {
	const LIGHT = "light";
	const DARK = "dark";
	const getPiece = (i, colour) => {
		if (colour != DARK) {
			return 0;
		}
		if (i < 3) {
			return -1;
		} else if (i >= 5) {
			return 1;
		} else {
			return 0;
		}
	};
	let colour = LIGHT;
	const grid = new Array(8);
	const numBoard = new Array(8);
	for (let i = 0; i < 8; i++) {
		grid[i] = new Array(8);
		numBoard[i] = new Array(8);
		for (let j = 0; j < 8; j++) {
			const square = document.createElement("div");
			square.classList.add("tile", `${colour}`);
			square.appendChild(document.createElement("div"));
			if (getPiece != 0) {
				const crown = document.createElement("span");
				crown.classList.add("crown");
				square.children[0].appendChild(crown);
			}
			square.location = [ i, j ];
			grid[i][j] = square;
			numBoard[i][j] = getPiece(i, colour);
			colour = colour == LIGHT ? DARK : LIGHT;
		}
		colour = colour == LIGHT ? DARK : LIGHT;
	}
	return [ grid, numBoard ];
}
function updateDisplay() {
	for (let i = 0; i < gameboard.length; i++) {
		for (let j = 0; j < gameboard[i].length; j++) {
			if (i == 0) {
				if (gameboard[i][j] == 1) {
					gameboard[i][j] = 2;
				}
			}
			if (i == 7) {
				if (gameboard[i][j] == -1) {
					gameboard[i][j] = -2;
				}
			}
			const index = i * 8 + j;
			const piece = pieces[gameboard[i][j]];
			const tile = boardDisplay.children[index];
			tile.children[0].classList = `${piece}`;
		}
	}
}
/**
 * @typedef {{
  newLocation:Number[], 
  attackedSquares: Number[][]}} Move
 * 
 * @param {Number[][]} currentboard 
 * @param {Number[]} location
 * 
 * @returns {Move[]} moves
 */
function getMoves(currentboard, [ x, y ], firstMove = false) {
	let piece = currentboard[x][y];
	let moves = [];
	//White Piece
	if (Math.sign(piece) == 1) {
		const pieceKey = 1;
		if (piece == 1) {
			const dir = -1;
			const nextRow = x + dir;
			let nextCol = y - dir;
			//is the tile to the top left on the board
			if (withinBounds(nextRow, nextCol)) {
				let pieceAtSquare = currentboard[nextRow][nextCol];
				//if empty
				if (pieceAtSquare == 0) {
					let move = {
						newLocation: [ nextRow, nextCol ],
						attackedSquares: []
					};
					moves.push(move);
				}
				//is Enemy
				if (pieceAtSquare == dir) {
					const newnextRow = nextRow + dir;
					const newnextCol = nextCol - dir;
					//Landing tile is on board
					if (withinBounds(newnextRow, newnextCol)) {
						let landingTile = currentboard[newnextRow][newnextCol];
						//Tile after is empty
						if (landingTile == 0) {
							let move = {
								newLocation: [ newnextRow, newnextCol ],
								attackedSquares: [ [ nextRow, nextCol ] ]
							};

							let jumps = getJumps(currentboard, dir, pieceKey, move.newLocation, [ move ]);
							jumps.forEach((jump) => moves.push(jump));
						}
					}
				}
			}
			nextCol = y + dir;
			if (withinBounds(nextRow, nextCol)) {
				let pieceAtSquare = currentboard[nextRow][nextCol];
				//if empty
				if (pieceAtSquare == 0) {
					let move = {
						newLocation: [ nextRow, nextCol ],
						attackedSquares: []
					};
					moves.push(move);
				}
				//is Enemy
				if (pieceAtSquare == dir) {
					const newnextRow = nextRow + dir;
					const newnextCol = nextCol + dir;
					//Landing tile is on board
					if (withinBounds(newnextRow, newnextCol)) {
						let landingTile = currentboard[newnextRow][newnextCol];
						//Tile after is empty
						if (landingTile == 0) {
							let move = {
								newLocation: [ newnextRow, newnextCol ],
								attackedSquares: [ [ nextRow, nextCol ] ]
							};
							let jumps = getJumps(currentboard, dir, pieceKey, move.newLocation, [ move ]);
							jumps.forEach((jump) => moves.push(jump));
						}
					}
				}
			}
		} else {
			//king
			// DO black pawn an dwhite pawn moves
			//white moves
			let dir = -1;
			let nextRow = x + dir;
			let nextCol = y - dir;
			//is the tile to the top left on the board
			if (withinBounds(nextRow, nextCol)) {
				let pieceAtSquare = currentboard[nextRow][nextCol];
				//if empty
				if (pieceAtSquare == 0) {
					let move = {
						newLocation: [ nextRow, nextCol ],
						attackedSquares: []
					};
					moves.push(move);
				} else if (Math.sign(pieceAtSquare) != pieceKey) {
					//is Enemy
					const newnextRow = nextRow + dir;
					const newnextCol = nextCol - dir;
					//Landing tile is on board
					if (withinBounds(newnextRow, newnextCol)) {
						let landingTile = currentboard[newnextRow][newnextCol];
						//Tile after is empty
						if (landingTile == 0) {
							let move = {
								newLocation: [ newnextRow, newnextCol ],
								attackedSquares: [ [ nextRow, nextCol ] ]
							};

							let jumps = getJumps(currentboard, dir, pieceKey, move.newLocation, [ move ]);
							jumps.forEach((jump) => moves.push(jump));
						}
					}
				}
			}
			nextCol = y + dir;
			if (withinBounds(nextRow, nextCol)) {
				let pieceAtSquare = currentboard[nextRow][nextCol];
				//if empty
				if (pieceAtSquare == 0) {
					let move = {
						newLocation: [ nextRow, nextCol ],
						attackedSquares: []
					};
					moves.push(move);
				} else if (Math.sign(pieceAtSquare) != pieceKey) {
					//is Enemy
					const newnextRow = nextRow + dir;
					const newnextCol = nextCol + dir;
					//Landing tile is on board
					if (withinBounds(newnextRow, newnextCol)) {
						let landingTile = currentboard[newnextRow][newnextCol];
						//Tile after is empty
						if (landingTile == 0) {
							let move = {
								newLocation: [ newnextRow, newnextCol ],
								attackedSquares: [ [ nextRow, nextCol ] ]
							};
							let jumps = getJumps(currentboard, dir, pieceKey, move.newLocation, [ move ]);
							jumps.forEach((jump) => moves.push(jump));
						}
					}
				}
			}

			//Black moves
			dir = 1;
			nextRow = x + dir;
			nextCol = y - dir;
			if (withinBounds(nextRow, nextCol)) {
				let pieceAtSquare = currentboard[nextRow][nextCol];
				//if empty
				if (pieceAtSquare == 0) {
					let move = {
						newLocation: [ nextRow, nextCol ],
						attackedSquares: []
					};
					moves.push(move);
				}
				//is Enemy
				else if (Math.sign(pieceAtSquare) != pieceKey) {
					const newnextRow = nextRow + dir;
					const newnextCol = nextCol - dir;
					//Landing tile is on board
					if (withinBounds(newnextRow, newnextCol)) {
						let landingTile = currentboard[newnextRow][newnextCol];
						//Tile after is empty
						if (landingTile == 0) {
							let move = {
								newLocation: [ newnextRow, newnextCol ],
								attackedSquares: [ [ nextRow, nextCol ] ]
							};

							let jumps = getJumps(currentboard, dir, pieceKey, move.newLocation, [ move ]);
							jumps.forEach((jump) => moves.push(jump));
						}
					}
				}
			}
			nextCol = y + dir;
			if (withinBounds(nextRow, nextCol)) {
				let pieceAtSquare = currentboard[nextRow][nextCol];
				//if empty
				if (pieceAtSquare == 0) {
					let move = {
						newLocation: [ nextRow, nextCol ],
						attackedSquares: []
					};
					moves.push(move);
				}
				//is Enemy
				if (Math.sign(pieceAtSquare) != pieceKey) {
					const newnextRow = nextRow + dir;
					const newnextCol = nextCol + dir;
					//Landing tile is on board
					if (withinBounds(newnextRow, newnextCol)) {
						let landingTile = currentboard[newnextRow][newnextCol];
						//Tile after is empty
						if (landingTile == 0) {
							let move = {
								newLocation: [ newnextRow, newnextCol ],
								attackedSquares: [ [ nextRow, nextCol ] ]
							};

							let jumps = getJumps(currentboard, dir, pieceKey, move.newLocation, [ move ]);
							jumps.forEach((jump) => moves.push(jump));
						}
					}
				}
			}
		}
	} else {
		const pieceKey = -1;
		//Pawn
		if (piece == -1) {
			const dir = 1;
			const pieceKey = -1;
			const nextRow = x + dir;
			let nextCol = y - dir;
			//is the tile to the top left on the board
			if (withinBounds(nextRow, nextCol)) {
				let pieceAtSquare = currentboard[nextRow][nextCol];
				//if empty
				if (pieceAtSquare == 0) {
					let move = {
						newLocation: [ nextRow, nextCol ],
						attackedSquares: []
					};
					moves.push(move);
				}
				//is Enemy
				if (pieceAtSquare == dir) {
					const newnextRow = nextRow + dir;
					const newnextCol = nextCol - dir;
					//Landing tile is on board
					if (withinBounds(newnextRow, newnextCol)) {
						let landingTile = currentboard[newnextRow][newnextCol];
						//Tile after is empty
						if (landingTile == 0) {
							let move = {
								newLocation: [ newnextRow, newnextCol ],
								attackedSquares: [ [ nextRow, nextCol ] ]
							};

							let jumps = getJumps(currentboard, dir, pieceKey, move.newLocation, [ move ]);
							jumps.forEach((jump) => moves.push(jump));
						}
					}
				}
			}
			nextCol = y + dir;
			if (withinBounds(nextRow, nextCol)) {
				let pieceAtSquare = currentboard[nextRow][nextCol];
				//if empty
				if (pieceAtSquare == 0) {
					let move = {
						newLocation: [ nextRow, nextCol ],
						attackedSquares: []
					};
					moves.push(move);
				}
				//is Enemy
				if (pieceAtSquare == dir) {
					const newnextRow = nextRow + dir;
					const newnextCol = nextCol + dir;
					//Landing tile is on board
					if (withinBounds(newnextRow, newnextCol)) {
						let landingTile = currentboard[newnextRow][newnextCol];
						//Tile after is empty
						if (landingTile == 0) {
							let move = {
								newLocation: [ newnextRow, newnextCol ],
								attackedSquares: [ [ nextRow, nextCol ] ]
							};

							let jumps = getJumps(currentboard, dir, pieceKey, move.newLocation, [ move ]);
							jumps.forEach((jump) => moves.push(jump));
						}
					}
				}
			}
		} else {
			//king
			// DO black pawn an dwhite pawn moves
			//white moves
			let dir = -1;
			let nextRow = x + dir;
			let nextCol = y - dir;
			//is the tile to the top left on the board
			if (withinBounds(nextRow, nextCol)) {
				let pieceAtSquare = currentboard[nextRow][nextCol];
				//if empty
				if (pieceAtSquare == 0) {
					let move = {
						newLocation: [ nextRow, nextCol ],
						attackedSquares: []
					};
					moves.push(move);
				} else if (Math.sign(pieceAtSquare) != pieceKey) {
					//is Enemy
					const newnextRow = nextRow + dir;
					const newnextCol = nextCol - dir;
					//Landing tile is on board
					if (withinBounds(newnextRow, newnextCol)) {
						let landingTile = currentboard[newnextRow][newnextCol];
						//Tile after is empty
						if (landingTile == 0) {
							let move = {
								newLocation: [ newnextRow, newnextCol ],
								attackedSquares: [ [ nextRow, nextCol ] ]
							};

							let jumps = getJumps(currentboard, dir, pieceKey, move.newLocation, [ move ]);
							jumps.forEach((jump) => moves.push(jump));
						}
					}
				}
			}
			nextCol = y + dir;
			if (withinBounds(nextRow, nextCol)) {
				let pieceAtSquare = currentboard[nextRow][nextCol];
				//if empty
				if (pieceAtSquare == 0) {
					let move = {
						newLocation: [ nextRow, nextCol ],
						attackedSquares: []
					};
					moves.push(move);
				} else if (Math.sign(pieceAtSquare) != pieceKey) {
					//is Enemy
					const newnextRow = nextRow + dir;
					const newnextCol = nextCol + dir;
					//Landing tile is on board
					if (withinBounds(newnextRow, newnextCol)) {
						let landingTile = currentboard[newnextRow][newnextCol];
						//Tile after is empty
						if (landingTile == 0) {
							let move = {
								newLocation: [ newnextRow, newnextCol ],
								attackedSquares: [ [ nextRow, nextCol ] ]
							};
							let jumps = getJumps(currentboard, dir, pieceKey, move.newLocation, [ move ]);
							jumps.forEach((jump) => moves.push(jump));
						}
					}
				}
			}

			//Black moves
			dir = 1;
			nextRow = x + dir;
			nextCol = y - dir;
			if (withinBounds(nextRow, nextCol)) {
				let pieceAtSquare = currentboard[nextRow][nextCol];
				//if empty
				if (pieceAtSquare == 0) {
					let move = {
						newLocation: [ nextRow, nextCol ],
						attackedSquares: []
					};
					moves.push(move);
				}
				//is Enemy
				else if (Math.sign(pieceAtSquare) != pieceKey) {
					const newnextRow = nextRow + dir;
					const newnextCol = nextCol - dir;
					//Landing tile is on board
					if (withinBounds(newnextRow, newnextCol)) {
						let landingTile = currentboard[newnextRow][newnextCol];
						//Tile after is empty
						if (landingTile == 0) {
							let move = {
								newLocation: [ newnextRow, newnextCol ],
								attackedSquares: [ [ nextRow, nextCol ] ]
							};

							let jumps = getJumps(currentboard, dir, pieceKey, move.newLocation, [ move ]);
							jumps.forEach((jump) => moves.push(jump));
						}
					}
				}
			}
			nextCol = y + dir;
			if (withinBounds(nextRow, nextCol)) {
				let pieceAtSquare = currentboard[nextRow][nextCol];
				//if empty
				if (pieceAtSquare == 0) {
					let move = {
						newLocation: [ nextRow, nextCol ],
						attackedSquares: []
					};
					moves.push(move);
				}
				//is Enemy
				if (Math.sign(pieceAtSquare) != pieceKey) {
					const newnextRow = nextRow + dir;
					const newnextCol = nextCol + dir;
					//Landing tile is on board
					if (withinBounds(newnextRow, newnextCol)) {
						let landingTile = currentboard[newnextRow][newnextCol];
						//Tile after is empty
						if (landingTile == 0) {
							let move = {
								newLocation: [ newnextRow, newnextCol ],
								attackedSquares: [ [ nextRow, nextCol ] ]
							};

							let jumps = getJumps(currentboard, dir, pieceKey, move.newLocation, [ move ]);
							jumps.forEach((jump) => moves.push(jump));
						}
					}
				}
			}
		}
	}
	return moves;
}

/**
 * 
 * @param {Number} x 
 * @param {Number} y 
 */
function withinBounds(x, y) {
	return x >= 0 && x < 8 && y >= 0 && y < 8;
}
/**
 * @param {HTMLElement} tile 
 */
function handleClick(tile) {
	/**
     * @type {Number[]} move
     */
	const move = tile.location;
	const piece = tile.children[0];

	if (selectedPiece == null || selectedPiece == undefined) {
		if (piece.classList.contains(pieces[0])) {
			unhighlightMoves();
			selectedPiece = null;
		} else {
			selectedPiece = piece;
			highlightMoves();
		}
	} else {
		if (tile.classList.contains(MOVE)) {
			let [ prevX, prevY ] = selectedPiece.parentElement.location;
			let pieceKey = getPieceKey(selectedPiece);
			let moves = getMoves(gameboard, [ prevX, prevY ]);
			let currentMove;
			for (const _move of moves) {
				if (_move.newLocation[0] == move[0] && _move.newLocation[1] == move[1]) {
					currentMove = _move;
				}
			}
			for (const [ x, y ] of currentMove.attackedSquares) {
				gameboard[x][y] = 0;
			}
			gameboard[move[0]][move[1]] = Number.parseInt(pieceKey);
			gameboard[prevX][prevY] = 0;
		}
		unhighlightMoves();
		selectedPiece = null;
	}
	updateDisplay();
}
function highlightMoves() {
	let moves = getMoves(gameboard, [
		selectedPiece.parentElement.location[0],
		selectedPiece.parentElement.location[1]
	]);
	for (const move of moves) {
		const [ x, y ] = move.newLocation;
		tiles[x][y].classList.add(MOVE);
	}
}
function unhighlightMoves() {
	tiles.forEach((row) =>
		row.forEach((tile) => {
			tile.classList.remove(MOVE);
		})
	);
}
function getPieceKey(piece) {
	for (const key in pieces) {
		if (piece.className === pieces[key]) {
			return key;
		}
	}
}

function canjumpAgain(dir, key, left = false, [ x, y ], currentboard) {
	const nextRow = x + dir;
	const nextCol = y + (left ? -1 : 1);
	if (!withinBounds(nextRow, nextCol)) return false;
	let piece = currentboard[nextRow][nextCol];
	if (Math.sign(piece) != -key) return false;
	const newnextRow = nextRow + dir;
	const newnextCol = nextCol + (left ? -1 : 1);
	if (!withinBounds(newnextRow, newnextCol)) return false;
	piece = currentboard[newnextRow][newnextCol];
	if (piece != 0) return false;
	return true;
}
function getJumps(currentboard, dir, pieceKey, [ x, y ], previousJumps = []) {
	const moves = [];
	(() => {
		for (const jump of previousJumps) {
			moves.push(jump);
		}
	})();
	/*This is recursive
	 Terminal state :
	 if i cannot jump again then return all previous jumps
	 */
	let canJumpLeft = canjumpAgain(dir, pieceKey, true, [ x, y ], currentboard);
	let canJumpRight = canjumpAgain(dir, pieceKey, false, [ x, y ], currentboard);
	if (!canJumpLeft && !canJumpRight) return moves;

	//if i can jump right then get right move

	if (canJumpRight) {
		let nextRow = x + dir;
		let nextCol = y + 1;

		let newnextRow = x + dir + dir;
		let newnextCol = y + 2;

		let move = {
			newLocation: [ newnextRow, newnextCol ],
			attackedSquares: [ ...moves[moves.length - 1].attackedSquares, [ nextRow, nextCol ] ]
		};
		previousJumps.push(move);
		
		moves.push(getJumps(currentboard, dir, [ newnextRow, newnextCol ], previousJumps));
	}
	if (canJumpLeft) {
		let nextRow = x + dir;
		let nextCol = y - 1;

		let newnextRow = x + dir + dir;
		let newnextCol = y - 2;
		let move = {
			newLocation: [ newnextRow, newnextCol ],
			attackedSquares: [ ...moves[moves.length - 1].attackedSquares, [ nextRow, nextCol ] ]
		};
		previousJumps.push(move);
		
		moves.push(getJumps(currentboard, dir, [ newnextRow, newnextCol ], previousJumps));
	}

	return previousJumps;
}
