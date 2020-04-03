const Matcher = require("wdio-visual-regression").Matcher;

class DocumentMatcher extends Matcher {
  async takeScreenshot() {
    const base64 = await browser.saveDocumentScreenshot();
    return Buffer.from(base64, "base64");
  }
}

exports.DocumentMatcher = DocumentMatcher;
