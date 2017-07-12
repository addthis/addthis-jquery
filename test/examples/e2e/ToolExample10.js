describe('ToolExample10', function() {
    var $;

    beforeEach(function(done) {
        fixture.setBase('examples');
        fixture.load('ToolExample10.html');

        var jqueryScript = document.createElement('script');
        jqueryScript.type = 'text/javascript';
        jqueryScript.src = '/base/node_modules/jquery/dist/jquery.js';
        var addthisPluginScript = document.createElement('script');
        addthisPluginScript.type = 'text/javascript';
        addthisPluginScript.src = '/base/src/jquery-addthis.js';
        var toolExampleJs = document.createElement('script');
        toolExampleJs.type = 'text/javascript';
        toolExampleJs.src = '/base/examples/ToolExample10.js';

        document.head.appendChild(jqueryScript);

        var mockAjaxObject = function() {
            return {
                done: function(callback) {
                    console.log();
                    callback(mockXMLResult);
                }
            };
        };

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

        var jqueryIntervalId = window.setInterval(function() {
            if (typeof window.jQuery !== 'undefined') {
                clearInterval(jqueryIntervalId);
                $ = window.jQuery;
                $.ajax = jasmine.createSpy('ajax')
                    .and.returnValue(ajaxResultMock);

                document.head.appendChild(addthisPluginScript);
                var addthisPluginIntervalId = window.setInterval(function() {
                    if (typeof $.addthis !== 'undefined') {
                        clearInterval(addthisPluginIntervalId);
                        $(document).ready(function() {
                            document.body.appendChild(toolExampleJs);
                            var toolExampleIntervalId = window.setInterval(function() {
                                if (typeof window.changeCat !== 'undefined') {
                                    clearInterval(toolExampleIntervalId);
                                    $(document).ready(done);
                                }
                            });
                        }, 50);
                    }
                }, 50);
            }
        }, 50);
    });

    it('getMoreImages2 should be a function', function() {
        expect(typeof window.getMoreImages2).toEqual('function');
    });

    it('changeCat should be a function', function() {
        expect(typeof window.changeCat).toEqual('function');
    });

    it('imageQueue should be an array', function() {
        expect(Array.isArray(window.imageQueue)).toEqual(true);
    });

    it('should automatically do an ajax call', function() {
        expect($.ajax).toHaveBeenCalled();
    });

    it('an image should get be added automatically', function() {
        var numberOfImagesOnPage = $('.img-thumbnail').length;
        expect(numberOfImagesOnPage).toEqual(1);
    });

    it('clicking the button should not add another image onto the page', function() {
        var button = document.getElementById('addCat');
        button.click();
        var numberOfImagesOnPage = $('.img-thumbnail').length;
        expect(numberOfImagesOnPage).toEqual(1);
    });

    it('clicking the button should change the URL of the image', function() {
        var imageSrc1 = $('.img-thumbnail')[0].src;
        var button = document.getElementById('addCat');
        button.click();
        var imageSrc2 = $('.img-thumbnail')[0].src;
        expect(imageSrc1).not.toEqual(imageSrc2);
    });

    it('clicking the button more times than there are images queued should automatically replenish imageQueue', function() {
        var button = document.getElementById('addCat');
        while (window.imageQueue.length > 0) {
            button.click();
        }
        var imageSrc1 = $('.img-thumbnail')[0].src;
        button.click();
        var imageSrc2 = $('.img-thumbnail')[0].src;

        expect(imageSrc1).not.toEqual(imageSrc2);
    });

    afterEach(function() {
        fixture.cleanup();
        delete window.jQuery;
        delete window.addthis;
        delete window.addthis_share;
        delete window.addthis_config;
        delete window.addthis_plugin_info;

        delete window.changeCat;
        delete window.getMoreImages2;
        delete window.imageQueue;
    });
});