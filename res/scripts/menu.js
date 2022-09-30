let amount_app = 0;
const app = {
	id: [],
	name: [],
	icon_url: [],
	website_url: [],
	total_apps: 0,
};

function appFormat(app_name, icon_url, website_url, id) {
	$("#app-creator-button").remove();
	$("#list-app").append(`
	<div class="app" id="${id}">
        <a href="${website_url}">
            <div class="app-img" oncontextmenu="openModal('settings', event)">
                    <img src="${icon_url}" width="100%" alt="" />
            </div>
        </a>
        <div style="font-weight: 500; margin-top: 5px">${app_name}</div>
    </div>
	`);
	if (amount_app !== 12) {
		$("#list-app").append(`
 		<div id="app-creator-button" class="app">
			<div class="app-img" onclick="openModal('add')">
					<img src="res/svg/plus.svg" width="100%" alt="" />
			</div>
			<div style="font-weight: 500; margin-top: 5px">Add link</div>
		</div>
	`);
	}
}

function saveApp(app_name, icon_url, website_url) {
	app.id.push(amount_app++);
	app.name.push(String(app_name));
	app.icon_url.push(String(icon_url));
	app.website_url.push(String(website_url));
	app.total_apps = amount_app;
	localStorage.setItem("app", JSON.stringify(app));
}

function getSavedApps() {
	const saved_app = JSON.parse(localStorage.getItem("app"));
	try {
		for (let checked_apps = 0; checked_apps < saved_app.total_apps; checked_apps++) {
			if (saved_app.name[checked_apps] !== "deleted-app" && saved_app.id[checked_apps] !== "deleted-app") {
				if (saved_app.name[checked_apps] !== null) {
					if (saved_app.name[checked_apps] !== undefined) {
						console.log(`name: ${saved_app.name[checked_apps]}`);
						console.log(saved_app.name[checked_apps]);
						amount_app = saved_app.total_apps;
						app.id.push(app.total_apps);
						app.name.push(saved_app.name[checked_apps]);
						app.icon_url.push(saved_app.icon_url[checked_apps]);
						app.website_url.push(saved_app.website_url[checked_apps]);
						app.total_apps++;
						localStorage.setItem("app", JSON.stringify(app));
					}
				}
			}
		}
		for (let index = 0; index < app.name.length; index++) {
			appFormat(app.name[index], app.icon_url[index], app.website_url[index], app.id[index]);
		}
	} catch (error) {
		console.log("Não existe nenhum app ainda.");
	}
}

const isValidUrl = (urlString) => {
	var urlPattern = new RegExp(
		"^(https?:\\/\\/)?" +
			"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
			"((\\d{1,3}\\.){3}\\d{1,3}))" +
			"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
			"(\\?[;&a-z\\d%_.~+=-]*)?" +
			"(\\#[-a-z\\d_]*)?$",
		"i"
	);
	return !!urlPattern.test(urlString);
};

function createApp() {
	const appName = document.getElementById("add-website-name");
	const iconUrl = document.getElementById("add-icon-url");
	const websiteUrl = document.getElementById("add-website-url");
	console.log(isValidUrl(websiteUrl.value), appName.value !== "", isValidUrl(iconUrl.value));
	console.log(websiteUrl.value, iconUrl.value, appName.value);
	if (isValidUrl(iconUrl.value) && isValidUrl(websiteUrl.value) && appName.value !== "") {
		document.getElementById(`add-modal`).style.display = "none";
		saveApp(appName.value, iconUrl.value, websiteUrl.value);
		appFormat(appName.value, iconUrl.value, websiteUrl.value, app.name.indexOf(appName.value));
		appName.value = "";
		iconUrl.value = "";
		websiteUrl.value = "";
	}
}

function openModal(id, event) {
	const inputName = document.getElementById("new-website-name");
	const inputIcon = document.getElementById("new-icon-url");
	const inputUrl = document.getElementById("new-website-url");
	const modal = document.getElementById(`${id}-modal`);
	modal.style.display = "block";
	if (id == "settings") {
		const app_id = event.target.parentNode.parentNode.id;
		const app_name = event.target.parentNode.parentNode.innerText;
		const app_icon = event.target.children[0].src;
		const app_url = event.target.parentNode.href;
		$("#settings-modal-footer").append(`
			<span onclick="closeModal('settings')" class="modal-button">Cancel</span>
			<span onclick="removeApp(${app_id})" class="modal-button">Remove</span>
			<span onclick="editApp(${app_id})" class="modal-button">Apply</span>
		`);
		console.log(app_id);
		inputName.placeholder = app_name;
		inputIcon.placeholder = app_icon;
		inputUrl.placeholder = app_url;
	}
}

function closeModal(id) {
	const modal = document.getElementById(`${id}-modal`);
	modal.style.display = "none";
	if (id == "settings") {
		$("#settings-modal-footer").empty();
	}
}

/* const inputName = document.getElementById("new-website-name");
const inputIcon = document.getElementById("new-icon-url");
const inputUrl = document.getElementById("new-website-url"); */

function editApp(appNumber) {
	const inputName = document.getElementById("new-website-name");
	const inputIcon = document.getElementById("new-icon-url");
	const inputUrl = document.getElementById("new-website-url");
	const appDiv = $(`div#list-app >`)[appNumber];
	console.log(appDiv);
	if (inputName.value !== "") {
		app.name[appNumber] = inputName.value;
		appDiv.children[1].innerText = inputName.value;
	}
	if (inputIcon.value !== "") {
		app.icon_url[appNumber] = inputIcon.value;
	}
	if (inputUrl.value !== "") {
		app.website_url[appNumber] = inputUrl.value;
	}
	localStorage.setItem("app", JSON.stringify(app));
	closeModal("settings");
}

function removeApp(appNumber) {
	console.log(appNumber);
	$(".app").remove("#" + appNumber);
	app.name[appNumber] = "deleted-app";
	app.id[appNumber] = "deleted-app";
	console.log(JSON.stringify(app));
	localStorage.setItem("app", JSON.stringify(app));
	closeModal("settings");
}
