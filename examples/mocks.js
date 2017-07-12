(function (window, document) {
    var addthisToolMock = jasmine.createSpyObj(
        'addthisToolMock',
        [
            'appendTo',
            'shareUrl',
            'shareTitle',
            'shareMedia',
            'shareDescription'
        ]
    );

    var addthisPluginMock = jasmine.createSpyObj(
        'addthisPluginMock',
        [
            'shareUrl',
            'shareTitle',
            'shareMedia',
            'shareDescription',
            'tool'
        ]
    );

    addthisPluginMock.tool.and.returnValue(addthisToolMock);

    var jQueryMock = jasmine.createSpyObj(
        'jQueryMock',
        [
            'addthis',
            'appendTo',
            'click',
            'empty',
            'hide',
            'attr'
        ]
    );

    jQueryMock.addthis.and.returnValue(addthisPluginMock);

    var doneMock = function(callback) {
        var mockCatApiResponse = {
            documentElement: {
                getElementsByTagName: function() {
                    return [
                        { innerHTML: 'https://example.com/1' },
                        { innerHTML: 'https://example.com/2' },
                        { innerHTML: 'https://example.com/3' },
                        { innerHTML: 'https://example.com/4' },
                        { innerHTML: 'https://example.com/5' },
                        { innerHTML: 'https://example.com/6' },
                        { innerHTML: 'https://example.com/7' },
                        { innerHTML: 'https://example.com/8' },
                        { innerHTML: 'https://example.com/9' },
                        { innerHTML: 'https://example.com/10' },
                        { innerHTML: 'https://example.com/11' },
                        { innerHTML: 'https://example.com/12' },
                        { innerHTML: 'https://example.com/13' },
                        { innerHTML: 'https://example.com/14' },
                        { innerHTML: 'https://example.com/15' },
                        { innerHTML: 'https://example.com/16' },
                        { innerHTML: 'https://example.com/17' },
                        { innerHTML: 'https://example.com/18' },
                        { innerHTML: 'https://example.com/19' },
                        { innerHTML: 'https://example.com/20' }
                    ];
                }
            }
        };
        callback(mockCatApiResponse);
    }

    var ajaxResultMock = jasmine.createSpyObj('ajaxResultMock', ['done']);
    ajaxResultMock.done.and.callFake(doneMock);

    window.$ = jasmine.createSpy('jQuery')
        .and.returnValue(jQueryMock);

    window.$.addthis = jasmine.createSpy('addthisPlugin')
        .and.returnValue(addthisPluginMock);

    window.$.ajax = jasmine.createSpy('ajax')
        .and.returnValue(ajaxResultMock);

    document.getElementById = jasmine.createSpy('getElementById')
        .and.returnValue({innerText: ''});
})(window, document);