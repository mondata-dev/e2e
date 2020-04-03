const Matcher = require("wdio-visual-regression").Matcher;

class DocumentMatcher extends Matcher {
  constructor(options) {
    super();
    this.options = options;
  }

  async takeScreenshot() {
    const base64 = await browser.saveDocumentScreenshot(this.options);
    return Buffer.from(base64, "base64");
  }
}

class FullElementMatcher extends Matcher {
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

exports.DocumentMatcher = DocumentMatcher;
exports.FullElementMatcher = FullElementMatcher;
