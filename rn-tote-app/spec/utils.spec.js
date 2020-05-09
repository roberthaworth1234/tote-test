const chai = require("chai");
const { expect } = require("chai");

const {
  formatDates,
  validateSearch,
  formatText
} = require("../assets/utils/utilityFunctions");

describe("formatDate", () => {
  it("it will take a date format and return a string", () => {
    const input = new Date();
    expect(formatDates(input)).to.be.an("string");
  });

  it("it will take a date format and the return to include year-", () => {
    const input = new Date();
    expect(formatDates(input)).to.include("2020-");
  });
  it("it will return the complete correct string format when passed a known date format", () => {
    const input = new Date(15422845677);
    expect(formatDates(input)).to.equal("1970-06-28");
  });
});

describe("validateSearch", () => {
  it("it should return a boolean, when passed a string", () => {
    const input = "Ronaldo";
    expect(validateSearch(input)).to.be.a("boolean");
  });
  it("it should return false when, passed a string containing a special characters", () => {
    const input = "Rob%4";
    expect(validateSearch(input)).to.equal(false);
  });
  it("it should return true when, passed a string containing several keywords", () => {
    const input = "Ronaldo Portugal";
    expect(validateSearch(input)).to.equal(true);
  });
});

describe("formatText", () => {
  it("should return a string", () => {
    const input = "Search Term";
    expect(formatText(input)).to.be.a("string");
  });
  it("should return a string with consecutive whitespaces removed (replaced with %20)", () => {
    const input = "Ronaldo  Portugal";
    expect(formatText(input)).to.equal("Ronaldo%20Portugal");
  });
  it("should return a string with multiple consecutive whitespaces removed (replaced with %20)", () => {
    const input = "Ronaldo  Portugal        Jamaica    Game";
    expect(formatText(input)).to.equal("Ronaldo%20Portugal%20Jamaica%20Game");
  });
});
