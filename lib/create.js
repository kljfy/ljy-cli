const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const Creator = require('./Creator');
// 当前函数中可能存在很多异步操作，因此我们将其包装为 async
module.exports = async function (projectName, options) {
  // 创建 create 命令时我们配置了 --force 参数，意为强制覆盖。那我们我们在创建一个项目目录时，就会出现三种情况:
  // 1、创建项目时使用 --force 参数，不管是否有同名目录，直接创建
  // 2、未使用 --force 参数，且当前工作目录中不存在同名目录，直接创建
  // 3、未使用 --force 参数，且当前工作目录中存在同名项目，需要给用户提供选择，由用户决定是取消还是覆盖

  // 梳理一下这部分的实现逻辑:
  // 1、通过 process.cwd 获取当前工作目录，然后拼接项目名得到项目目录
  // 2、检查是否存在同名目录
  // 3、存在同名目录
  //     用户创建项目时使用了 --force 参数，直接删除同名目录
  //     未使用 --force 参数，给用户提供交互选择框，由用户决定
  // 4、不存在同名目录，继续创建项目

  //获取当前工作目录
  const cwd = process.cwd();
  //拼接得到项目目录
  const targetDirectory = path.join(cwd, projectName);
  //判断目录是否存在
  if (fs.existsSync(targetDirectory)) {
    //判断使用 --force 参数
    if (options.force) {
      //删除重名目录（remove是个异步方法）
      await fs.remove(targetDirectory);
    } else {
      let { isOverwrite } = await inquirer.prompt([
        {
          name: 'isOverwrite', //与返回值对应
          type: 'list',
          message: 'Target directory exists, Please choose an action',
          choices: [
            {
              name: 'Overwrite',
              value: true,
            },
            {
              name: 'Cancel',
              value: false,
            },
          ],
        },
      ]);
      // 选择 Cancel
      if (!isOverwrite) {
        console.log('Cancel');
        return;
      } else {
        // 选择 Overwrite ，先删除原有重名目录
        console.log('\r\n removing');
        await fs.remove(targetDirectory);
      }
    }
  }
  const creator = new Creator(projectName, targetDirectory);
  creator.create();
};
