# Text Editor Web Application

A web-based text editor built with PHP, JavaScript, jQuery, AJAX, HTML, and CSS. The application allows users to create, open, edit, and save text files directly through their browser.

## Overview

This project was developed as part of a web development assignment to demonstrate client-server communication using AJAX and JSON. The application provides a simple text editor interface that interacts with files stored on the server without requiring page refreshes.

## Features

* View available files stored on the server
* Open and load file contents into the editor
* Edit file contents directly in the browser
* Save changes to an existing file
* Save content as a new file
* AJAX-based communication with the server
* JSON request and response handling
* Dynamic file list updates

## Technologies Used

### Front End

* HTML5
* CSS3
* JavaScript
* jQuery
* AJAX

### Back End

* PHP

## Project Structure

```text
A5_textEditor/
│
├── startPage.html      # Main user interface
├── textEditor.js       # Client-side logic and AJAX requests
├── server.php          # Server-side file handling
├── style.css           # Application styling
│
└── MyFiles/            # Directory containing editable text files
```

## How It Works

### File Listing

When the page loads:

1. JavaScript sends an AJAX request to `server.php`
2. The server scans the `MyFiles` directory
3. A JSON response containing all filenames is returned
4. The dropdown list is populated dynamically

### Opening Files

1. User selects a file from the dropdown
2. JavaScript sends a `loadFile` request
3. PHP reads the file contents
4. The contents are returned as JSON
5. The editor displays the file contents

### Saving Files

1. User edits text in the editor
2. User clicks **Save**
3. JavaScript sends the updated content to the server
4. PHP writes the contents to the selected file
5. A success message is returned

### Save As

1. User clicks **Save As**
2. User enters a new filename
3. JavaScript sends the filename and content to the server
4. PHP creates a new file
5. The file list refreshes automatically

## JSON Actions

The server supports the following actions:

| Action     | Description                                |
| ---------- | ------------------------------------------ |
| listFiles  | Returns all files in the MyFiles directory |
| loadFile   | Loads the contents of a selected file      |
| saveFile   | Saves content to an existing file          |
| saveAsFile | Creates a new file and saves content       |

## Installation

### Prerequisites

* PHP installed
* Web server (Apache, XAMPP, WAMP, MAMP, etc.)
* Modern web browser

### Setup

1. Clone the repository:

```bash
git clone https://github.com/josiah-williams2024/Text-Editor-WEB-Application.git
```

2. Place the project in your web server directory.

3. Ensure a folder named `MyFiles` exists in the project root.

4. Start your web server.

5. Open:

```text
http://localhost/Text-Editor-WEB-Application/startPage.html
```

## Learning Outcomes

This project demonstrates:

* AJAX communication between client and server
* JSON encoding and decoding
* PHP file system operations
* Dynamic DOM manipulation with jQuery
* Event-driven JavaScript programming
* Separation of front-end and back-end responsibilities

## Future Improvements

* File deletion support
* File renaming functionality
* Syntax highlighting
* Search and replace
* User authentication
* File type validation
* Improved error handling
* Responsive mobile design

## Author

Josiah Williams

Software Engineering Technology Student

GitHub: https://github.com/josiah-williams2024

## License

This project was created for educational purposes.
