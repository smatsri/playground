const { generateApi } = require('swagger-typescript-api');
const path = require("path");
const fs = require("fs");



generateApi({
  name: "online-xo.ts",
  output: path.resolve(process.cwd(), "../src/__generated__/onlinexo"),
  input: path.resolve(process.cwd(), './apis/online-xo.json'), 
  httpClientType: "axios"
})