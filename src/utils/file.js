const fs = require("fs-extra")
const lodash = require("lodash")
const shell = require("shelljs")
const replace = require("replace-in-file")

function formatJson(data) {
  return JSON.stringify(data, null, 2)
}

function readData(_path) {
  return fs.readFileSync(_path, "utf-8")
}

function writeData(_path, data) {
  fs.outputFileSync(_path, data, {
    encoding: "utf8",
  })
}

function cp(oldPath, newPath) {
  fs.copySync(oldPath, newPath)
}

function replaceTemp(files, propsFrom, propsto) {
  const options = {
    files,
  }
  options.from = propsFrom.map((key) => new RegExp(key, "g"))
  options.to = propsto
  replace.sync(options)
}

function FirstToUpperCase(v) {
  return v.replace(/^\S/, (s) => s.toUpperCase())
}

module.exports = {
  formatJson,
  readData,
  writeData,
  cp,
  replaceTemp,
  FirstToUpperCase
}
