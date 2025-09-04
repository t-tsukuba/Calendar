<?php
header('Content-Type: application/json');
$file = 'reservations.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($file)) {
        echo file_get_contents($file);
    } else {
        echo '[]';
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    file_put_contents($file, $json);
    echo '{"status":"ok"}';
}
