'use strict';

describe('myApp.view1 module', function () {

    var myScope, view1Ctrl;

    beforeEach(module('myApp.view1'));

    beforeEach(inject(function ($controller, $rootScope) {
        myScope = $rootScope.$new();
        view1Ctrl = $controller('View1Ctrl', {
            $scope: myScope
        });
    }));

    describe('view1 controller', function () {

        it('should have a Tour List with 2 elements', function () {
            expect(myScope.tourList.length).toBe(2);
        });

        it('should include Tour List with data', function () {
            expect(view1Ctrl).toBeDefined();
            expect(myScope.tourList[0]['title']).toBe('Tour1');
        });

    });
});