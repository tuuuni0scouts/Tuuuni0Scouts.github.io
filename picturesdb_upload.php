<?php
if (isset($_POST['submit'])) {
$file = $_FILES['file'];
$fileName = $_FILES['file']['name'];
$fileTmpName = $_FILES['file']['tmp_name'];
$fileSize = $_FILES['file']['size'];
$fileError = $_FILES['file']['error'];
$fileType = $_FILES['file']['type'];


$fileExt = explode('.', $filename);
$fileActualExt = strtolower(end($fileExt));

$allowed = array('jpg'WebseiteSuccses"
    } else {
        echo "Error whit uploading your image"
    }
} else {
    echo "You cannot upload files of this type!"
}
}
