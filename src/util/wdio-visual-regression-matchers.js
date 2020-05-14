const readFileSync = require("fs").readFileSync;
const pathJoin = require("path").join;
const Matcher = require("wdio-visual-regression").Matcher;
const allureReporter = require("@wdio/allure-reporter").default;

function visualRegressionInstanceFolder(info) {
  const [version] = info.browserVersion.split(".");
  const platform = info.platform || process.platform;
  return `${info.browserName}_${version}_${platform.toLowerCase()}`;
}

function readScreenshot(type, name) {
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

  return readFileSync(
    pathJoin("screenshots", instanceFolder, type, name + ".png"),
  );
}

class AllureMatcher extends Matcher {
  match(name) {
    const result = super.match(name);

    allureReporter.addAttachment(
      "visual-regression.actual",
      readScreenshot("actual", name),
      "image/png",
    );

    allureReporter.addAttachment(
      "visual-regression.expected",
      readScreenshot("expected", name),
      "image/png",
    );

    allureReporter.addAttachment(
      "visual-regression.diff",
      readScreenshot("diff", name),
      "image/png",
    );

    return result;
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
