const { normalizaURL } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizaURL strip protocol and trailing slashes", () => {
  const input = "https://www.boot.dev/";
  const actual = normalizaURL(input);
  const expected = "www.boot.dev";
  expect(actual).toEqual(expected);
});

test("normalizaURL convert to lowercase", () => {
  const input = "https://www.Blog.boot.dev/";
  const actual = normalizaURL(input);
  const expected = "www.blog.boot.dev";
  expect(actual).toEqual(expected);
});
