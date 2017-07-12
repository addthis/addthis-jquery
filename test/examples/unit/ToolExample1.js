'use strict';
describe('ToolExample1', function() {
    describe('changeToolAction', function() {
        it('should be a function', function() {
            expect(typeof window.changeToolAction).toEqual('function');
        });

        it('should toggle currentToolClass', function() {
            var initialClass = currentToolClass;
            changeToolAction();
            var secondClass = currentToolClass;
            changeToolAction();
            var thirdClass = currentToolClass;
            expect(initialClass).not.toEqual(secondClass);
            expect(secondClass).not.toEqual(thirdClass);
            expect(initialClass).toEqual(thirdClass);
        });

        it('should call $.addthis().tool every time', function() {
            $.addthis().tool.calls.reset();
            changeToolAction();
            expect($.addthis().tool.calls.count()).toEqual(1);
            changeToolAction();
            expect($.addthis().tool.calls.count()).toEqual(2);
            changeToolAction();
            expect($.addthis().tool.calls.count()).toEqual(3);
        });

        it('should call $().empty every time', function() {
            $().empty.calls.reset();
            changeToolAction();
            expect($().empty.calls.count()).toEqual(1);
            changeToolAction();
            expect($().empty.calls.count()).toEqual(2);
            changeToolAction();
            expect($().empty.calls.count()).toEqual(3);
        });

        it('should call document.getElementById every time', function() {
            document.getElementById.calls.reset();
            changeToolAction();
            expect(document.getElementById.calls.count()).toEqual(1);
            expect(document.getElementById).toHaveBeenCalledWith('toolClass');
            changeToolAction();
            expect(document.getElementById.calls.count()).toEqual(2);
            expect(document.getElementById).toHaveBeenCalledWith('toolClass');
            changeToolAction();
            expect(document.getElementById.calls.count()).toEqual(3);
            expect(document.getElementById).toHaveBeenCalledWith('toolClass');
        });
    });
});