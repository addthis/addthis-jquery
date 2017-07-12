'use strict';
describe('ToolExample3', function() {
    describe('switchTitle', function() {
        it('should be a function', function() {
            expect(typeof window.switchTitle).toEqual('function');
        });

        it('should toggle currentToolTitle', function() {
            var initialTitle = currentToolTitle;
            switchTitle();
            var secondTitle = currentToolTitle;
            switchTitle();
            var thirdTitle = currentToolTitle;
            expect(initialTitle).not.toEqual(secondTitle);
            expect(secondTitle).not.toEqual(thirdTitle);
            expect(initialTitle).toEqual(thirdTitle);
        });

        it('should call $.addthis().switchTitle every time', function() {
            $.addthis().tool().shareTitle.calls.reset();
            switchTitle();
            expect($.addthis().tool().shareTitle.calls.count()).toEqual(1);
            switchTitle();
            expect($.addthis().tool().shareTitle.calls.count()).toEqual(2);
            switchTitle();
            expect($.addthis().tool().shareTitle.calls.count()).toEqual(3);
        });

        it('should call document.getElementById every time', function() {
            document.getElementById.calls.reset();
            switchTitle();
            expect(document.getElementById.calls.count()).toEqual(1);
            expect(document.getElementById).toHaveBeenCalledWith('shareTitle');
            switchTitle();
            expect(document.getElementById.calls.count()).toEqual(2);
            expect(document.getElementById).toHaveBeenCalledWith('shareTitle');
            switchTitle();
            expect(document.getElementById.calls.count()).toEqual(3);
            expect(document.getElementById).toHaveBeenCalledWith('shareTitle');
        });
    });
});