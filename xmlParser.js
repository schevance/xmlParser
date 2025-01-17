const fs = require('fs');
const xml2js = require('xml2js');

/**
 * Recursively removes specified tags and their contents from a JavaScript object.
 * @param {object} obj - The JavaScript object representing the parsed XML.
 * @param {string} tagName - The name of the tag to remove recursively.
 */
function removeTags(obj, tagName) {
    if (typeof obj === 'object') {
        // Remove specified tags
        if (obj[tagName]) {
            delete obj[tagName];
        }
        // Recursively process child nodes
        for (let key in obj) {
            if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
                removeTags(obj[key], tagName);
            }
        }
    }
}

/**
 * Recursively replaces specified text content within a JavaScript object.
 * @param {string|object} obj - The current node in the XML object tree.
 * @param {string} searchValue - The text to search for and replace.
 * @param {string} replaceValue - The text to replace with.
 * @returns {string|object} The modified node with text replaced.
 */
function replaceText(obj, searchValue, replaceValue) {
    if (typeof obj === 'string') {
        // Replace text if found
        if (obj.includes(searchValue)) {
            obj = obj.replace(new RegExp(searchValue, 'g'), replaceValue);
        }
        return obj;
    } else if (typeof obj === 'object') {
        // Recursively process child nodes
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                obj[key] = replaceText(obj[key], searchValue, replaceValue);
            }
        }
        return obj;
    } else {
        return obj;
    }
}

// Get command line arguments for text replacement
const searchValue = process.argv[2];
const replaceValue = process.argv[3];

// Validate command line arguments
if (!searchValue || !replaceValue) {
    console.error('Usage: node parse-xml.js <searchValue> <replaceValue>');
    process.exit(1);
}

// Read XML file
fs.readFile('sitemap.xml', 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Parse XML to JavaScript object
    xml2js.parseString(data, (parseErr, result) => {
        if (parseErr) {
            console.error('Error parsing XML:', parseErr);
            return;
        }

        // Replace specified text in XML content
        result = replaceText(result, searchValue, replaceValue);

        // Remove <image:image> tags and their contents generated by @Magento
        removeTags(result, 'image:image');

        // Remove <PageMap> tags and their contents generated by @Magento
        removeTags(result, 'PageMap');

        // Convert modified object back to XML
        const builder = new xml2js.Builder();
        const xml = builder.buildObject(result);

        // Write modified XML to file
        fs.writeFile('output.xml', xml, (writeErr) => {
            if (writeErr) {
                console.error('Error writing file:', writeErr);
                return;
            }
            console.log('Sitemap cleaning process complete. Modified XML saved as output.xml.');
        });
    });
});
