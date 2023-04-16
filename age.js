const day_input = document.querySelector(".day");
const month_input = document.querySelector(".month");
const year_input = document.querySelector(".year");
const button = document.querySelector(".button");
const errors = document.querySelectorAll(".error-text");
const error_year = document.querySelector(".error-year");
const error_month = document.querySelector(".error-month");
const error_day = document.querySelector(".error-day");
const inputs = document.querySelectorAll(".input");
const labels = document.querySelectorAll("labels");
const yearsOld = document.querySelector(".years");
const monthsOld = document.querySelector(".months");
const daysOld = document.querySelector(".days");

const current_date = new Date();
const year = current_date.getFullYear();
const month = current_date.getMonth();
const day = current_date.getDate();

let isTheBirthYearValid = false;

const checkIfEmptyFields = () => {
    inputs.forEach(input => {
        if(input.value == "") {
            input.style.border = "1px solid #FF5959";
            input.parentElement.style.color = "#FF5959";
            input.nextElementSibling.innerHTML = "This field is required";
            input.nextElementSibling.classList.remove("hidden");
        } else {
            input.style.border = "1px solid #716F6F";
            input.parentElement.style.color = "#716F6F";
            input.nextElementSibling.classList.add("hidden");
        }
    })
}

const changeColorAndShowText = (input, error) => {
    input.style.border = "1px solid #FF5959";
    input.parentElement.style.color = "#FF5959";
    error.classList.remove("hidden");
}

const isYearInFuture = () => {
    if(year_input.value > year) {
        changeColorAndShowText(year_input, error_year);
        error_year.innerHTML = "Must be in the past"
    } 
}

const isTheMonthValid = () => {
    if(month_input.value != "") {
        if(month_input.value > 12 || month_input.value < 1) {
            changeColorAndShowText(month_input, error_month);
            error_month.innerHTML = "Must be a valid month";
        }
    }

}

const isTheDayValid = () => {
    if(day_input.value > 31 || day_input < 1) {
        changeColorAndShowText(day_input, error_day);
        error_day.innerHTML = "Must be a valid day";
    }
}

const isTheDateValid = () => {
    let days30array = [04, 06, 10, 11];
    for(let i = 0; i < days30array.length; i++) {
        if(month_input.value == 02 && day_input.value > 28) {
            changeColorAndShowText(day_input, error_day);
            error_day.innerHTML = "Must be a valid date"; 
            } 
        else if(day_input.value == 31 && month_input.value == days30array[i]) {
            changeColorAndShowText(day_input, error_day);
            error_day.innerHTML = "Must be a valid date"; 
        } 
        else if(year_input.value < 1893) {
            changeColorAndShowText(day_input, error_day);
            error_day.innerHTML = "Must be a valid date"; 
        }
    }
}

const calculateAge = () => {
    let dateOfBirth = new Date(year_input.value, month_input.value, day_input.value);
    let diff_in_time = current_date.getTime() - dateOfBirth.getTime();
    let diff_in_days = diff_in_time / (1000 * 3600 * 24);
    let years = Math.floor(diff_in_days / 365.25);
    let months = Math.floor((diff_in_days - (years * 365.25)) / 30.4375);
    let days = Math.floor(diff_in_days - (years * 365.25) - (months * 30.4375));
    if(isTheBirthYearValid) {
        yearsOld.innerHTML = years;
        monthsOld.innerHTML = months;
        daysOld.innerHTML = days;
    } else {
        yearsOld.innerHTML = "--";
        monthsOld.innerHTML = "--";
        daysOld.innerHTML = "--";
    }
 
}

const checkIfValid = () => {
    if(error_day.classList.contains("hidden") && error_month.classList.contains("hidden") && error_year.classList.contains("hidden")) {
        console.log("yes")
        isTheBirthYearValid = true;
    } else {
        isTheBirthYearValid = false;
    }
    
}

button.onclick = () => {
    checkIfEmptyFields();
    isYearInFuture();
    isTheMonthValid();
    isTheDayValid();
    isTheDateValid();
    checkIfValid();

    calculateAge();
    
}

