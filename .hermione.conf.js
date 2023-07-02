module.exports = {
  sets: {
    desktop: {
      files: "test/hermione",
    },
  },

  browsers: {
    chrome: {
      automationProtocol: "webdriver",
      desiredCapabilities: {
        browserName: "chrome",
      },
      windowSize: {
        width: 1920,
        height: 1080
      }
    },
  },

  plugins: {
    "html-reporter/hermione": {
      enabled: true,
    },
  },

  gridUrl: 'http://localhost:4444/wd/hub',
  screenshotsDir: 'hermione/screens',
  baseUrl: 'http://localhost:3000/hw/store',
  waitTimeout: 10000,
};
