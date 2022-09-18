const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function titleByDay() {
	const title = document.getElementById("title");
	title.innerText = getDay("today") + "'S List";
}

function getDay(request) {
	const date = new Date();
	const number = date.getDay();
	switch (request) {
		case "today":
			return weekDay[number];
			break;
		case "yesterday":
			return weekDay[number(date.setDate(date.getDate() - 1))];
			break;
		case "before-yesterday":
			return weekDay[date.getDay(date.setDate(date.getDate() - 2))];
			break;
		case "tomorrow":
			return weekDay[date.getDay(date.setDate(date.getDate() + 1))];
			break;
		case "after-tomorrow":
			return weekDay[date.getDay(date.setDate(date.getDate() + 2))];
			break;
	}
}

function refreshTime() {
	// Clock
	const clockText = document.getElementById("clock-text");
	const dayText = document.getElementById("day-text");
	let minutes = new Date().getMinutes();
	let hours = new Date().getHours();
	if (minutes < 10) {
		minutes = "0" + new Date().getMinutes();
	} else if (hours < 10) {
		hours = "0" + new Date().getHours();
	}
	clockText.innerHTML = `${hours}:${minutes}`;
	dayText.innerHTML = `${getDayOfTheWeek()}`;
	// Background On Time
}

function getDayOfTheWeek() {
	const day_number = new Date().getDay();
	const day_names = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
	return day_names[day_number];
}

setInterval(refreshTime, 1000);
