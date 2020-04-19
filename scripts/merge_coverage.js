const {
  execSync
} = require("child_process");
const fs = require("fs-extra");

const REPORTS_FOLDER = "reports";
const FINAL_OUTPUT_FOLDER = "coverage";

const run = commands => {
  commands.forEach(command => execSync(command, {
    stdio: "inherit"
  }));
};

fs.emptyDirSync(REPORTS_FOLDER);
fs.copyFileSync(
  "cypress_coverage/coverage-final.json",
  `${REPORTS_FOLDER
  }/from-cypress.json`
);
fs.copyFileSync(
  "jest_coverage/coverage-final.json",
  `${REPORTS_FOLDER
  }/from-jest.json`
);

fs.emptyDirSync(".nyc_output");
fs.emptyDirSync(FINAL_OUTPUT_FOLDER);

run([
  `nyc report --reporter json --report-dir ${FINAL_OUTPUT_FOLDER} -t ${REPORTS_FOLDER}`
]);


fs.readFile(`${FINAL_OUTPUT_FOLDER}/coverage-final.json`, 'utf8', (err, data) => {
  if (err) throw err;
  const tempData = JSON.parse(data)
  let resData = {}
  for (item in tempData) {
    const splitKey = tempData[item].path.split("src")
    const relativePath = "src" + splitKey[1]
    tempData[item]["path"] = relativePath
    for (nestItem in tempData[item].s) {
      if (tempData[item].s[nestItem] === null) {
        delete tempData[item].s[nestItem]
      }
    }
    resData[relativePath] = tempData[item]
  }
  fs.emptyDirSync(REPORTS_FOLDER);
  fs.writeFile(`${REPORTS_FOLDER}/coverage-final.json`, JSON.stringify(resData, null, 2), (err) => {
    if (err) throw err;
  })
})