var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');



function ShuffleSongs() {
    var files = fs.readdirSync(path.join(__dirname, "/../public/tracks"))
                    .filter(function(file) {
                        return file !== ".DS_Store";
                    });

    var indicies = [];

    for (var i = 0; i < files.length; i++) {
        indicies[i] = i;
    };

    indicies.sort(function() {
        return .5 - Math.random();
    });

    var trackData = [];

    for (var i = 0; i < indicies.length; i++) {
        var songData = files[indicies[i]].split(" - ");
        songData[1] = songData[1].split('.')[0];
        trackData[i] = songData;
    };

    return {
        indicies: indicies,
        files: files,
        trackData: trackData
    }
}

/* GET home page. */
router.get('/', function(req, res) {

    var arrayData = ShuffleSongs();

    console.log(arrayData.trackData);

    res.render('index', {
        title: 'Express',
        files: arrayData.files,
        indicies: arrayData.indicies,
        trackData: arrayData.trackData
    });
});

module.exports = router;
