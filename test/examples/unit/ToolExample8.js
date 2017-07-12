'use strict';
describe('ToolExample8', function() {
    it('queuedIpsums should be an array', function() {
        expect(Array.isArray(window.queuedIpsums)).toEqual(true);
    });

    describe('addAnotherIpsum', function() {
        it('should be a function', function() {
            expect(typeof window.addAnotherIpsum).toEqual('function');
        });

        it('should try to add another ipsum to the page if queuedIpsums is not empty', function() {
            $.addthis().tool.calls.reset();
            $().appendTo.calls.reset();
            var count = 0;

            while (window.queuedIpsums.length > 0) {
                addAnotherIpsum();
                count++;
                expect($.addthis().tool.calls.count()).toEqual(count);
                expect($().appendTo.calls.count()).toEqual(count);
            }
        });

        it('should not try to hide button if queuedIpsums has more than 1 item', function() {
            $().hide.calls.reset();
            var count = 0;

            while (window.queuedIpsums.length > 1) {
                addAnotherIpsum();
                count++;
                expect($.addthis().tool.calls.count()).toEqual(count);
                expect($().appendTo.calls.count()).toEqual(count);
                expect($().hide.calls.count()).toEqual(0);
            }
        });

        it('should not try to add another ipsum to the page if queuedIpsums is empty', function() {
            queuedIpsums = [];
            $.addthis().tool.calls.reset();
            $().appendTo.calls.reset();

            addAnotherIpsum();
            expect($.addthis().tool.calls.count()).toEqual(0);
            expect($().appendTo.calls.count()).toEqual(0);
        });

        it('should hide the button if queuedIpsums has 1 element', function() {
            queuedIpsums = [true];
            $().hide.calls.reset();
            addAnotherIpsum();
            expect($().hide.calls.count()).toEqual(1);
        });

        it('should hide the button if queuedIpsums is empty', function() {
            queuedIpsums = [];
            $().hide.calls.reset();
            addAnotherIpsum();
            expect($().hide.calls.count()).toEqual(1);
        });
    });
});