let amount_app = 0;
const app = {
	id: [],
	name: [],
	icon_url: [],
	website_url: [],
	total_apps: 0,
};

function appFormat(app_name, icon_url, website_url) {
	$("#app-creator-button").remove();
	$("#list-app").append(`
	<div class="app">
            <a href="${website_url}">
                <div class="app-img">
                    <img src="${icon_url}" width="100%" alt="" />
                </div>
            </a>
        <div style="font-weight: 500; margin-top: 5px">${app_name}</div>
    </div>
	`);
	if (amount_app !== 16) {
		$("#list-app").append(`
 		<div id="app-creator-button" class="app">
			<div class="app-img" onclick="openModal()">
					<img src="/res/svg/plus.svg" width="100%" alt="" />
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
			console.log(`name: ${saved_app.name[checked_apps]}`);
			appFormat(saved_app.name[checked_apps], saved_app.icon_url[checked_apps], saved_app.website_url[checked_apps]);
			amount_app = saved_app.total_apps;
			app.id.push(saved_app.id[checked_apps]);
			app.name.push(saved_app.name[checked_apps]);
			app.icon_url.push(saved_app.icon_url[checked_apps]);
			app.website_url.push(saved_app.website_url[checked_apps]);
			app.total_apps = amount_app;
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
	const appName = document.getElementById("website-name");
	const iconUrl = document.getElementById("icon-url");
	const websiteUrl = document.getElementById("website-url");
	console.log(isValidUrl(websiteUrl.value) + ", " + (appName.value !== "") + ", " + isValidUrl(iconUrl.value));
	if (isValidUrl(iconUrl.value) && isValidUrl(websiteUrl.value) && appName.value !== "") {
		modal.style.display = "none";
		saveApp(appName.value, iconUrl.value, websiteUrl.value);
		appFormat(appName.value, iconUrl.value, websiteUrl.value);
		appName.value = "";
		iconUrl.value = "";
		websiteUrl.value = "";
	}
}

function openModal() {
	const modal = document.getElementById("modal");
	modal.style.display = "block";
}

function closeModal() {
	const modal = document.getElementById("modal");
	console.log("?");
	modal.style.display = "none";
}
