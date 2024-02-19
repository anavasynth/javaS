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
    if(change === 'true' || change === 'false'){

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









