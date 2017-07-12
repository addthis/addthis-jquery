'use strict';
describe('ToolExample4', function() {
    describe('switchGlobalUrl', function() {
        it('should be a function', function() {
            expect(typeof window.switchGlobalUrl).toEqual('function');
        });

        it('should toggle currentUrl', function() {
            var initialUrl = currentUrl;
            switchGlobalUrl();
            var secondUrl = currentUrl;
            switchGlobalUrl();
            var thirdUrl = currentUrl;
            expect(initialUrl).not.toEqual(secondUrl);
            expect(secondUrl).not.toEqual(thirdUrl);
            expect(initialUrl).toEqual(thirdUrl);
        });

        it('should call $.addthis().switchGlobalUrl every time', function() {
            $.addthis().shareUrl.calls.reset();
            switchGlobalUrl();
            expect($.addthis().shareUrl.calls.count()).toEqual(1);
            switchGlobalUrl();
            expect($.addthis().shareUrl.calls.count()).toEqual(2);
            switchGlobalUrl();
            expect($.addthis().shareUrl.calls.count()).toEqual(3);
        });

        it('should call document.getElementById every time', function() {
            document.getElementById.calls.reset();
            switchGlobalUrl();
            expect(document.getElementById.calls.count()).toEqual(1);
            expect(document.getElementById).toHaveBeenCalledWith('shareUrl');
            switchGlobalUrl();
            expect(document.getElementById.calls.count()).toEqual(2);
            expect(document.getElementById).toHaveBeenCalledWith('shareUrl');
            switchGlobalUrl();
            expect(document.getElementById.calls.count()).toEqual(3);
            expect(document.getElementById).toHaveBeenCalledWith('shareUrl');
        });
    });
});