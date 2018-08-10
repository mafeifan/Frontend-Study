module.exports = {
  mysql: {
    database: 'riot_match_local',
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
    debug: true,
  },
}
