var key = "MmFmNmNiYzEtZTkzOS00ODZjLTg2ZmMtZTVlNTk3MGE3ZDAw";
var trackLoadLimit = 15;

angular.module('app', [])
    .controller('mainCtrl', mainCtrl)
    .config(function($sceDelegateProvider) {$sceDelegateProvider.resourceUrlWhitelist(['**']);});

function mainCtrl($scope, $http) {

    $scope.currentYear = 0;
    $scope.currentTrack = 0;
    $scope.url = '';
    $scope.tracks = [];
    $scope.isPlaying = false;
    $scope.trackDisplayLimit = 6;
    
    $scope.getMusic = function(year) {
        $(".song-list").fadeOut(250);
        $(".display-count").fadeOut(250);
        
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
            + "/tracks?apikey=" + key + "&limit=" + $scope.trackDisplayLimit;
            
        
        $http.get($scope.url).then(function(response) {
                $scope.tracks = response.data.tracks;
                $(".song-list").fadeIn(250);
                if (trackLoadLimit != $scope.trackDisplayLimit) {
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
        if (trackLoadLimit - $scope.trackDisplayLimit <= 3) {
            $scope.trackDisplayLimit = trackLoadLimit;
        }
        else {
            $scope.trackDisplayLimit += 3;
        }
        $scope.getMusic($scope.currentYear);
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