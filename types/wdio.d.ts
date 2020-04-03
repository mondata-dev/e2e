import "@wdio/sync";

declare module "@wdio/sync" {
  interface WdioScreenshotOptions {
    hide?: string[];
    remove?: string[];
  }

  // adding command to `browser`
  interface BrowserObject {
    matchDocument(name: string, options?: WdioScreenshotOptions): number;
    matchElementFull(
      name: string,
      element: WebdriverIO.Element,
      options?: WdioScreenshotOptions,
    ): number;

    saveViewportScreenshot(fileName: string, options?: WdioScreenshotOptions);
    saveDocumentScreenshot(fileName: string, options?: WdioScreenshotOptions);
    saveElementScreenshot(
      fileName: string,
      elementSelector: string,
      options?: WdioScreenshotOptions,
    );
  }
}
