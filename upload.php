<?php
// Count total files
$countfiles = count($_FILES['files']['name']);

if (!file_exists('uploads/')) {
    mkdir('uploads/', 0777, true);
}

// Upload directory
$upload_location = "uploads/";

// To store uploaded files path
$files_arr = array();

// Loop all files
for($index = 0;$index < $countfiles;$index++){

    if(isset($_FILES['files']['name'][$index]) && $_FILES['files']['name'][$index] != ''){
        // File name
        $filename = $_FILES['files']['name'][$index];
        $trimmedFilename = preg_replace('/\s+/', '', $filename);

        // Get extension
        $ext = strtolower(pathinfo($trimmedFilename, PATHINFO_EXTENSION));

        // Valid image extension
        $valid_ext = array("png","jpeg","jpg");

        // Check extension
        if(in_array($ext, $valid_ext)){

            // File path
            $path = $upload_location.$trimmedFilename;

            // Upload file
            if(move_uploaded_file($_FILES['files']['tmp_name'][$index],$path)){
                $files_arr[] = str_replace("\\",'/',"http://".$_SERVER['HTTP_HOST'].substr(getcwd(),strlen($_SERVER['DOCUMENT_ROOT']))).'/'.$path;
            }
        }
    }
}

echo json_encode($files_arr);
die;
