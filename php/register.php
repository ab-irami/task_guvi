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
        $num = $result->num_rows;
        if ($num == 0) {
            $hash = password_hash($password, PASSWORD_DEFAULT);

            $sql = $conn->prepare("INSERT INTO users (email, password) VALUES (?,?)");
            $sql->bind_param("ss", $email, $hash);

            $sql->execute();
            echo 'Registration success';
            $sql->close();
            $conn->close();

        }

        if ($num > 0) {
            echo 'User exists already';
        }

    }

}

?>