
<?php
$servername = "sql206.infinityfree.com";
$username = "if0_38973098";
$password = "G491E788212004";
$database = "if0_38973098_gymdb";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "Connected successfully!";
}
?>
