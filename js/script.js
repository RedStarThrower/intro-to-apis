// Addresses

var apikey = "325ade0da4514bb29ff036144a8bc016"

var bareLegislatorsUrl = "http://congress.api.sunlightfoundation.com/legislators/?apikey="
var legislatorsUrl = bareLegislatorsUrl + apikey

var bareZipUrl = "https://congress.api.sunlightfoundation.com/legislators/locate/?apikey=325ade0da4514bb29ff036144a8bc016&zip="


// Search

var inputEl = document.querySelector('input[type="text"]')
inputEl.value = "Enter zip here:"


var doRequest = function(zipCode) {
	var zipPromise = $.getJSON(bareZipUrl + zipCode)  
	zipPromise.then(handleData)
} 


var zipToUrl = function(keyEvent) {	
  	var inputEl = keyEvent.target
  		if (keyEvent.keyCode === 13) {
      		var zipCode = inputEl.value
      		inputEl.value = ""
      		doRequest(zipCode)
  }
}

inputEl.addEventListener('keydown', zipToUrl)


 // Legislators

var congressionalPromise = $.getJSON(legislatorsUrl)

var legislatorToHTML = function(legislatorObj) {
	var newString = '<div class = "legislatorContainer">'
		newString += '<h3 class="legislatorName">' + legislatorObj.first_name + " " + legislatorObj.last_name + '</h3>' 
		newString += '<h5 class="legislatorTitle">' + legislatorObj.title + " " + "(" + legislatorObj.party + "-" + legislatorObj.state_name + ")" + '</h5>'
		newString += '<ul class="list">'  
		newString += '<li><p>email:' + " " + legislatorObj.oc_email +'<p></li>'
		newString += '<li><p>website:' + " " + '<a href="'+ legislatorObj.website +'" target="_blank">'+legislatorObj.website+'</a>' + '<p></li>' 
		newString += '<li><p>facebook:' + " " + legislatorObj.facebook_id +'<p></li>'
		newString += '<li><p>twitter:' + " " + legislatorObj.twitter_id +'<p></li>' 
		+ '</ul>' 
		newString += '<h5 class="termEnd">Term Start:' + " " + legislatorObj.term_start+ '</h5>'
		newString += '<h5 class="termEnd">Term End:' + " " + legislatorObj.term_end + '</h5>'
	+ '</div>'
	return newString
}

var handleData = function(resultObject) {
	//console.log(resultObject)	
	var resultArray = resultObject["results"]
	var htmlString = ""
	for (var i = 0; i < resultArray.length; i++) {
		var legislatorObj = resultArray[i]
		htmlString += legislatorToHTML(legislatorObj)
	}
	var containerEl = document.querySelector("#container")
	containerEl.innerHTML = htmlString	
}

congressionalPromise.then(handleData) 