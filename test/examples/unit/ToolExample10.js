'use strict';
describe('ToolExample10', function() {
    it('imageQueue should be an array', function() {
        expect(Array.isArray(window.imageQueue)).toEqual(true);
    });

    it('imageQueue should not be empty', function() {
        expect(imageQueue.length).toBeGreaterThan(0);
    });

    describe('getMoreImages2', function() {
        it('should be a function', function() {
            expect(typeof window.getMoreImages2).toEqual('function');
        });

        it('should do an ajax call', function() {
            $.ajax.calls.reset();
            getMoreImages2();
            expect($.ajax.calls.count()).toEqual(1);
        });

        it('should call callback', function() {
            var callback = jasmine.createSpy('getMoreImages2 callback');
            getMoreImages2(callback);
            expect(callback).toHaveBeenCalled();
        });

        it('should push more items into imageQueue', function() {
            var initialLength = imageQueue.length;
            getMoreImages2();
            expect(imageQueue.length).toBeGreaterThan(initialLength);
        });
    });

    describe('changeCat', function() {
        it('should be a function', function() {
            expect(typeof window.changeCat).toEqual('function');
        });

        it('should call getMoreImages2 if imageQueue is empty', function() {
            imageQueue = [];
            spyOn(window, 'getMoreImages2');
            changeCat();
            expect(window.getMoreImages2.calls.count()).toEqual(1);
        });

        it('should be called twice if imageQueue is empty (recurses)', function() {
            imageQueue = [];
            spyOn(window, 'changeCat').and.callThrough();
            changeCat();
            expect(window.changeCat.calls.count()).toEqual(2);
        });

        it('should try to change a src attribute on an image when imageQueue is not empty', function() {
            expect(imageQueue.length).toBeGreaterThan(0);
            $().attr.calls.reset();
            changeCat();
            expect($().attr.calls.count()).toEqual(1);
        });
    });
});