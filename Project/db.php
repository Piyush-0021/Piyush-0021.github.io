<?php
// Detect if you're in a local environment or on InfinityFree hosting
if ($_SERVER['SERVER_NAME'] == "localhost") {
    // Local development environment
    // $servername = "127.0.0.1";
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "gymdb";
} else {
    // InfinityFree hosting environment
    $servername = "sql206.infinityfree.com";
    $username = "if0_38973098";
    $password = "G491E788212004";
    $database = "if0_38973098_gymdb";
}

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
