let task_amount = 0;
let doneTask_amount = 0;

let task = {
	amount: 0,
	text: [],
	checked: [],
	id: [],
};

function createTask(storage_n, task_id, task_name, checked) {
	$(".content-list").append(
		`<div class="task" id="${storage_n}"><img src="res/svg/unchecked-square.svg" class="check-button" alt="${checked}" id=${task_id}>${task_name}<img src="res/svg/trash-square.svg" class="delete-button" onclick="deleteTask(event)"></div>`
	);
	if (checked == 1) {
		document.getElementById(storage_n).classList.add("done");
		document.getElementById(task_id).src = "res/svg/checked-square.svg";
		document.getElementById(task_id).alt = checked;
		doneTask_amount++;
	}
	task_amount++;
	refreshDisplay();
}

function newTask(event) {
	const input = document.getElementById("input-task");
	if (event.key == "Enter") {
		const task_name = input.value;
		const task_id = String(task_name).replace(/ /g, "_");
		input.value = "";
		createTask(task_amount, task_id, task_name, 0);
		saveNewTask(task_name, 0, event.target.parentNode.id);
	}
}

function loadTask() {
	try {
		const saved_task = JSON.parse(localStorage.getItem(getDay("today")));
		console.log(saved_task);
		for (let i = 0; i < saved_task.text.length; i++) {
			if (saved_task.text[i] !== "deleted-task" && saved_task.id[i] !== "deleted-task") {
				task.amount++;
				task.checked.push(saved_task.checked[i]);
				task.id.push(saved_task.id[i]);
				task.text.push(saved_task.text[i]);
				createTask(i, saved_task.id[i], saved_task.text[i], saved_task.checked[i]);
				localStorage.setItem(getDay("today"), JSON.stringify(task));
			}
			console.log("Limpo");
		}
	} catch (error) {
		console.log(error);
	}
}

function saveNewTask(text, checked, day) {
	task.text.push(text);
	task.checked.push(checked);
	task.id.push(String(text).replace(/ /g, "_"));
	task.amount++;
	localStorage.setItem(getDay("today"), JSON.stringify(task));
}

function refreshTask(check, item) {
	task.checked[item] = check;
	localStorage.setItem(getDay("today"), JSON.stringify(task));
}

/* Check or Uncheck Task */
document.addEventListener("click", function handleClick(event) {
	const element = event.target;
	let checked = 0;
	if (element.classList == "check-button") {
		const checkBox = element;
		const taskDiv = element.parentNode;
		console.log(checkBox.src);
		if (checkBox.alt == "1") {
			checkBox.src = "res/svg/unchecked-square.svg";
			checked = 0;
			console.log("not checked");
			taskDiv.classList = "task";
			doneTask_amount--;
		} else if (checkBox.alt == "0") {
			checkBox.src = "res/svg/checked-square.svg";
			checked = 1;
			doneTask_amount++;
			console.log("checked");
			taskDiv.classList = "task done";
		}
		checkBox.alt = checked;
		refreshTask(checked, taskDiv.id);
	} else if (element.classList == "task" || element.classList == "task done") {
		const checkBox = element.children[0];
		const taskDiv = element;
		if (checkBox.classList == "check-button") {
			if (checkBox.alt == "1") {
				checkBox.src = "res/svg/unchecked-square.svg";
				checked = 0;
				console.log("not checked");
				taskDiv.classList = "task";
				doneTask_amount--;
			} else if (checkBox.alt == "0") {
				checkBox.src = "res/svg/checked-square.svg";
				checked = 1;
				console.log("checked");
				taskDiv.classList = "task done";
				doneTask_amount++;
			}
			checkBox.alt = checked;
			refreshTask(checked, taskDiv.id);
		}
	}
	refreshDisplay();
});

function deleteTask(event) {
	const btn = event.target;
	const id_task = btn.parentNode.id;
	console.log(id_task);
	console.log(btn.parentNode);
	$("#" + id_task).remove();
	/* 	localStorage.setItem(Number(id_task), JSON.stringify("none")); */
	task.text[id_task] = "deleted-task";
	task.id[id_task] = "deleted-task";
	localStorage.setItem(getDay("today"), JSON.stringify(task));
	task_amount--;
	if (btn.parentNode.classList == "task done") {
		doneTask_amount--;
	}
	refreshDisplay();
}

function refreshDisplay() {
	const disp = document.getElementById("display");
	disp.innerText = `${String(doneTask_amount)} de ${String(task_amount)}`;
	if (doneTask_amount !== task_amount) {
		disp.classList = "display-list";
	} else {
		disp.classList = "display-list green";
	}
}
