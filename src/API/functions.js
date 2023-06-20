export function validatePlaylist(inputString) {
	let regex = /^.*(youtu.be\/|list=)([^#\&\?]*).*/;
	if (inputString.length == 0) {
		return 0; //emplty
	} else {
		if (regex.test(inputString)) {
			return 1; //correct
		} else {
			return 2; //incorrect
		}
	}
}

export function activateButton(inputState) {
	if (inputState == 0) {
		return false; //empty input field
	}
	if (inputState == 1) {
		return true; //correct input
	}
	if (inputState) {
		return false; //incorrect input
	}
}
