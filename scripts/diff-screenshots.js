/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const compareImages = require("resemblejs/compareImages");

const ALLOWED_MISMATCH = 0.01;
const DIFF_PATH = "/tmp/screenshot-diff";

function getImage(dir, name) {
  const p = dir + "/" + name;
  return fs.existsSync(p) ? fs.readFileSync(p) : null;
}

async function diff(name, baseDir, compareDir) {
  const img1 = getImage(baseDir, name);
  const img2 = getImage(compareDir, name);

  const result = await compareImages(img1, img2);

  const mismatch = parseFloat(result.misMatchPercentage);
  console.log(`${name}: ${mismatch}`);

  if (mismatch > ALLOWED_MISMATCH) {
    const data = result.getBuffer();
    fs.writeFileSync(DIFF_PATH + "/" + name, data);
  }
}

async function diffAll(dir1, dir2) {
  const files1 = fs.readdirSync(dir1).sort();
  const files2 = fs.readdirSync(dir2).sort();

  files1
    .filter((e) => !_.includes(files2, e))
    .forEach((f) => {
      console.log(`${path.basename(f)}: ONLY IN ${dir1}`);
    });

  files2
    .filter((e) => !_.includes(files1, e))
    .forEach((f) => {
      console.log(`${path.basename(f)}: ONLY IN ${dir2}`);
    });

  for (const f of files1.filter((e) => _.includes(files2, e))) {
    await diff(path.basename(f), dir1, dir2);
  }
}

if (process.argv.length < 4) {
  console.log("Usage: node diff-screenshots.js <dir1> <dir2>");
  process.exit(1);
}

try {
  fs.mkdirSync(DIFF_PATH);
} catch (e) {}
diffAll(process.argv[2], process.argv[3]);
