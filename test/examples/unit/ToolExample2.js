'use strict';
describe('ToolExample2', function() {
    describe('switchUrl', function() {
        it('should be a function', function() {
            expect(typeof window.switchUrl).toEqual('function');
        });

        it('should toggle currentToolUrl', function() {
            var initialUrl = currentToolUrl;
            switchUrl();
            var secondUrl = currentToolUrl;
            switchUrl();
            var thirdUrl = currentToolUrl;
            expect(initialUrl).not.toEqual(secondUrl);
            expect(secondUrl).not.toEqual(thirdUrl);
            expect(initialUrl).toEqual(thirdUrl);
        });

        it('should call $.addthis().switchUrl every time', function() {
            $.addthis().tool().shareUrl.calls.reset();
            switchUrl();
            expect($.addthis().tool().shareUrl.calls.count()).toEqual(1);
            switchUrl();
            expect($.addthis().tool().shareUrl.calls.count()).toEqual(2);
            switchUrl();
            expect($.addthis().tool().shareUrl.calls.count()).toEqual(3);
        });

        it('should call document.getElementById every time', function() {
            document.getElementById.calls.reset();
            switchUrl();
            expect(document.getElementById.calls.count()).toEqual(1);
            expect(document.getElementById).toHaveBeenCalledWith('shareUrl');
            switchUrl();
            expect(document.getElementById.calls.count()).toEqual(2);
            expect(document.getElementById).toHaveBeenCalledWith('shareUrl');
            switchUrl();
            expect(document.getElementById.calls.count()).toEqual(3);
            expect(document.getElementById).toHaveBeenCalledWith('shareUrl');
        });
    });
});