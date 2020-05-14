const readFileSync = require("fs").readFileSync;
const existsSync = require("fs").existsSync;
const pathJoin = require("path").join;
const Matcher = require("wdio-visual-regression").Matcher;
const allureReporter = require("@wdio/allure-reporter").default;

function visualRegressionInstanceFolder(info) {
  const [version] = info.browserVersion.split(".");
  const platform = info.platform || process.platform;
  return `${info.browserName}_${version}_${platform.toLowerCase()}`;
}

function screenshotPath(type, name) {
  const {
    browserName,
    browserVersion,
    version,
    platform,
  } = browser.capabilities;
  const instanceFolder = visualRegressionInstanceFolder({
    browserName,
    browserVersion: version || browserVersion,
    platform,
  });

  return pathJoin("screenshots", instanceFolder, type, name + ".png");
}

class AllureMatcher extends Matcher {
  match(name) {
    return super.match(name).then((result) => {
      allureReporter.addAttachment(
        "visual-regression.actual",
        readFileSync(screenshotPath("actual", name)),
        "image/png",
      );

      allureReporter.addAttachment(
        "visual-regression.expected",
        readFileSync(screenshotPath("expected", name)),
        "image/png",
      );

      const diffPath = screenshotPath("diff", name);
      if (existsSync(diffPath)) {
        allureReporter.addAttachment(
          "visual-regression.diff",
          readFileSync(diffPath),
          "image/png",
        );
      }

      return result;
    });
  }
}

class DocumentMatcher extends AllureMatcher {
  constructor(options) {
    super();
    this.options = options;
  }

  async takeScreenshot() {
    const base64 = await browser.saveDocumentScreenshot(this.options);
    return Buffer.from(base64, "base64");
  }
}

class FullElementMatcher extends AllureMatcher {
  constructor(element, options) {
    super();
    this.element = element;
    this.options = options;
  }

  async takeScreenshot() {
    const base64 = await browser.saveElementScreenshot(
      this.element,
      this.options,
    );
    return Buffer.from(base64, "base64");
  }
}

exports.visualRegressionInstanceFolder = visualRegressionInstanceFolder;
exports.DocumentMatcher = DocumentMatcher;
exports.FullElementMatcher = FullElementMatcher;
