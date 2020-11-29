const modulesFiles = require.context("./", true, /(\w+).vue$/);
// let module = {};
// modulesFiles.keys().forEach(filename => {
//   module[modulesFiles(filename).default.name] = modulesFiles(filename)
// });



const modules = modulesFiles.keys().reduce((modules, modulePath) => {
// 忽略第1个js
const moduleName = modulePath.replace(/^./(.*).\w+$/, ‘$1’)
// 执行modulesFiles函数，返回一个对象{default: {// 文件内容}, _esModule: true}
console.log(modulePath, modules)
const value = modulesFiles(modulePath)
modules[moduleName] = value.default
return modules
}, {})





// export default module
  