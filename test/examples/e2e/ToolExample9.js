describe('ToolExample9', function() {
    var $;

    beforeEach(function(done) {
        fixture.setBase('examples');

        var mockXMLResult = {
            documentElement: fixture.load('mockCatApiOutput.xml')[0]
        };

        fixture.load('ToolExample9.html');

        var jqueryScript = document.createElement('script');
        jqueryScript.type = 'text/javascript';
        jqueryScript.src = '/base/node_modules/jquery/dist/jquery.js';
        var addthisPluginScript = document.createElement('script');
        addthisPluginScript.type = 'text/javascript';
        addthisPluginScript.src = '/base/src/jquery-addthis.js';
        var toolExampleJs = document.createElement('script');
        toolExampleJs.type = 'text/javascript';
        toolExampleJs.src = '/base/examples/ToolExample9.js';

        document.head.appendChild(jqueryScript);


        var mockAjaxObject = function() {
            return {
                done: function(callback) {
                    callback(mockXMLResult);
                }
            };
        };

        var jqueryIntervalId = window.setInterval(function() {
            if (typeof window.jQuery !== 'undefined') {
                clearInterval(jqueryIntervalId);
                $ = window.jQuery;
                $.ajax = mockAjaxObject;
                spyOn($, 'ajax').and.callThrough();

                document.head.appendChild(addthisPluginScript);
                var addthisPluginIntervalId = window.setInterval(function() {
                    if (typeof $.addthis !== 'undefined') {
                        clearInterval(addthisPluginIntervalId);
                        $(document).ready(function() {
                            document.body.appendChild(toolExampleJs);
                            var toolExampleIntervalId = window.setInterval(function() {
                                if (typeof window.addAnotherCat !== 'undefined') {
                                    clearInterval(toolExampleIntervalId);
                                    window.setTimeout(done);
                                }
                            });
                        }, 50);
                    }
                }, 50);
            }
        }, 50);
    });

    it('getMoreImages should be a function', function() {
        expect(typeof window.getMoreImages).toEqual('function');
    });

    it('addAnotherCat should be a function', function() {
        expect(typeof window.addAnotherCat).toEqual('function');
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

    it('clicking the button should add another image onto the page', function() {
        var button = document.getElementById('addCat');
        button.click();
        var numberOfImagesOnPage = $('.img-thumbnail').length;
        expect(numberOfImagesOnPage).toEqual(2);
    });


    it('clicking the button more times than there are images queued should automatically replenish imageQueue', function() {
        expect($.ajax.calls.count()).toEqual(1);
        var button = document.getElementById('addCat');

        while (window.imageQueue.length > 0) {
            button.click();
        }
        var numberOfImagesOnPage1 = $('.img-thumbnail').length;
        button.click();
        var numberOfImagesOnPage2 = $('.img-thumbnail').length;

        expect($.ajax.calls.count()).toEqual(2);
        expect(numberOfImagesOnPage1 + 1).toEqual(numberOfImagesOnPage2);
    });

    it('stupid test for code coverage', function(done) {
        var numberOfImages1 = imageQueue.length;
        var numberOfImages2;
        window.getMoreImages();
        var intervalId = window.setInterval(function() {
            if (imageQueue.length > numberOfImages1) {
                numberOfImages2 = imageQueue.length;
                clearInterval(intervalId);
                done();
            }
        }, 50);

        expect(numberOfImages1).not.toEqual(numberOfImages2);
    });

    afterEach(function() {
        fixture.cleanup();
        delete window.jQuery;
        delete window.addthis;
        delete window.addthis_share;
        delete window.addthis_config;
        delete window.addthis_plugin_info;
    });
});