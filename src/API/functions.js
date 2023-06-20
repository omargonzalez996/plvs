export function validatePlaylist(inputString) {
	let regex = /^.*(youtu.be\/|list=)([^#\&\?]*).*/;
	if (inputString.length == 0) {
		return 0;
	} else {
		if (regex.test(inputString)) {
			return 1;
		} else {
			return 2;
		}
	}
}

export function activateButton(inputState) {
	if (inputState == 0) {
		return false;
	}
	if (inputState == 1) {
		return true;
	}
	if (inputState) {
		return false;
	}
}
