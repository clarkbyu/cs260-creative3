var key = "MmFmNmNiYzEtZTkzOS00ODZjLTg2ZmMtZTVlNTk3MGE3ZDAw";
var trackLimit = 6;

angular.module('app', [])
    .controller('mainCtrl', mainCtrl)
    .directive('song', songDirective)
    .config(function($sceDelegateProvider) {$sceDelegateProvider.resourceUrlWhitelist(['**']);});

function mainCtrl($scope, $http) {

    $scope.currentYear = 0;
    $scope.currentTrack = '';
    $scope.url = '';
    $scope.tracks = [];
    $scope.isPlaying = false;
    
    $scope.getMusic = function(year) {
        $(".song-list").fadeOut(250);
        console.log(year.year);
        
        if($scope.currentYear > 0) {
            $("#year-"+$scope.currentYear).toggleClass("active-year");
        }
        
        $scope.currentYear = year.year;
        $("#year-"+$scope.currentYear).toggleClass("active-year");
        
        
        for ($scope.i = 0; $scope.i < $scope.timeline.length; $scope.i++) {
            if ($scope.timeline[$scope.i].year == $scope.currentYear) {
                $scope.yearObj = $scope.timeline[$scope.i];
            }
        }
        
        $scope.url = "https://api.napster.com/v2.2/playlists/pp." + $scope.yearObj.pid
            + "/tracks?apikey=" + key + "&limit=" + trackLimit;
            
        console.log($scope.url);
        
        $http.get($scope.url).then(function(response) {
                console.log(response);
                $scope.tracks = response.data.tracks;
                console.log($scope.tracks);
                $(".song-list").fadeIn(250);
        });
        
    };
    
    $scope.togglePlayback = function(id) {
        var audio = "#"+id;
        var currentAudio = "#"+$scope.currentTrack;
        
        if ($scope.isPlaying) {
            if($scope.currentTrack == id) {
                $(audio).trigger("pause");
                $scope.isPlaying = false; 
            }
            else {
                $(currentAudio).trigger("pause");
                $(currentAudio).parent().parent().toggleClass("active-song");
                $(currentAudio).parent().fadeOut(250);
                $(audio).trigger("play");
                $(audio).parent().parent().toggleClass("active-song");
                $scope.isPlaying = true;
                $scope.currentTrack = id;
            }
        }
        else {
            $(audio).trigger("play");
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

function songDirective() {
    return {
        scope: {
            sid: '='
        },
        restrict: 'E',
        replace: 'true',
        template: (
            '<div class="song">' +
                '<img src="http://direct.rhapsody.com/imageserver/v2/albums/{{track.albumId}}/images/300x300.jpg' +
                '<h2>{{track.name}}</h2>' +
            '</div>'
        ),
        link: link
    };

    function link(scope) {
        
    }

}
