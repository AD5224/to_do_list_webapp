<?php
$servername = "localhost";
$username = "root";
$password = ""; // Default password is empty
$dbname = "todo_list"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
