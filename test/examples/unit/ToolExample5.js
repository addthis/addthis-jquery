'use strict';
describe('ToolExample5', function() {
    describe('switchGlobalTitle', function() {
        it('should be a function', function() {
            expect(typeof window.switchGlobalTitle).toEqual('function');
        });

        it('should toggle currentTitle', function() {
            var initialTitle = currentTitle;
            switchGlobalTitle();
            var secondTitle = currentTitle;
            switchGlobalTitle();
            var thirdTitle = currentTitle;
            expect(initialTitle).not.toEqual(secondTitle);
            expect(secondTitle).not.toEqual(thirdTitle);
            expect(initialTitle).toEqual(thirdTitle);
        });

        it('should call $.addthis().switchGlobalTitle every time', function() {
            $.addthis().shareTitle.calls.reset();
            switchGlobalTitle();
            expect($.addthis().shareTitle.calls.count()).toEqual(1);
            switchGlobalTitle();
            expect($.addthis().shareTitle.calls.count()).toEqual(2);
            switchGlobalTitle();
            expect($.addthis().shareTitle.calls.count()).toEqual(3);
        });

        it('should call document.getElementById every time', function() {
            document.getElementById.calls.reset();
            switchGlobalTitle();
            expect(document.getElementById.calls.count()).toEqual(1);
            expect(document.getElementById).toHaveBeenCalledWith('shareTitle');
            switchGlobalTitle();
            expect(document.getElementById.calls.count()).toEqual(2);
            expect(document.getElementById).toHaveBeenCalledWith('shareTitle');
            switchGlobalTitle();
            expect(document.getElementById.calls.count()).toEqual(3);
            expect(document.getElementById).toHaveBeenCalledWith('shareTitle');
        });
    });
});