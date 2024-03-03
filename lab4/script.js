function task1() {
    let fruits = ["grapes", "pear", "kiwi", "apple", "melon", "plum"];
    console.log(fruits);

    fruits.pop();
    console.log(fruits);

    fruits.unshift("pineapple");
    console.log(fruits);

    fruits.sort( (a, b) => b.localeCompare(a))
    console.log(fruits);

    console.log(fruits.indexOf("apple"));
}

function task2() {
    let colors = ["grey", "purple", "red", "pink", "blue", "blue"];
    console.log(colors);

    let longest = colors.reduce( (a,b) => a.length > b.length ? a : b);
    let shortest = colors.reduce( (a,b) => a.length < b.length ? a : b);
    console.log("Longest element: " + longest);
    console.log("Longest element: " + shortest);

    colors = colors.filter(item => item === "blue");
    console.log(colors.join(", "));
}

function task3() {
    let employees = [
        {name: "Dima", age: 35, position: "developer"},
        {name: "Diana", age: 18, position: "product manager"},
        {name: "Ivan", age: 20, position: "developer"},
        {name: "Denis", age: 19, position: "intern"},
        {name: "Alex", age: 21, position: "CEO"},
    ];

    employees.sort((a, b) => a.name.localeCompare(b.name));
    console.log(employees);

    let developers = employees.filter(item => item.position === "developer");
    console.log(developers);

    employees = employees.filter(item => item.age !== 35);
    console.log(employees);

    let newEmployee = {name: "Victor", age: 17, position: "developer"};
    employees.push(newEmployee);
    console.log(employees);
}

function task4() {
    let students = [
        {name: "Yana", age: 18, course: 1},
        {name: "Alex", age: 19, course: 2},
        {name: "Alexandr", age: 20, course: 3},
        {name: "Vasyl", age: 20, course: 3},
        {name: "Mary", age: 19, course: 2},
    ];
    console.log(students);

    students = students.filter(student => student.name !== "Alex");
    console.log(students);

    let newStudent = {name: "Sam", age: 20, course: 3};
    students.push(newStudent);
    console.log(students);

    students.sort((a, b) => b.age - a.age);
    console.log(students);

    let thirdCourse = students.filter(student => student.course === 3);
    console.log(thirdCourse);
}

function task5() {
    let numbers = [1, 2, 3, 4, 6, 8, 12];
    console.log(numbers);

    let numbersS = numbers.map(number => number ** 2);
    console.log(numbersS);

    let evenNumbers = numbersS.filter(number => number % 2 === 0);
    console.log(evenNumbers);

    let sum = numbersS.reduce((sum, item) => sum + item, 0);
    console.log("Sum is " + sum);

    let newNumbers = [5, 6, 7, 9, 10];
    numbers.push(...newNumbers);
    console.log(numbers);

    console.log(numbers.slice(3));
}

function libraryManagement() {
    let books = [
        {title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", genre: "fantasy", pages: 320, isAvailable: true},
        {title: "Harry Potter and the Chamber of Secrets", author: "J.K. Rowling", genre: "fantasy", pages: 251, isAvailable: true},
        {title: "The Lord of the Rings", author: "J.R.R. Tolkien", genre: "fantasy", pages: 1178, isAvailable: true},
        {title: "To Kill a Mockingbird", author: "Harper Lee", genre: "fiction", pages: 281, isAvailable: true},
        {title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "fiction", pages: 180, isAvailable: true},
        {title: "1984", author: "George Orwell", genre: "dystopian fiction", pages: 328, isAvailable: true},
        {title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "fiction", pages: 277, isAvailable: true},
        {title: "Pride and Prejudice", author: "Jane Austen", genre: "classic literature", pages: 279, isAvailable: true}
    ];

    function addBook(title, author, genre, pages, isAvailable = true) {
        return {title: title, author: author, genre: genre, pages, isAvailable: isAvailable};
    }

    function removeBook(title){
        books = books.filter(book => book.title !== title);
    }

    function findBooksByAuthor(author) {
        let booksByAuthor = books.filter(book => book.author === author);
        return booksByAuthor;
    }

    function toggleBookAvailability(title, isBorrowed) {
        books = books.map(book => {
            if (book.title === title) {
                return { ...book, isAvailable: !isBorrowed };
            }
            return book;
        });
    }

    function sortBooksByPages() {
        return books.sort((a, b) => a.pages - b.pages);
    }

    function getBooksStatistics() {
        let countBooks = books.length;

        let availableBooks = books.filter(book => book.isAvailable === true);
        let countAvailableBooks = availableBooks.length;

        let countBorrowedBooks = countBooks - countAvailableBooks;

        let sumAllPages = books.reduce((sum, current) => sum + current.pages, 0);
        let averagePages = sumAllPages / countBooks;

        return "Загальна кількість книг: " + countBooks + ", кількість доступних книг: " +
            countAvailableBooks + ", кількість взятих книг: " + countBorrowedBooks +
            ", середня кількість сторінок у книзі: " + averagePages + ".";
    }


    return { addBook,
        removeBook,
        findBooksByAuthor,
        toggleBookAvailability,
        sortBooksByPages,
        getBooksStatistics
    };
}

function task7(){
    let student = {
        name: "Victor",
        age: 19,
        course: 3
    };
    console.log(student);

    student.subjects = ["Web develop,", "Operating Systems,", "English"];
    console.log(student);

    delete student.age;
    console.log(student);
}

let task = prompt("Вкажіть номер завдання (1-7)");
switch (task){
    case '1':
        console.log("Завдання 1");
        task1();
        break;
    case '2':
        console.log("Завдання 2");
        task2();
        break;
    case '3':
        console.log("Завдання 3");
        task3();
        break;
    case '4':
        console.log("Завдання 4");
        task4();
        break;
    case '5':
        console.log("Завдання 5");
        task5();
        break;
    case '6':
        console.log("Завдання 6");
        libraryManagement();
        break;
    case '7':
        console.log("Завдання 7");
        task7();
        break;
    default:
        console.log("Такого задвання не існує!")
}

/*
console.log("Завдання 1");
task1();

console.log("Завдання 2");
task2();

console.log("Завдання 3");
task3();

console.log("Завдання 4");
task4();

console.log("Завдання 5");
task5();

console.log("Завдання 6");
libraryManagement();

console.log("Завдання 7");
task7();
 */