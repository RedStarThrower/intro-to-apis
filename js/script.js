var apikey = "325ade0da4514bb29ff036144a8bc016"

var url = "http://openstates.org/api/v1/legislators/?state=tx&apikey=325ade0da4514bb29ff036144a8bc016"

var congressionalPromise = $.getJSON(url)


var legislatorToHTML = function(legislatorObj) {
	var newString = '<div class = "legislatorContainer">'
	newString += '<img src="' + legislatorObj.photo_url + '">'
	newString += '<p class="legislatorName">' + legislatorObj.full_name + '</p></div>'
	return newString
}

var handleData = function(resultArray) {
	console.log(resultArray)	
	var htmlString = ""
	for (var i = 0; i < resultArray.length; i++) {
		var legislatorObj = resultArray[i]	

		htmlString += legislatorToHTML(legislatorObj)
	}
	var containerEl = document.querySelector("#container")
	containerEl.innerHTML = htmlString	
}

congressionalPromise.then(handleData) 