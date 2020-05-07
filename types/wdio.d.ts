import "@wdio/sync";

declare module "@wdio/sync" {
  type ElementOrSelector = WebdriverIO.Element | WebdriverIO.Element[] | string;

  interface WdioScreenshotOptions {
    hide?: ElementOrSelector[];
    remove?: ElementOrSelector[];
  }

  // adding command to `browser`
  interface BrowserObject {
    matchDocument(name: string, options?: WdioScreenshotOptions): number;
    matchElementFull(
      name: string,
      element: ElementOrSelector,
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

  interface Element {
    clearWithKeys(): void;
  }
}
