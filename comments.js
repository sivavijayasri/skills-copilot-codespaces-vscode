// Create web server and listen on port 3000
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

// Serve static files from public directory
app.use(express.static('public'));

// Return all comments
app.get('/comments', function(req, res) {
    // Read comments from file
    fs.readFile('comments.json', 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send('Cannot read comments file.');
        } else {
            // Send comments back to client
            res.send(JSON.parse(data));
        }
    });
});

// Add a new comment
app.post('/comments', function(req, res) {
    // Read comments from file
    fs.readFile('comments.json', 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send('Cannot read comments file.');
        } else {
            // Parse comments into JSON object
            var comments = JSON.parse(data);
            // Add new comment to comments object
            comments.push(req.query);
            // Write comments back to file
            fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Cannot write comments file.');
                } else {
                    // Send success response
                    res.send('Success');
                }
            });
        }
    });
});

// Start web server
app.listen(3000, function() {
    console.log('Server listening on port 3000...');
});
