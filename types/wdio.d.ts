declare namespace WebdriverIO {
  // adding command to `browser`
  interface Browser {
    browserCustomCommand: (arg) => void;
  }
}
