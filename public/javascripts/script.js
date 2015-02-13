var songLocations = {};
var mode = 0;

$(document).ready(function() {

    $("[id^='song_']").on('error', function() {
        alert("Error");
    });

    var playSong = function(id) {

        var song = document.getElementById('song_' + id);

        console.log("Playing song in mode " + mode);

        if (mode === 0) {

            TrackToSample($("#song_" + id));

        } else {
            song.currentTime = 0;
        }

        song.play();
        $("#play-sample_" + id).addClass('hidden');
        $("#stop-sample_" + id).removeClass('hidden');
    }

    $("[id^='play-sample_']").click(function() {

        killEverything();

        var id = $(this).attr('id').split('play-sample_')[1];

        var song = $("#song_" + id + " source");

        if (song.src === undefined) {

            song.attr('src', song.attr('data-original'));
            $("#song_" + id)[0].load();

            $("#play-sample_" + id).addClass('hidden');
            $("#loading-sample_" + id).removeClass('hidden');

            $("#song_" + id).on('loadedmetadata', function() {
                $("#play-sample_" + id).removeClass('hidden');
                $("#loading-sample_" + id).addClass('hidden');
                playSong(id);
            });

        } else {
            playSong(id);
        }
    });

    var killEverything = function() {
        var songs = $("[id^='song_'");

        for (var i = 0; i < songs.length; i++) {
            var song = $("#song_" + i)[0];
            if (!song.paused) {
                song.pause();
                $("#play-sample_" + i).removeClass('hidden');
                $("#stop-sample_" + i).addClass('hidden');
            }
        }
    }

    $("span.onoffswitch-inner, span.onoffswitch-switch").click(function() {

        killEverything();

        if (mode === 0) {
            mode = 1;
            $(".play-wrapper p").html("Play Full Track");
        } else {
            mode = 0;
            $(".play-wrapper p").html("Play Sample");
        }
    });

    $("[id^='stop-sample_'").click(function() {
        var id = $(this).attr('id').split('stop-sample_')[1];

        var song = document.getElementById('song_' + id);
        song.pause();

        $("#play-sample_" + id).removeClass('hidden');
        $("#stop-sample_" + id).addClass('hidden');
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

        console.log("INITIAL: Tracking to " + trackPoint + " " + context.attr("id"));

        song.currentTime = trackPoint;

    } else if (song.currentTime != songLocations[id]){

        console.log("REPLAY: Tracking to " + songLocations[id] + " " + context.attr("id"));

        song.currentTime = songLocations[id];
    }

    var killTime = song.currentTime + 20;
    var songId = id.split('song_')[1];

    song.addEventListener('timeupdate', function() {
        // Time up and in quiz mode
        if (song.currentTime > killTime && mode == 0) {
            song.pause();
            $("#play-sample_" + songId).removeClass('hidden');
            $("#stop-sample_" + songId).addClass('hidden');
        }
    }, false);

}