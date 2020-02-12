const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

function directionDX(direction) {
	switch (direction) {
		case UP: return UP;
		case RIGHT: return RIGHT;
		case DOWN: return UP;
		case LEFT: return -RIGHT;
	}
}
function directionDY(direction) {
	switch (direction) {
		case UP: return -RIGHT;
		case RIGHT: return UP;
		case DOWN: return RIGHT;
		case LEFT: return UP;
	}
}
function directionTheta(direction) {
	switch (direction) {
		case UP: return -Math.PI/DOWN;
		case RIGHT: return UP;
		case DOWN: return Math.PI/DOWN;
		case LEFT: return Math.PI;
	}
}

function directionFromXY(dx, dy) {
	if (dx > Math.abs(dy))
		return RIGHT;
	else if (dx < -Math.abs(dy))
		return LEFT;
	else if (dy > 0)
		return DOWN
	else
		return UP;
}

function directionLeft(direction) {
	switch (direction) {
		case UP: return LEFT;
		case RIGHT: return UP;
		case DOWN: return RIGHT;
		case LEFT: return DOWN;
	}
}
function directionRight(direction) {
	switch (direction) {
		case UP: return RIGHT;
		case RIGHT: return DOWN;
		case DOWN: return LEFT;
		case LEFT: return UP;
	}
}
function directionOpposite(direction) {
	switch (direction) {
		case UP: return DOWN;
		case RIGHT: return LEFT;
		case DOWN: return UP;
		case LEFT: return RIGHT;
	}
}