<?php
include 'mongo.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    if (isset($_POST['email']) && isset($_POST['fname']) && isset($_POST['lname']) && isset($_POST['dob']) && isset($_POST['contactNumber']) && isset($_POST['address'])) {
        $firstName = $_POST['fname'];
        $lastName = $_POST['lname'];
        $dob = $_POST['dob'];
        $contactNumber = $_POST['contactNumber'];
        $address = $_POST['address'];
        $email = $_POST['email'];

        $userDocument = array(
            'email' => $email,
            'firstName' => $firstName,
            'lastName' => $lastName,
            'dob' => $dob,
            'contact_number' => $contactNumber,
            'address' => $address,
        );
        try {
            $userCollection->insertOne($userDocument);
            echo 'Success';
        } catch (Throwable $e) {
            echo "Failed";
        }
    }
}


if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    if ($_GET['email'] != null) {
        $email = $_GET['email'];
        $query = array(
            'email' => $email
        );

        try {
            $userData = $userCollection->findOne($query);
            echo json_encode($userData);
        } catch (Throwable $e) {
            echo "Failed";
        }


    }
}

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    parse_str(file_get_contents('php://input'), $_PUT);
    $email = $_PUT['email'];
    $fname = $_PUT['firstName'];
    $lname = $_PUT['lastName'];
    $dob = $_PUT['dob'];
    $phone = $_PUT['contactNumber'];
    $address = $_PUT['address'];

    $query = (['email' => $email]);

    try {
        $userCollection->findOneAndUpdate(
            $query,
            [
                '$set' => [
                    'firstName' => $fname,
                    'lastName' => $lname,
                    'dob' => $dob,
                    'contact_number' => $phone,
                    'address' => $address,
                ],
            ]
        );
        echo 'Success';
    } catch (\Throwable $th) {
        echo 'Updating failed';
    }


}

?>