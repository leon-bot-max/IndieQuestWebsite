var submitButton;

let inputFormatPnr = new RegExp("[0-9]{8}-[0-9]{4}"); //Expected format

var personnummerInput;
var otherCountryRadio, swedenRadio;
var otherCountryInput, otherCountryLabel;

function init() {

    otherCountryRadio = document.getElementById("annatLand");
    swedenRadio = document.getElementById("svensk");
    otherCountryInput = document.getElementById("land");

    swedenRadio.onclick = countryButtonClick;
    otherCountryRadio.onclick = countryButtonClick;

    personnummerInput = document.getElementById("personnummer");
    personnummerInput.onblur = personnummerFormat;
    personnummerInput.onchange = personnummerFormat;


}
window.onload = init;

function personnummerFormat() { //Remove all non digits and Autoformat if they forget "-"
    if (personnummerInput.value.length >= 12 && !inputFormatPnr.test(personnummerInput.value)) {
        personnummerInput.value = personnummerInput.value.replace(/[^\d]/g, '');
        personnummerInput.value = personnummerInput.value.slice(0, 8) + "-" + personnummerInput.value.slice(8, 12);//insert '-'
        
    }
}

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
    var reason = "";

    if (!validatePersonnummer(document.getElementById("personnummer").value)) {
        reason += "Invalid personnummer\n";
    }

    if (!validateTextInput(document.getElementById("fname"))){
        reason += "Invalid firstname\n";
    }
    if (!validateTextInput(document.getElementById("lname"))){
        reason += "Invalid lastname\n";
    }
    if (!validateTextInput(document.getElementById("adress"))){
        reason += "Invalid address\n";
    }

    if (otherCountryRadio.checked) {
        if (!validateTextInput(otherCountryInput)){
            reason += "Invalid other country";
        }
    }
    trimValue(document.getElementById("co"));

    if (reason == ""){//No invalid inputs
        alert("All inputs accepted")
        return true;
    }
    alert(reason);
    return false;
}
function validateTextInput(textField)
{
    //All names valid as long as not empty, trimmed so they don't begin or end with blank
    if (!textField){
        return false;
    }
    trimValue(textField);
    
    if (textField.length <= 0){
        return false;
    }
    return true;
}

function trimValue(textField) {
    textField.value = textField.value.trim();
}

function validatePersonnummer(input) { //input format: ÅÅÅÅMMDD-XXXX
    if (!input || !inputFormatPnr.test(input)) //Wrong format
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


    //check pnr

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










