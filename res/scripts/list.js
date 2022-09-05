let storage_number = Number(localStorage.getItem("storage_number"));
let task_amount = 0;
let doneTask_amount = 0;

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
		storage_number++;
		createTask(storage_number, task_id, task_name, 0);
		saveNewTask(task_name, 0, event.target.parentNode.id);
	}
}

function loadTask() {
	for (let i = 1; i <= storage_number; i++) {
		const task = JSON.parse(localStorage.getItem(i));
		console.log(task);
		if (task.day == getDay("today")) {
			if (task !== "none") {
				if (task.checked == 0) {
					createTask(i, task.id, task.text, 0);
				} else if (task.checked == 1) {
					createTask(i, task.id, task.text, 1);
				}
			}
		}
	}
}

function saveNewTask(text, checked, day) {
	const task_list = {
		text: text,
		checked: checked,
		id: String(text).replace(/ /g, "_"),
		day: getDay(day),
	};
	localStorage.setItem("storage_number", String(storage_number));
	localStorage.setItem(storage_number, JSON.stringify(task_list));
}

function refreshTask(text, checked, sn_id, day) {
	const task_list = {
		text: text,
		checked: checked,
		id: String(text).replace(/ /g, "_"),
		day: getDay(day),
	};
	localStorage.setItem(sn_id, JSON.stringify(task_list));
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
		refreshTask(
			taskDiv.innerText,
			checked,
			taskDiv.id,
			taskDiv.parentNode.parentNode.id
		);
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
			refreshTask(
				taskDiv.innerText,
				checked,
				taskDiv.id,
				taskDiv.parentNode.parentNode.id
			);
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
	localStorage.setItem(Number(id_task), JSON.stringify("none"));
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
