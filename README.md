# XML Parser and Modifier Script

This Node.js script parses an XML file, performs text replacement, and removes specified tags and their contents. It utilizes the `xml2js` library for XML parsing and building.

## Features

- **Text Replacement**: Replace specific text content throughout the XML file.
- **Tag Removal**: Remove `<image:image>` and `<PageMap>` tags and their contents from the XML.
- **Command-Line Usage**: Accepts command-line arguments for specifying text to replace.

## Prerequisites

- Node.js installed on your machine ([download here](https://nodejs.org/)).
- npm (Node Package Manager) for installing dependencies.

## Installation

1. Clone the repository or download the script file (`parse-xml.js`).

2. Install dependencies using npm:

   ```bash
   npm install xml2js

## Usage 

1. Command Line:

    Navigate to the directory containing parse-xml.js and run the script using Node.js:

    ```bash
    node parse-xml.js <searchValue> <replaceValue>

Replace <searchValue> with the text you want to replace, and <replaceValue> with the replacement text.

Example:

    ```bash
    node parse-xml.js @Magento @NewText



