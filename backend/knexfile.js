module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: 'db', // 127.0.0.1
      user: 'userloja',
      password: 'root',
      database: 'dbloja',
      port: 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/src/database/migrations'
    },
    useNullAsDefault: true
  },


  staging: {
    client: 'postgresql',
    connection: {
      database: '',
      user: 'root',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};