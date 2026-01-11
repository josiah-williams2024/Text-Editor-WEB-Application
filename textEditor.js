/*
    FILE         : textEditor.js
    PROJECT      : A5_textEditor
    PROGRAMMER   : Josiah Williams
    FIRST VERSION: 2025-12-6
    DESCRIPTION  : The javescript logic need for my text editor

    References   :   1. https://www.w3schools.com/jquery/jquery_selectors.asp
                     2. https://www.w3schools.com/jquery/jquery_events.asp
                     3. https://www.w3schools.com/jquery/jquery_dom_get.asp
                     4. https://www.w3schools.com/jquery/jquery_dom_set.asp
                     5. https://www.w3schools.com/jquery/jquery_ajax_get_post.asp
                     6. https://www.w3schools.com/jquery/jquery_ref_ajax.asp
                     7. https://www.w3schools.com/js/js_json.asp
*/

// Load list of files when page loads
// Run this when the page finishes loading
$(document).ready(pageReady);

/*========================================================== 
    Function    : pageReady()
    Description : When the page loads it gets the files for the dropdown and attach click events to the buttons
    Parameters  : None
    Returns     : None
===========================================================*/

function pageReady() 
{
    loadFileList(); // Load dropdown list of files

    // Attach button events 
    $("#openButton").click(openFile);
    $("#saveButton").click(saveFile);
    $("#saveAsButton").click(saveAsFile);
}

/*========================================================== 
    Function    : loadFileList()
    Description : Send the server a request to list all files in server dirctory, on success call fileListLoaded
    Parameters  : None
    Returns     : None
===========================================================*/

function loadFileList() 
{
    $.ajax({
        url: "server.php",
        method: "POST",
        data: JSON.stringify({ action: "listFiles" }),
        contentType: "application/json",
        dataType: "json",
        success: fileListLoaded
    });
}

/*========================================================== 
    Function    : fileListLoaded()
    Description : Loads the filenames from the server 
    Parameters  : Response from the server
    Returns     : None
===========================================================*/

function fileListLoaded(response) 
{
    var dropdown = $("#listOfFiles");
    dropdown.empty();
    dropdown.append("<option value=''>-- Choose a file --</option>");

    // Call a named function for each file
    response.files.forEach(addFileOption);
}

/*========================================================== 
    Function    : addFileOption()
    Description : Appends the file from the server using jquery to the dropdown box
    Parameters  : Response from the server
    Returns     : None
===========================================================*/

function addFileOption(file)
{
    // Access the dropdown directly each time (simple + safe)
    var dropdown = $("#listOfFiles");
    dropdown.append("<option value='" + file + "'>" + file + "</option>");
}
/*========================================================== 
    Function    : openFile()
    Description : Uses the jquery ajax function to send a reqesut to read the data from the file on the server, 
                : on success get call the file load function
    Parameters  : None
    Returns     : None
===========================================================*/

function openFile() 
{
    var fileName = $("#listOfFiles").val();

    if (fileName === "") {
        alert("Please select a file.");
        return;
    }

    $.ajax({
        url: "server.php",
        method: "POST",
        data: JSON.stringify({
            action: "loadFile",
            fileName: fileName
        }),
        contentType: "application/json",
         dataType: "json",
        success: fileLoaded
    });
}

/*========================================================== 
    Function    : fileLoaded()
    Description : Loads the server response contents and uses jquery to updated text area
    Parameters  : Response from the server
    Returns     : None
===========================================================*/

function fileLoaded(response) 
{
    $("#editorSpace").val(response.content);
}

/*========================================================== 
    Function    : saveFile()
    Description : Uses the jquery ajax function to send a request to save a file to the server
    Parameters  : None
    Returns     : None
===========================================================*/

function saveFile() 
{
    var fileName = $("#listOfFiles").val();
    var content = $("#editorSpace").val();

    if (fileName === "") {
        alert("Select a file first.");
        return;
    }

    $.ajax({
        url: "server.php",
        method: "POST",
        data: JSON.stringify({
            action: "saveFile",
            fileName: fileName,
            content: content
        }),
        contentType: "application/json",
         dataType: "json",
        success: fileSaved
    });
}

/*========================================================== 
    Function    : fileSaved()
    Description : Uses the alert function to give a user the alert that the file is saved
    Parameters  : Response from the server
    Returns     : None
===========================================================*/

function fileSaved(response) {
    if (response.error) {
        alert("Error saving file: " + response.error);
        return;
    }

    alert("File saved successfully!");
}


/*========================================================== 
    Function    : saveAsFile()
    Description : Uses the jquery ajax function to send a request the save a file to the server with a user inputted name
    Parameters  : None
    Returns     : None
===========================================================*/

function saveAsFile() 
{
    var newName = prompt("Enter a new filename:");

    if (!newName) { // user canceled or didnt enter anything
        return; 
    }

    var content = $("#editorSpace").val();

    $.ajax({
        url: "server.php",
        method: "POST",
        data: JSON.stringify({
            action: "saveAsFile",
            newFileName: newName,
            content: content
        }),
        contentType: "application/json",
         dataType: "json",
        success: fileSavedAs
    });
}

/*========================================================== 
    Function    : fileSavedAs()
    Description : Uses the alert function to give a user the alert that the file is saved with user inputted name, reload the list from 
                : selectable files for the user to choice
    Parameters  : Response from the server
    Returns     : None
===========================================================*/

function fileSavedAs(response) {
     if (response.error) {
        alert("Error saving file: " + response.error);
        return;
    }
    alert("File saved as a new file!");
    loadFileList(); // refresh drop-down to add new files to me list
}
