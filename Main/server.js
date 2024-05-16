const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
// const helpers = require('./utils/auth');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create();

const sess = {
  secret: 'Super secret secret',
  //cookie: {},

//expires after 24 hours

cookie: {
  // maxAge sets the maximum age for the cookie to be valid. Here, the cookie (and session) will expire after 24 hour. The time should be given in milliseconds.
  maxAge: 24 * 60 * 60 * 1000,
  // httpOnly tells express-session to only store session cookies when the protocol being used to connect to the server is HTTP.
  httpOnly: true,
  // secure tells express-session to only initialize session cookies when the protocol being used is HTTPS. Having this set to true, and running a server without encryption will result in the cookies not showing up in your developer console.
  secure: false,
  // sameSite tells express-session to only initialize session cookies when the referrer provided by the client matches the domain out server is hosted from.
  sameSite: 'strict',
},




  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
