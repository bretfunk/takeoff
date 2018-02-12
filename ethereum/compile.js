const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');
const buildPath = path.resolve(__dirname, 'build');

//delete the build folder contents
fs.removeSync(buildPath)
fs.ensureDirSync(buildPath)

//create file path
const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
//read file
const source = fs.readFileSync(campaignPath, 'utf8');
//output file
const output = solc.compile(source, 1).contracts;

//go through each contract and output the json file
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  );
}
