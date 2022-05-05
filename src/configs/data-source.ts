import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const dbConfig = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    PORT: parseInt(process.env.DB_PORT!),
};

const AppDataSource = new DataSource({
    type: 'mysql',
    host: dbConfig.HOST || 'localhost',
    port: dbConfig.PORT || 3306,
    username: dbConfig.USER || 'root',
    password: dbConfig.PASSWORD || 'root',
    database: dbConfig.DB || 'chat',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
    migrations: ["migration/*.js"], 
    namingStrategy: new SnakeNamingStrategy(),
});

AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error));

export {
    AppDataSource
}