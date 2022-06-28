#! /usr/bin/env node
// #! 符号的名称叫 Shebang，用于指定脚本的解释程序

// commander —— 命令行指令配置
const program = require('commander');
// 解析用户执行时输入的参数

// version 方法可以配置版本信息提示
// name 和 usage 方法分别配置 cli 名称和 --help 第一行提示
program
  .name('demo')
  .usage(`<command> [option]`)
  .version(`demo-cli ${require('../package.json').version}`);
program
  .command('create <project-name>')
  .description('create a new project')
  .option('-f, --force', 'overwrite target directory if it exists')
  .action((projectName, cmd) => {
    // 处理用户输入create 指令附加的参数
    require("../lib/create")(projectName, cmd);
  });
// 配置 config 命令
program
  .command('config [value]')
  .description('inspect and modify the config')
  .option('-g , --get <key>', 'get value by key')
  .option('-s, --set <key> <value>', 'set option[key] is value')
  .option('-d, --delete <key>', 'delete options by key')
  .action((value, keys) => {
    console.log(value, keys);
  });

// 监听 --help 指令
program.on('--help', function () {
  // 前后两个空行调整格式，更舒适
  console.log();
  console.log(' Run zc-cli <command> --help for detailed usage of given command.');
  console.log();
});

program.parse(process.argv);

// chalk 命令行美化工具
// chalk 可以美化我们在命令行中输出内容的样式，例如实现多种颜色，花里胡哨的命令行提示等
// const chalk = require('chalk');
// console.log(`hello ${chalk.blue('world')}`);
// console.log(chalk.blue.bgRed.bold('hello world!'));
// console.log(
//   chalk.green('I am a green line ' + chalk.blue.underline.bold('with a blue substring') + ' that becomes green again!')
// );

// inquirer —— 命令行交互工具
// 在使用 vue create 命令时，其中有一个步骤是交互式用户选择，这个交互式功能就是由 inquirer 实现的。
// inquirer 支持 Confirm 确认，List 单选，Checkbox 多选等多种交互方式。
// 这里我们来模拟实现 vue 的多选功能:
// const inquirer = require('inquirer');
// inquirer.prompt([
//   {
//     name: 'vue',
//     // 多选交互功能，
//     // 单选将这里修改为 list 即可
//     type: 'checkbox',
//     message: 'Check the features needed for your project',
//     choices: [
//       {
//         name: 'Babel',
//       },
//       {
//         name: 'TypeScript',
//       },
//       {
//         name: 'Progressive Web App(PWA) Support',
//       },
//       {
//         name: 'Router',
//       },
//     ],
//   },
// ]).then((data) => {
//   console.log(data);
// });

// ora —— 命令行 loading 效果
// 利用 ora 来实现一个简单的命令行 loading 效果
// const ora = require("ora")
// 定义一个loading
// const spinner = ora("Loading unicorns")
// 启动loading
// spinner.start();
// setTimeout(() => {
//   spinner.color = "yellow";
//   spinner.text = "Loading rainbows"
// }, 1000);
// loading成功
// spinner.succeed();
// loading失败
// spinner.fail();
