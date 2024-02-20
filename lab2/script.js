//Завдання 1

function MinAndMax(numbers){
    let min = numbers[0];
    let max = numbers[0];

    for (let i = 0; i < numbers.length; i++){
        if (min > numbers[i]){
            min = numbers[i];
        }
        if (max < numbers[i]){
            max = numbers[i];
        }
    }

    return {min, max};
}

function ShowMinAndMax(){
    let input = document.getElementById("arrayInput").value;
    input = input.split(" ");

    let minAndMax = MinAndMax(input);

    let result = document.getElementById("result");
    result.innerHTML = "Мінімальний: " + minAndMax.min + " Максимальний: " + minAndMax.max;
}

function CompareCars() {
    let brand1 = document.getElementById("brand1").value;
    let brand2 = document.getElementById("brand2").value;

    let color1 = document.getElementById("color1").value;
    let color2 = document.getElementById("color2").value;

    let year1 = document.getElementById("year1").value;
    let year2 = document.getElementById("year2").value;

    const car1 = {brand: brand1, color: color1, year: year1};
    const car2 = {brand: brand2, color: color2, year: year2};

    let allInfo = '';

    if (car1.brand.toLowerCase() == car2.brand.toLowerCase()){
        allInfo += "Машина 1 і Машина 2 однакової марки - " + car1.brand + ". ";
    }
    else {
        allInfo += "Машини різних марок. ";
    }

    if(car1.color.toLowerCase() == car2.color.toLowerCase()){
        allInfo += "Машини однакового кольору - " + car1.color + ". ";
    }
    else {
        allInfo += "Машини різного кольору. ";
    }

    if (car1.year == '' && car2.year == ''){
            allInfo += "Рік не вказано!";
        }
    else if((car1.year < 2024 && car1.year > 1941) && (car2.year < 2024 && car2.year > 1941)){
        if (car1.year == car2.year){
            allInfo += "Машини одного року випуску. "
        }
        else if(car1.year > car2.year){
            allInfo += "Машина 2 випущена раніше.";
        }
        else if(car1.year < car2.year){
            allInfo += "Машина 1 випущена раніше.";
        }
    }
    else{
        allInfo += "Рік не коректний! (Вкажіть від 1941 до 2024)";
        }

    alert(allInfo);
}

//Завдання 2

function IsInRange(){
    let numInRange = document.getElementById("numberInRange").value;
    let firstNum = document.getElementById("firstNum").value;
    let secondNum = document.getElementById("secondNum").value;

    if (numInRange >= firstNum && numInRange <= secondNum){
        alert("Число " + numInRange + " знаходиться в діапазоні!");
    }
    else if(numInRange === ''){
        alert("Число не вказано!");
    }
    else{
        alert("Число " + numInRange + " не знаходиться в діапазоні!");
    }
}

function ChangeBool() {
    let change = prompt("Enter 'true' or 'false'")
    if(change === 'true' || change == 'false'){
        change = change === 'true';
        if (change){
            alert("True тепер " + !change);
        }
        else{
            alert("False тепер " + !change);
        }
    }
    else{
        alert("Введіть 'true' або 'false'");
    }
}

//Завдання 3

function MarkStudent(mark){
    if(mark == 2){
        alert("Незадовільно");
    }
    else if (mark == 3){
        alert("Задовільно");
    }
    else if(mark == 4){
        alert("Добре");
    }
    else if(mark == 5){
        alert("Відмінно");
    }
    else{
        alert("Некоректна оцінка!");
    }
}

function ShowMark(){
    let mar = document.getElementById("mark").value;
    MarkStudent(mar);
}

function FindSeason(month){
    switch (month) {
        case "Jan":
        case "Feb":
        case "Dec":
            alert("Winter");
            break;
        case "Mar":
        case "Apr":
        case "May":
            alert("Spring");
            break;
        case "Jun":
        case "Jul":
        case "Aug":
            alert("Summer");
            break;
        case "Sep":
        case "Oct":
        case "Nov":
            alert("Autumn");
            break;
        default:
            alert("GGGGGGG");
    }
}

function ShowSeason(){
    let month = document.getElementById("month");
    FindSeason(month.value);
}









