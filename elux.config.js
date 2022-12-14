//工程配置文件，参见 https://eluxjs.com/guide/configure.html
// eslint-disable-next-line import/no-extraneous-dependencies
const antdVars = require('@elux-admin-antd/stage/assets/css/antd-var.json');
const UnoCSS = require('unocss/webpack').default;
const { presetAttributify, presetIcons, presetWind, presetUno} = require('unocss');
// const {getLocalIP} = require('@elux/cli-utils');
const serverPort = 4003;
const apiHosts = {
  local: `http://127.0.0.1:3003/api/`,
  // local: `http://${getLocalIP()}:3003/api/`,
  demo: 'http://api-admin-demo.eluxjs.com/',
};
const APP_ENV = process.env.APP_ENV || 'local';
module.exports = {
  type: 'vue',
  cssProcessors: {less: {javascriptEnabled: true, modifyVars: antdVars}},
  all: {
    //开发和生成环境都使用的配置
    serverPort,
    clientGlobalVar: {
      ApiPrefix: apiHosts[APP_ENV],
      StaticPrefix: apiHosts[APP_ENV],
    },
    webpackConfigTransform: (config) => {
      //此处可以自定义webpack配置
      //console.log(config.module.rules[0]);
      config.plugins.unshift(
        UnoCSS({
          presets: [presetUno({})]
        })
      );
      return config;
    },
  },
  dev: {
    //开发环境专用配置
    eslint: false,
    stylelint: false,
    //要使用开发代理可以放开下面代码
    apiProxy: {
      '/api': {
        target: apiHosts[APP_ENV],
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
