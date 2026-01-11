<?php
/*
    FILE         : server.php
    PROJECT      : A5_textEditor
    PROGRAMMER   : Josiah Williams
    FIRST VERSION: 2025-12-6
    DESCRIPTION  : This is where the program will get the data in json and decode and encode the file name, contents and update
                 : any files and endcode a message back. Also will save the contents from the text editor to the files in the dir. 
    References:
    1. https://www.w3schools.com/js/js_json_php.asp
    2. https://www.w3schools.com/php/php_json.asp
    3. https://www.geeksforgeeks.org/php/what-is-stdclass-in-php/
    4. https://www.w3schools.com/php/func_directory_scandir.asp
    5. https://www.w3schools.com/php/func_filesystem_file_put_contents.asp 
    6. https://www.w3schools.com/php/func_filesystem_file_get_contents.asp 
    7. https://www.php.net/manual/en/wrappers.php.php 

*/

$input = json_decode(file_get_contents("php://input"), true);  //Get JSON information
$action = $input["action"]; // What action the client need to be handled list files, load files, save and save as

$dir = "MyFiles/"; // Path for my dirctory 


//List the Files
if ($action === "listFiles") {

    $files = array();

    foreach (scandir($dir) as $file) { //Get Files
        if ($file !== "." && $file !== "..") {
            $files[] = $file;
        }
    }

    $response = new stdClass(); //Create class to store json
    $response->files = $files;

    echo json_encode($response); //Send response in json format
    exit;
}


// Load the files
else if ($action === "loadFile") {

    $fileName = $input["fileName"]; //Get File name
    $path = $dir . $fileName; //Get path

    $response = new stdClass();  //Create class to store json

    if (file_exists($path)) {
        $response->content = file_get_contents($path);
    } else {
        $response->error = "File does not exist.";
    }

    echo json_encode($response); //Send response in json format
    exit;
}


//Save the files
else if ($action === "saveFile") {

    $fileName = $input["fileName"]; //Get File name
    $content = $input["content"]; //Get content
    $path = $dir . $fileName; //Get path

    file_put_contents($path, $content);

    $response = new stdClass(); //Create class to store json
    $response->status = "success";
    $response->message = "File saved.";

    echo json_encode($response); //Send response in json format
    exit;
}


//Save as files
else if ($action === "saveAsFile") {

    
    $newName = $input["newFileName"]; //Get File name
    $content = $input["content"]; //Get content
    $path = $dir . $newName; //Get path

    file_put_contents($path, $content);

    $response = new stdClass(); //Create class to store json
    $response->status = "success";
    $response->message = "File saved as new file.";

    echo json_encode($response); //Send response
    exit;
}

?>
