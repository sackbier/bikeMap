'use strict';

angular.module('myApp.view1', ['ngRoute', 'uiGmapgoogle-maps'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl'
    });
}])

.config(function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //key: 'your api key',
        v: '3.20',
        libraries: 'weather,geometry,visualization'
    });
})

.controller('View1Ctrl', function ($scope) {
    $scope.tourList = [
        {
            id: 0,
            title: 'Tour1',
            length: '5km',
            height: '700hm',
            level: 'easy',
            coords: {
                latitude: 48.10002,
                longitude: 11.51748,
            },
        },
        {
            id: 1,
            title: 'Tour2',
            length: '30km',
            height: '1500',
            level: 'medium',
            coords: {
                latitude: 48.09927482802501,
                longitude: 11.523788555603005,
            },
        },
        ];

    $scope.map = {
        center: {
            latitude: 48.10002,
            longitude: 11.51748
        },
        zoom: 15
    };

    $scope.selectTour = function selectTour(marker) {

        $scope.tourList.forEach(function resetSelectedTour(tour) {
            tour.id === marker.key ? tour.selected = true : tour.selected = false;
        });
        //$scope.tourList[marker.key].selected = true;
    };

    $scope.plotTour = $.ajax({
        type: "GET",
        url: "gps.kml",
        dataType: "xml",
        success: function (xml) {
            var map = $scope.map;
            console.log('success loading file');
            var points = [];
            var bounds = new google.maps.LatLngBounds();

            var obj = $(xml).find('Playlist');

            $(xml).find("Playlist").children().each(function () {
                console.log('this: ' + $(this));
                var lon = $(this).children('LookAt').children('longitude').html();
                var lat = $(this).children('LookAt').children('latitude').html();
                var p = new google.maps.LatLng(lat, lon);
                points.push(p);
                bounds.extend(p);
            });

            var poly = new google.maps.Polyline({
                // use your own style here
                path: points,
                strokeColor: "#FF00AA",
                strokeOpacity: .7,
                strokeWeight: 4
            });

            poly.setMap(map);

            // fit bounds to track
            map.fitBounds(bounds);
        }
    });

});