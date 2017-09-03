const getParamsFromInputs = () => {
	const noOfSessions = document.getElementById('sessions').value;
	const minutesPerPomodoro = document.getElementById('minutes-per-pomodoro').value;
	const minutesPerBreak = document.getElementById('minutes-per-break').value;
	return { noOfSessions, minutesPerPomodoro, minutesPerBreak };
};

let clock = null;

const createClock = () => {
	const { noOfSessions, minutesPerPomodoro, minutesPerBreak } = getParamsFromInputs();
	return new PomodoroClock( // eslint-disable-line no-undef
		minutesPerPomodoro,
		minutesPerBreak,
		noOfSessions,
		(state, clockInfo) => {
			const progressType = state.pomodoroInProgress ? 'Pomodoro' : 'Break';
			const allSessionsCompleted = !state.pomodoroInProgress && !state.breakInProgress;
			document.getElementById('pomodoro-clock').innerHTML =
				`Clock (${allSessionsCompleted ? 'Finished' : progressType}): ${state.elapsedProgressInSeconds} Finished Sessions: ${state.elapsedSessions}/${clockInfo.noOfSessions}`;
		}
	);
};

const startControl = () => {
	clock = createClock();
	clock.startSession();
};

const pauseControl = () => {
	if (clock.isPaused()) {
		clock.resume();
		document.getElementById('pause-button').innerHTML = 'Pause';
	} else {
		clock.pause();
		document.getElementById('pause-button').innerHTML = 'Resume';
	}
};

const resetControl = () => {
	clock.reset();
	clock = null;
};

document.getElementById('start-button').addEventListener('click', startControl);
document.getElementById('pause-button').addEventListener('click', pauseControl);
document.getElementById('reset-button').addEventListener('click', resetControl);
