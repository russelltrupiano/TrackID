var songLocations = {};

$(document).ready(function() {

    $("[id^='song_']").on('loadedmetadata', function() {
        console.log($(this).attr("id"));
        TrackToSample($(this));
    });

    $("[id^='play-sample_'").click(function() {
        var id = $(this).attr('id').split('play-sample_')[1];

        var song = document.getElementById('song_' + id);
        TrackToSample($("#song_" + id));
        song.play();

        setInterval(function() {
            song.pause();
        }, 20000);
    });

    $("[id^='show-button_'").click(function() {
        var id = $(this).attr('id').split('show-button_')[1];

        $("#correct_" + id).addClass("hidden");
        $("#incorrect_" + id).addClass("hidden");

        $("#answer_" + id).removeClass("hidden");
    });

    $("[id^='submit-button_'").click(function() {

        var id = $(this).attr('id').split('submit-button_')[1];

        $("#correct_" + id).addClass("hidden");
        $("#incorrect_" + id).addClass("hidden");
        $("#answer_" + id).addClass("hidden");

        var trackInfo = $("#answer_" + id).html().split(", by ");
        var track = trackInfo[0].toLowerCase();
        var composer = trackInfo[1].toLowerCase();

        var userTrack = $(".userTrack_" + id).val().toLowerCase();
        var userComposer = $(".userComposer_" + id).val().toLowerCase();

        if (track === userTrack && composer === userComposer) {
            $("#correct_" + id).removeClass("hidden");
        } else {
            $("#incorrect_" + id).removeClass("hidden");
        }

    });
});

function GetRandomInt(min, max) {
    var num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

function TrackToSample(context) {

    var id = context.attr("id");

    var song = document.getElementById(id);

    var duration = Math.floor(song.duration);

    var trackPoint = GetRandomInt(0, duration - 20);

    // First time
    if (songLocations[id] === undefined) {

        songLocations[id] = trackPoint;

        console.log("INITIAL: Tracking to " + trackPoint + context.attr("id"));

        song.currentTime = trackPoint;

    } else if (song.currentTime != songLocations[id]){

        console.log("REPLAY: Tracking to " + songLocations[id] + context.attr("id"));

        song.currentTime = songLocations[id];
    }


}