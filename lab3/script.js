function task1() {
    let i = 1;
    let sum = 0;
    while (i <= 50){
        sum+= i;
        i++;
    }
    return sum;
}

/*console.log("Завдання 1")
console.log(task1());
*/

function task2() {
    let input = prompt("Введіть число для обчислення факторіалу")
    let factorial = 1;
    for (let i = 1; i <= input; i++){
        factorial *= i;
    }
    return factorial;
}

/*
console.log("Завдання 2");
console.log(task2());
*/

function task3(){
    let numberOfMonth = prompt("Введіть номер місяця");

    switch (numberOfMonth) {
        case "1":
            console.log("Січень")
            break;
        case '2':
            console.log("Лютий")
            break;
        case '3':
            console.log("Березень")
            break;
        case '4':
            console.log("Квітень")
            break;
        case '5':
            console.log("Травень")
            break;
        case '6':
            console.log("Червень")
            break;
        case '7':
            console.log("Липень")
            break;
        case '8':
            console.log("Серпень")
            break;
        case '9':
            console.log("Вересень")
            break;
        case '10':
            console.log("Жовтень")
            break;
        case '11':
            console.log("Листопад")
            break;
        case '12':
            console.log("Грудень")
            break;
        default:
            console.log("Число має бути від 1 до 12")
    }
}

/*
console.log("Завдання 3");
task3();
*/

function task4(arr){
    let sum = 0;
    for (let i = 0; i < arr.length; i++){
        if(arr[i] % 2 == 0){
            let arrI = parseInt(arr[i]);
            sum += arrI;
        }
    }

    return sum;
}

/*
let input = prompt("Введіть масив через пробіл");
input = input.split(" ");

console.log("Завдання 4");
console.log(task4(input));
*/

let func = (text) => {
    let letters = "аеєиіїоуюяАЕЄИІЇОУЮЯ";
    let counter = 0;

    for(let letter of text){
        if(letters.includes(letter)){
            counter++;
        }
    }

    return counter;
};

/*
console.log("Завдання 5");
let text = prompt("Введіть слово");
console.log(func(text));
 */

let pow = (base, exponent) => base ** exponent;

function ChooseTask(number){
    switch (number){
        case "1":
            console.log("Завдання 1")
            console.log(task1());
            break;
        case "2":
            console.log("Завдання 2");
            console.log(task2());
            break;
        case "3":
            console.log("Завдання 3");
            task3();
            break;
        case "4":
            let input = prompt("Введіть масив через пробіл");
            input = input.split(" ");

            console.log("Завдання 4");
            console.log(task4(input));
            break;
        case "5":
            console.log("Завдання 5");
            let text = prompt("Введіть слово");
            console.log(func(text));
            break;
        case "6":
            console.log("Завдання 6")
            let base = prompt("Введіть число яке потрібно піднести до степені");
            let exponent = prompt("Введіть степінь");
            console.log(pow(base, exponent));
        default:
            console.log("Вкажіть завдання від 1 до 6!")
            break;
    }
}

let numberOfTask = prompt("Вкажіть номер завдання!")
ChooseTask(numberOfTask);
