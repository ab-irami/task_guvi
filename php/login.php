<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    include 'sql.php';

    if (isset($_POST['email']) && isset($_POST['password'])) {
        $email = $_POST["email"];
        $password = $_POST["password"];
        $sql = $conn->prepare("SELECT * FROM users WHERE email = ?");
        $sql->bind_param("s", $email);
        $sql->execute();
        $result = $sql->get_result();

        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();
            if ($user['email'] === $email && password_verify($password, $user['password'])) {
                echo "Logged in!";
                exit();
            } else {
                echo 'Incorrect Password';
                exit();
            }
        } else {
            echo 'Unauthenticated User';
            exit();
        }

    }
}

?>