<?php
$servername = "localhost";
$username = "ваш_ім'я_користувача";
$password = "ваш_пароль";
$dbname = "ваша_база_даних";

// Підключення до бази даних
$conn = new mysqli($servername, $username, $password, $dbname);

// Перевірка з'єднання
if ($conn->connect_error) {
    die("Помилка з'єднання з базою даних: " . $conn->connect_error);
}

// Отримання даних з форми
$transaction_type = $_POST['transaction_type'];
$date = $_POST['date'];
$amount = $_POST['amount'];
$department = $_POST['department'];

// SQL-запит для вставки даних
$sql = "INSERT INTO transactions (transaction_type, date, amount, department)
        VALUES ('$transaction_type', '$date', '$amount', '$department')";

if ($conn->query($sql) === TRUE) {
    echo "Нова транзакція успішно додана";
} else {
    echo "Помилка: " . $sql . "<br>" . $conn->error;
}

// Закриття з'єднання
$conn->close();
?>
