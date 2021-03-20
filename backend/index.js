const app = require('./src/app');
const sequelize = require('./src/general/database');

sequelize.sync();

app.listen(process.env.PORT || 8080, () => {
    console.log('App is running.');
});