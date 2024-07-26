<?php
session_start();
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['phone'])) {
        $name = htmlspecialchars(trim($_POST['name']));
        $email = htmlspecialchars(trim($_POST['email']));
        $phone = htmlspecialchars(trim($_POST['phone']));

        $data = "Имя: $name, Email: $email, Телефон: $phone\n";

        $file = 'applications.txt';
        $sessionData = [
            'name' => $name,
            'email' => $email,
            'phone' => $phone
        ];

        if (file_put_contents($file, $data, FILE_APPEND)) {
            $_SESSION['applications'][] = $sessionData;
            echo json_encode(['status' => 'success', 'message' => 'Заявка успешно отправлена!']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Ошибка при записи данных в файл.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Недостаточно данных для обработки заявки.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Неправильный метод запроса.']);
}