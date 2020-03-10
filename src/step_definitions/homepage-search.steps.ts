import { expect } from "chai";
import homepage from "../pages/Homepage";
import { Given, When, Then } from "cucumber";

Given(/^I am on the search page$/, async () => {
  homepage.open();
  const title = browser.getTitle();

  expect(title).to.eq("Google");
});

When(/^I enter "([^"]*)" into the search box$/, arg1 => {
  homepage.enterText(arg1);
});

When(/^I click the search button$/, () => {
  homepage.search();
});

Then(/^I should see a list of search results$/, () => {
  expect(homepage.isSearched()).to.be.true;
});
