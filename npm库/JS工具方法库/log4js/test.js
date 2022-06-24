/*
 * @Author: huangyingli
 * @Date: 2022-06-24 14:25:30
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-06-24 15:23:53
 * @Description:
 */

const log4js = require('log4js');

log4js.configure({
  /* 用来定义日志类型 */
  appenders: {
    console: {
      /**
       * log4js 应用于nodejs
       * 由于nodejs 是使用v8的, 所以频繁的使用console可能使其崩溃
       * 这里推荐使用 stdout 类型 而不是 console
       */
      type: 'stdout',
    },
    info: {
      type: 'file',
      filename: './log/info.log',
    },
    warn: {
      type: 'file',
      filename: './log/warn.log',
    },
    error: {
      type: 'file',
      filename: './log/error.log',
    },
    fatal: {
      type: 'file',
      filename: './log/fatal.log',
    },
  },

  /* 定义日志类型, 通过getLogger 使用指定的日志类型  */
  categories: {
    /* 日志级别 ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK  */
    /* 在这里配置可以以小写形式 */
    default: { appenders: ['console'], level: 'info' },
    info: { appenders: ['console', 'info'], level: 'info' },
    warn: { appenders: ['console', 'warn'], level: 'warn' },
    error: { appenders: ['console', 'error'], level: 'error' },
    fatal: { appenders: ['console', 'fatal'], level: 'fatal' },
  },
});

const log = {
  /* 对应的level只能使用对应的方法 */
  info: log4js.getLogger('info').info.bind(log4js.getLogger('info')),
  warn: log4js.getLogger('warn').warn.bind(log4js.getLogger('warn')),
  error: log4js.getLogger('error').error.bind(log4js.getLogger('error')),
  fatal: log4js.getLogger('fatal').fatal.bind(log4js.getLogger('fatal')),
};

/* 文件写入是接在末尾写入 */

log.info('info message: hello world');

log.warn('warn message: hello world');

log.error('error message: hello world');

log.fatal('fatal message: hello world');
