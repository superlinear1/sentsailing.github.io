
  
loadPost();

function loadPost() {
	if (!window.location.href.includes("post.html#")) {
		window.open("index.html", "_self");
	} else {
		document.getElementById("pageTitle").innerHTML = "";
		document.getElementById("postCont").innerHTML = "loading post...";
		const xhr = new XMLHttpRequest();
		var id = window.location.href.split("#")[1];
		const url = "https://r34-json-api.herokuapp.com/posts?id=" + id;
		xhr.open("GET", url);
		xhr.send();
		document.getElementById("postCont").innerHTML = "loading response...";
		xhr.onload=(e)=>{
			var json = JSON.parse(xhr.responseText);
			if (json[0].type == "video") {
				document.getElementById("postCont").innerHTML = "";
				var vid = document.createElement("VIDEO");
				vid.src = json[0].file_url;
				vid.autoplay = true;
				vid.loop = true;
				vid.controls = true;
				vid.classList.add("full");
				document.getElementById("postCont").appendChild(vid)
			} else {
				document.getElementById("postCont").innerHTML = "";
				var image = document.createElement("IMG");
				image.classList.add("full");
				image.src = json[0].file_url;
				document.getElementById("postCont").appendChild(image);
			}
			var tagDiv = document.createElement("DIV");
			tagDiv.classList.add("liteContainer");
			for (var x in json[0].tags) {
				var link = document.createElement("A");
				link.innerHTML = json[0].tags[x];
				link.classList.add("tag");
				link.onclick = function () {
					document.getElementById("q").value = this.innerHTML;
					search();
				}
				tagDiv.appendChild(link)
			}
			document.getElementById("postCont").appendChild(tagDiv);
			var st1 = document.createElement("H4");
			st1.classList.add("stat");
			if (json[0].source.includes("http")) {
				st1.innerHTML = "Source: <a class='tag' style='color:white;' href='" + json[0].source + "'>" + json[0].source + "</a>";
				document.getElementById("postCont").appendChild(st1);
			} else {
				st1.innerHTML = json[0].source;
				document.getElementById("postCont").appendChild(st1);
			}
			var btn1 = document.createElement("A");
			var btn1a = document.createElement("BUTTON");
			btn1a.innerHTML = "view full image";
			btn1a.classList.add("postBtn");
			btn1.href = json[0].file_url;
			btn1.appendChild(btn1a);
			document.getElementById("postCont").appendChild(btn1);
		}
	}
}

function search() {
	const xhr = new XMLHttpRequest();
	document.getElementById("postCont").innerHTML = "loading..."
	var q = document.getElementById("q").value.replace(" ", "+");
	if (!q) {
		loadNewPost();
		return;
	}
	const url = "https://r34-json-api.herokuapp.com/posts?tags=" + q;
	document.getElementById("postCont").innerHTML = "requesting...";
	xhr.open("GET", url);
	xhr.send();
	document.getElementById("postCont").innerHTML = "loading response...";
	xhr.onload=(e)=>{
		document.getElementById("postCont").innerHTML = "";
		var json = JSON.parse(xhr.responseText);
		if (!json[0]) {
			document.getElementById("postCont").innerHTML = "<span style='color:red;'>no results.</span>";
			return;
		}
		document.getElementById("pageTitle").innerHTML = json.length + " results for <i>" + q.replace("+", " ") + "</i>";
		for (var x in json) {
			var link = document.createElement("A");
			link.href = "post.html#" + json[x].id;
			var img = document.createElement("IMG");
			img.src = json[x].preview_url;
			img.classList.add("preview");
			link.appendChild(img);
			document.getElementById("postCont").appendChild(link);
		}
		
	}
}
