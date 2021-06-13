//an array to store male names
const menIndex = ["Kwasi", "Kwadwo", "Kwabena", "Kwaku", " Yaw", "Kofi", "Kwame"];

//an array to store female names
const womenIndex = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];

//Days of the week
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

//number of days in a week
const noOfDays = 7

//all days of a month in a year
const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const allDaysMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

//month index according to Gregian calendar system
var monthIndex = []

var monthIndexGenerator = () => {
    let x = 0;
    for (let i = 0; i < allDaysMonth.length; i++) {
      monthIndex.push(x);
      x = (x + allDaysMonth[i]) % noOfDays

    }
    return x;
  }

//month Code provider
monthIndexGenerator();
var centuryIndex = century => {
    let code;
    if (century % 4 === 0) {
      code = 6;
    } else if (century === 1 || (century - 1) % 4 === 0) {
      code = 4;
    } else if ((century + 1) % 4 === 0) {
      code = 0;
    } else if (century === 2 || (century / 2) % 2 !== 0) {
      code = 2;
    }
    return code;
  }

//date of birth data function
var dataCollection = (day, month, year) => {
  let dd = parseInt(day);

  let mm = monthIndex[parseInt(month) - 1]; //month code
  let cc = centuryIndex(Math.floor(year / 100)); // century code
  let yy = parseInt(year.slice(-2));
  let yearCode = (yy + Math.floor(yy / 4)) % noOfDays //year code)
  let dayOfBirthIndex;

  if ((((cc === 6 && yy === 0) || (yy % 4 === 0 && yy !== 0)) && ((month - 1) <= 1))) {
    //modulo aithmetic to find if leap year
    dayOfBirthIndex = (yearCode + mm + cc + dd - 1) % noOfDays;

  } else {
    //kawaida year
    dayOfBirthIndex = (dd + mm + cc + yy + Math.floor(yy / 4)) % noOfDays
  }


  return dayOfBirthIndex;


}
let validation = (d, m) => {
    if (d === "") {
      alert("Please add day of birth")
    } else if ((d <= 0) || (d > 31)) {
      alert("invalid day")

    }
    if (m === "") {
      alert("Please add Month Of Birth")
    } else if ((m <= 0) || (m > 12)) {
      alert("invalid month")

    }
  } // validation function

var submission = e => {
  e.preventDefault();

  let dayB = document.getElementById("day").value; //days value
  let monthB = document.getElementById("month").value; //months value
  let yearB = document.getElementById("year").value; //year value
  let birthIndex = dataCollection(dayB, monthB, yearB); //date of birth data collection function
  let output = document.getElementById("output");
  output.innerHTML = ""
  let form = document.getElementById("form");
  validation(dayB, monthB); //validation

  if (document.getElementById("male").checked) {
    output.innerHTML = `<strong> Hey Champ!</strong> Your Akan is  ${menIndex[birthIndex]}<br/> Your birthady was on ${weekDays[birthIndex]} ${dayB}-${allMonths[monthB-1]}-${yearB}`
  } else if (document.getElementById("female").checked) {
    output.innerHTML = `<strong>Hey you.!</strong> Your Akan Name is ${womenIndex[birthIndex]}<br/>Your birthady was on  ${weekDays[birthIndex]} ${dayB}-${allMonths[monthB-1]}-${yearB} `
  }
  form.reset(); //reset data on form after successful submission
}
document.getElementById("submit").addEventListener('click', submission); // submit button EventListener;
