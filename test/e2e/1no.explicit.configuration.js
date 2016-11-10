var assert = require('assert');
var webdriverio = require('webdriverio');
var browserNames = ['chrome'];

browserNames.forEach(function(browserName) {
  var options = {
  //  logLevel: 'command',
    baseUrl: 'http://localhost:3003/test/fixtures',
    desiredCapabilities: {
      browserName: browserName
    }
  };

  describe('with no explicit configuration', function() {
    var browser;
    this.timeout(5000);

    before(function() {
      browser = webdriverio
        .remote(options)
        .init()
        .url('/1no.explicit.configuration.html');
    });

    it('addthis_plugin_info should have the expected format & values', function(done) {
      browser.execute(function() {
          return window.addthis_plugin_info;
      }).then(function(result) {
        assert.equal(typeof result.value, 'object');
        assert.equal(result.value.info_status, 'enabled');
        assert.equal(result.value.cms_name, 'jQuery');
        assert.equal(result.value.plugin_name, 'jquery-angular');
        assert.equal(result.value.plugin_mode, 'AddThis');
        assert.equal(typeof result.value.cms_version, 'string');
        assert.equal(typeof result.value.plugin_version, 'string');
        done();
      });
    });

    after(function(done) {
      browser.end().then(function() {
          done();
      });
    });
  });
});
