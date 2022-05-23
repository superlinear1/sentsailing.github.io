search();

function loadNewPost() {
	document.getElementById("postCont").innerHTML = "loading..."
	const xhr = new XMLHttpRequest();
	const url = "https://r34-json-api.herokuapp.com/posts";
	document.getElementById("postCont").innerHTML = "requesting...";
	xhr.open("GET", url);
	xhr.send();
	document.getElementById("postCont").innerHTML = "loading response...";
	xhr.onload=(e)=>{
		document.getElementById("pageTitle").innerHTML = "most recent posts"
		document.getElementById("postCont").innerHTML = "";
		var json = JSON.parse(xhr.responseText);
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
