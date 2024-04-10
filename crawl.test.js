const { normalizaURL, getURLsFromHTML } = require("./crawl.js");
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

test("getURLsFromHTML absolute", () => {
  const inputHTMLBody = `
  <html>
    <body>
        <a href="https://www.blog.boot.dev/">Boot.dev Blog</a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://www.blog.boot.dev/";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://www.blog.boot.dev/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputHTMLBody = `
  <html>
    <body>
        <a href="/path/">Boot.dev Blog</a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://www.blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://www.blog.boot.dev/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML absolute and relative", () => {
  const inputHTMLBody = `
  <html>
    <body>
        <a href="https://www.blog.boot.dev/path1">Boot.dev Blog Path 1</a>
        <a href="/path2">Boot.dev Blog Path 2</a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://www.blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [
    "https://www.blog.boot.dev/path1",
    "https://www.blog.boot.dev/path2",
  ];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML invalid urls", () => {
  const inputHTMLBody = `
    <html>
      <body>
          <a href="invalid">invalid</a>
      </body>
    </html>
    `;
  const inputBaseURL = "https://www.blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
