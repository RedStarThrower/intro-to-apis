// Addresses

var apikey = "325ade0da4514bb29ff036144a8bc016"

var bareLegislatorsUrl = "http://congress.api.sunlightfoundation.com/legislators/?apikey="
var legislatorsUrl = bareLegislatorsUrl + apikey

var bareZipUrl = "https://congress.api.sunlightfoundation.com/districts/locate/?zip="

// Search

var inputEl = document.querySelector('input[type="text"]')
inputEl.value = "Enter zip here:"


var zipToUrl = function(keyEvent) {	
  	var inputEl = keyEvent.srcElement
  		if (keyEvent.keyCode === 13) {
      		zip = inputEl.value
      		inputEl.value = ""
      			console.log(zip)
      		searchUrl = bareZipUrl + zip + "&apikey=" + apikey 
      			console.log(searchUrl)   
      	   	var zipPromise = $.getJSON(searchUrl)  
      	   	console.log(zipPromise)	

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
		newString += '<li><p>email:' + " " + legislatorObj.oc_email.toLowerCase() +'<p></li>'
		newString += '<li><p>website:' + " " + '<a href="'+ legislatorObj.website +'" target="_blank">'+legislatorObj.website+'</a>' + '<p></li>' 
		newString += '<li><p>facebook:' + " " + legislatorObj.facebook_id +'<p></li>'
		newString += '<li><p>twitter:' + " " + legislatorObj.twitter_id +'<p></li>' 
		newString += '<li><p>contact form:' + " " + '<a href="'+ legislatorObj.contact_form + '" target="_blank">' + legislatorObj.contact_form +'</a>' + '<p></li>' + '</ul>' 
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