var key = "MmFmNmNiYzEtZTkzOS00ODZjLTg2ZmMtZTVlNTk3MGE3ZDAw";
var trackLoadLimit = 24;

angular.module('app', [])
    .controller('mainCtrl', mainCtrl)
    .config(function($sceDelegateProvider) {$sceDelegateProvider.resourceUrlWhitelist(['**']);});

function mainCtrl($scope, $http) {

    $scope.currentYear = 0;
    $scope.currentTrack = 0;
    $scope.url = '';
    $scope.playlist = [];
    $scope.tracks = [];
    $scope.isPlaying = false;
    $scope.trackDisplayCount = 6;
    $scope.trackDisplayLimit = 15;
    
    $scope.getMusic = function(year) {
        $(".song-list").hide();
        $(".display-count").hide();
        
        $scope.currentTrack = 0;
        
        if($scope.currentYear > 0) {
            $("#year-"+$scope.currentYear).toggleClass("active-year");
        }
        
        $scope.currentYear = year;
        $("#year-"+$scope.currentYear).toggleClass("active-year");
        
        
        for ($scope.i = 0; $scope.i < $scope.timeline.length; $scope.i++) {
            if ($scope.timeline[$scope.i].year == $scope.currentYear) {
                $scope.yearObj = $scope.timeline[$scope.i];
            }
        }
        
        $scope.url = "https://api.napster.com/v2.2/playlists/pp." + $scope.yearObj.pid
            + "/tracks?apikey=" + key + "&limit=" + trackLoadLimit;
            
        
        $http.get($scope.url).then(function(response) {
            
            $scope.playlist = response.data.tracks;
            $scope.tracks = shuffle($scope.playlist);
            $(".song-list").fadeIn(1500);
            
            if ($scope.trackDisplayLimit != $scope.trackDisplayCount) {
                $(".display-count").fadeIn(250);
            }
        });
    };
    
    $scope.toggleYear = function(year) {
        if($scope.currentYear == 0) {
            $(".guide").fadeOut(250);
        }
        
        if(year != $scope.currentYear) {
            $scope.getMusic(year);
        }
    };
    
    $scope.togglePlayback = function(id) {
        var audio = "#"+id;
        var audioControl = "#control-" + id;
        var currentAudio = "#"+$scope.currentTrack;
        var currentAudioControl = "#control-"+$scope.currentTrack;
        
        if ($scope.isPlaying) {
            if($scope.currentTrack == id) {
                $(audio).trigger("pause");
                $(audioControl).attr("src","img/control/play.png");
                $scope.isPlaying = false; 
            }
            else {
                $(currentAudio).trigger("pause");
                $(currentAudioControl).attr("src","img/control/play.png");
                $(currentAudio).parent().parent().toggleClass("active-song");
                $(currentAudio).parent().fadeOut(250);
                $(audio).trigger("play");
                $(audioControl).attr("src","img/control/pause.png");
                $(audio).parent().parent().toggleClass("active-song");
                $scope.isPlaying = true;
                $scope.currentTrack = id;
            }
        }
        else {
            if($scope.currentTrack > 0) {
                $(currentAudio).parent().parent().toggleClass("active-song");
                $(currentAudio).parent().fadeOut(250);
            }
            $(audio).trigger("play");
            $(audioControl).attr("src","img/control/pause.png");
            $scope.isPlaying = true;
            $scope.currentTrack = id;
            $(audio).parent().parent().toggleClass("active-song");
        }
    };

    $scope.showInfo = function(id) {
        $("#"+id).parent().fadeIn(250);
    };
    
    $scope.hideInfo = function(id) {
        if(id != $scope.currentTrack) {
            $("#"+id).parent().fadeOut(250);
        }
    };
    
    $scope.displayMore = function() {
        if ($scope.trackDisplayLimit - $scope.trackDisplayCount <= 3) {
            $scope.trackDisplayCount = $scope.trackDisplayLimit;
            $(".display-count").fadeOut(150);
        }
        else {
            $scope.trackDisplayCount += 3;
        }
        //$scope.getMusic($scope.currentYear);
    };
    
    $scope.timeline = [
        {year: 1920, pid: 139422201},
        {year: 1930, pid: 139422201},
        {year: 1940, pid: 139422201},
        {year: 1950, pid: 139422201},
        {year: 1960, pid: 139422201},
        {year: 1970, pid: 139422201},
        {year: 1980, pid: 139422201},
        {year: 1990, pid: 139422201},
        {year: 2000, pid: 139422201},
        {year: 2005, pid: 139422201},
        {year: 2010, pid: 139422201},
        {year: 2015, pid: 139422201}
    ];
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}