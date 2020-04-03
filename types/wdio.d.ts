import "@wdio/sync";

declare module "@wdio/sync" {
  interface WdioScreenshotOptions {
    hide: string[];
    remove: string[];
  }

  // adding command to `browser`
  interface BrowserObject {
    // TODO remove this when https://github.com/ennjin/wdio-visual-regression/issues/11 is fixed
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // matchElement(name: string, element: WebdriverIO.Element): number;
    // matchViewport(name: string): number;

    matchDocument(name: string): number;

    saveViewportScreenshot(fileName: string, options: WdioScreenshotOptions);
    saveDocumentScreenshot(fileName: string, options: WdioScreenshotOptions);
    saveElementScreenshot(
      fileName: string,
      elementSelector: string,
      options: WdioScreenshotOptions,
    );
  }
}
