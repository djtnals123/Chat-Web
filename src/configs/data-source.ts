import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'chat',
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