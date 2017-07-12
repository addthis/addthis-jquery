'use strict';
describe('ToolExample9', function() {
    it('imageQueue should be an array', function() {
        expect(Array.isArray(window.imageQueue)).toEqual(true);
    });

    it('imageQueue should not be empty', function() {
        expect(imageQueue.length).toBeGreaterThan(0);
    });

    describe('getMoreImages', function() {
        it('should be a function', function() {
            expect(typeof window.getMoreImages).toEqual('function');
        });

        it('should do an ajax call', function() {
            $.ajax.calls.reset();
            getMoreImages();
            expect($.ajax.calls.count()).toEqual(1);
        });

        it('should call callback', function() {
            var callback = jasmine.createSpy('getMoreImages callback');
            getMoreImages(callback);
            expect(callback).toHaveBeenCalled();
        });

        it('should push more items into imageQueue', function() {
            var initialLength = imageQueue.length;
            getMoreImages();
            expect(imageQueue.length).toBeGreaterThan(initialLength);
        });
    });

    describe('addAnotherCat', function() {
        it('should be a function', function() {
            expect(typeof window.addAnotherCat).toEqual('function');
        });

        it('should call getMoreImages if imageQueue is empty', function() {
            imageQueue = [];
            spyOn(window, 'getMoreImages');
            addAnotherCat();
            expect(window.getMoreImages.calls.count()).toEqual(1);
        });

        it('should be called twice if imageQueue is empty (recurses)', function() {
            imageQueue = [];
            spyOn(window, 'addAnotherCat').and.callThrough();
            addAnotherCat();
            expect(window.addAnotherCat.calls.count()).toEqual(2);
        });

        it('should try to append to #catGifContainer when imageQueue is not empty', function() {
            expect(imageQueue.length).toBeGreaterThan(0);
            $().appendTo.calls.reset();
            addAnotherCat();
            expect($().appendTo.calls.count()).toEqual(1);
        });
    });
});