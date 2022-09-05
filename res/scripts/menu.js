function refreshTime() {
	const clockText = document.getElementById("clock-text");
	const dayText = document.getElementById("day-text");
	clockText.innerHTML = `${new Date().getHours()}:${new Date().getMinutes()}`;
	if (new Date().getMinutes() < 10) {
		clockText.innerHTML = `${new Date().getHours()}:0${new Date().getMinutes()}`;
	}
	dayText.innerHTML = `${getDayOfTheWeek()}`;
}

function getDayOfTheWeek() {
	const day_number = new Date().getDay();
	const day_names = [
		"domingo",
		"segunda-feira",
		"terça-feira",
		"quarta-feira",
		"quinta-feira",
		"sexta-feira",
		"sábado",
	];
	return day_names[day_number];
}

setInterval(refreshTime, 1000);
