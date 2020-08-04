const commander = require("commander")
const fs = require("fs-extra")
const path = require("path")
const replace = require("replace-in-file")
const {
  readData,
  writeData,
  cp,
  replaceTemp,
  FirstToUpperCase,
} = require("./utils/file")

const { args } = commander.parse(process.argv)
const tempBasePath = path.resolve(__dirname, "../temp")
const srcPath = path.resolve(__dirname, "../src")

const tempPathHash = {
  co: {
    type: "controller",
    tempPath: `${tempBasePath}/controller.template`,
  },
  s: {
    type: "service",
    tempPath: `${tempBasePath}/service.template`,
  },
  mo: {
    type: "module",
    tempPath: `${tempBasePath}/module.template`,
  },
}

if (!args.length) {
  throw new Error("请输入正确的参数")
}

if (args.length === 1) {
  // 直接生成整个模块
  const folderName = args[0]
  // 检查模块名字是否存在 存在就报错
  if (fs.existsSync(`${srcPath}/${folderName}`)) {
    throw new Error("文件夹已存在")
  }

  const pathArr = Object.keys(tempPathHash)
  for (const key of pathArr) {
    const { tempPath, type } = tempPathHash[key]
    const data = readData(tempPath)
    // 写入
    const newFilePath = `${srcPath}/${folderName}/${folderName}.${type}.ts`
    writeData(newFilePath, data)
    // 然后替换字符串
    // _NAME_
    const filePathArr = pathArr.map((v) => {
      return newFilePath
    })
    replaceTemp(
      filePathArr,
      ["_NAME_", "_CLASS_"],
      [folderName, FirstToUpperCase(folderName)]
    )
  }
}
