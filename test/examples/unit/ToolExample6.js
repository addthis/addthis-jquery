'use strict';
describe('ToolExample6', function() {
    describe('changeToolAction2', function() {
        it('should be a function', function() {
            expect(typeof window.changeToolAction2).toEqual('function');
        });

        it('should toggle currentToolClass', function() {
            var initialClass = currentToolClass;
            changeToolAction2();
            var secondClass = currentToolClass;
            changeToolAction2();
            var thirdClass = currentToolClass;
            expect(initialClass).not.toEqual(secondClass);
            expect(secondClass).not.toEqual(thirdClass);
            expect(initialClass).toEqual(thirdClass);
        });

        it('should call $.addthis().tool every time', function() {
            $.addthis().tool.calls.reset();
            changeToolAction2();
            expect($.addthis().tool.calls.count()).toEqual(1);
            changeToolAction2();
            expect($.addthis().tool.calls.count()).toEqual(2);
            changeToolAction2();
            expect($.addthis().tool.calls.count()).toEqual(3);
        });

        it('should call $().empty every time', function() {
            $().empty.calls.reset();
            changeToolAction2();
            expect($().empty.calls.count()).toEqual(1);
            changeToolAction2();
            expect($().empty.calls.count()).toEqual(2);
            changeToolAction2();
            expect($().empty.calls.count()).toEqual(3);
        });

        it('should call document.getElementById every time', function() {
            document.getElementById.calls.reset();
            changeToolAction2();
            expect(document.getElementById.calls.count()).toEqual(1);
            expect(document.getElementById).toHaveBeenCalledWith('toolClass');
            changeToolAction2();
            expect(document.getElementById.calls.count()).toEqual(2);
            expect(document.getElementById).toHaveBeenCalledWith('toolClass');
            changeToolAction2();
            expect(document.getElementById.calls.count()).toEqual(3);
            expect(document.getElementById).toHaveBeenCalledWith('toolClass');
        });
    });
});