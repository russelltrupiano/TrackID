var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var validator = require('validator');



function ShuffleSongs(cycle) {
    var files = fs.readdirSync(path.join(__dirname, "/../public/tracks/cycle" + cycle))
                    .filter(function(file) {
                        return (file !== ".DS_Store" && file !== "README.md");
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

        console.log(songData);

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

    var numCycles = fs.readdirSync(path.join(__dirname, "/../public/tracks"))
                        .filter(function(file) {
                            return (file.indexOf("cycle") !== -1);
                        });;

    res.render('index', {
        numCycles: numCycles
    });
});


/* GET home page. */
router.get('/:cycle', function(req, res) {

    var cycle = req.params.cycle;

    console.log(cycle);

    if (!validator.isInt(cycle)) {
        console.log("Bad param");
        var numCycles = fs.readdirSync(path.join(__dirname, "/../public/tracks")).length;
        if (cycle == 0 || cycle > numCycles) {
            res.render('error');
        }
    }

    var arrayData = ShuffleSongs(cycle);

    console.log(arrayData.trackData);

    res.render('tracks', {
        title: 'TrackID',
        cycle: cycle,
        files: arrayData.files,
        indicies: arrayData.indicies,
        trackData: arrayData.trackData
    });
});

module.exports = router;
