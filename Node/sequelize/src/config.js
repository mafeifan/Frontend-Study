module.exports = {
  mysql: {
    database: 'bird_mqtt',
    username: 'root',
    password: '',
    options: {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
      timezone: '+08:00',
      // logging: sql => {},
      operatorsAliases: false,
    },
    // 打印sql
    debug: true,
  },
}
