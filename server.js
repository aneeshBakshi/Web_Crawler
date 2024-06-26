const { crawlPage } = require("./crawl.js");

function main() {
  if (process.argv.length < 3) {
    console.log("No Website provided");
    process.exit(1);
  } else if (process.argv.length > 3) {
    console.log("Too many args");
    process.exit(1);
  } else {
    const baseURL = process.argv[2];
    console.log(`Starting crawl of ${baseURL}`);
    crawlPage(baseURL);
  }
}

main();
