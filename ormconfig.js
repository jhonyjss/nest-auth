module.exports = {

    type: process.env.DB_CONNECTION || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    cache: {
        duration: 30000 // 30 seconds
    },
    cli: {
        migrationsDir: 'src/migrations'
    }

}