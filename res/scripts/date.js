const weekDay = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

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
