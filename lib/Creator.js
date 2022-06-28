const inquirer = require('inquirer');
const util = require('util');
const path = require('path')
const downloadGitRepo = require('download-git-repo');
const loading = require('./loading')
const { exec } = require('child_process')

class Creator {
  // 项目名称及项目路径
  constructor(name, target) {
    this.name = name;
    this.target = target;
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }
  // 创建项目部分
  create() {
    inquirer
      .prompt([
        {
          name: 'chooseProject',
          // 多选交互功能，
          // 单选将这里修改为 list 即可
          type: 'list',
          message: 'choose project which you want to download',
          choices: [
            {
              name: 'webpack-test',
              checked: true,
            },
            {
              name: 'vue',
            },
          ],
        },
      ])
      .then((data) => {
        // 模板下载地址
        // const templateUrl = `https://github.com/kljfy/test-cli.git`;
        const templateUrl = `kljfy/${data.chooseProject}`;
        //调用 downloadGitRepo 方法将对应模板下载到指定目录
        loading(
          'downloading project, please wait',
          this.downloadGitRepo,
          templateUrl,
          this.target,
          {
            clone: true
          }
        );
      });
  }
}

module.exports = Creator;
