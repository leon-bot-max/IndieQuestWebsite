var submitButton;
var otherCountryRadio, swedenRadio;
var otherCountryInput, otherCountryLabel;

function init(){
	submitButton = document.getElementById("submitButton");
    
    otherCountryRadio = document.getElementById("annatLand");
    swedenRadio = document.getElementById("svensk");
    otherCountryInput = document.getElementById("land");

    swedenRadio.onclick = countryButtonClick;
    otherCountryRadio.onclick = countryButtonClick;


	
}
window.onload = init;

function countryButtonClick(){
    if (otherCountryRadio.checked){ //other country, make text input visible
        otherCountryInput.style.visibility = "visible"
        otherCountryInput.required = true;
    }
    else{
        otherCountryInput.style.visibility = "hidden"
        otherCountryInput.required = false;
    }
}

function validateRequiredInputs(){

}










