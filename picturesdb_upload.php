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

$allowed = array('jpg', 'jpeg', 'png', 'TIFF');

if (in_array($fileActualExt, $allowed)) {
    if ($fileError === 0) {
     
       $fileNameNew = uniqid('', true). ".".$fileActualExt ;
       $fileDestination = 'picturesdb/'.$fileNameNew;
        move_uploaded_file($fileTmpName, $fileDestination);
        header("Location: bilder_upload.html")
        echo "Upload Succses"
    } else {
        echo "Error whit uploading your image"
    }
} else {
    echo "You cannot upload files of this type!"
}
}
