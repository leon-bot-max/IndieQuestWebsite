var submitButton;
var otherCountryRadio, swedenRadio;
var otherCountryInput, otherCountryLabel;

function init() {
    submitButton = document.getElementById("submitButton");

    otherCountryRadio = document.getElementById("annatLand");
    swedenRadio = document.getElementById("svensk");
    otherCountryInput = document.getElementById("land");

    swedenRadio.onclick = countryButtonClick;
    otherCountryRadio.onclick = countryButtonClick;

    submitButton.onclick = validateRequiredInputs;


}
window.onload = init;

function countryButtonClick() {
    if (otherCountryRadio.checked) { //other country, make text input visible
        otherCountryInput.style.visibility = "visible"
        otherCountryInput.required = true;
    }
    else {
        otherCountryInput.style.visibility = "hidden"
        otherCountryInput.required = false;
    }
}

function validateRequiredInputs() {
    if (!validatePersonnummer(document.getElementById("personnummer").value)){
        alert("Invalid personnummer");
    }
}

function validatePersonnummer(input) { //input format: ÅÅÅÅMMDD-XXXX

    if (!input || input.length != 13) //Wrong format
    {
        return false;
    }

    //check id valid date
    var month = input.substring(4, 6);
    var day = input.substring(6, 8);
    if (month > 12 || month <= 0 || day <= 0) {
        return false;
    }
    else if (month < 8) {
        //odd months has 31 days, even months as 30 (except [2] feb)
        if ((month % 2 == 1 && day > 31) || (month % 2 == 0 && day > 30) || (month == 2 && day > 29)) {
            return false;
        }
    }
    else if (month >= 8) {
        //odd months has 30 days, even months as 31
        if ((month % 2 == 0 && day > 31) || (month % 2 == 1 && day > 30)) {
            return false;
        }
    }


    //check psn

    input = input.slice(2, 8) + input.slice(9, 13); //remove the "-" format: ÅÅMMDDXXXX

    //https://sv.wikipedia.org/wiki/Luhn-algoritmen#Exempel_i_Python
    //Luhn algorithm
    var sum = 0;
    for (var i = 0; i < input.length; i++) {
        digit = parseInt(input.charAt(i))
        if (i % 2 == 0) {
            digit *= 2;
        }
        if (digit > 9) {
            digit -= 9;
        }
        sum += digit;
    }
    return sum % 10 == 0;
}










