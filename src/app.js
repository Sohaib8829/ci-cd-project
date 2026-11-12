const path = require('path');
const express = require('express');
const pagesRouter = require('./routes/pages');
const apiRouter = require('./routes/api');

function createApp() {
  const app = express();

  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.get('/health', (req, res) => {
    res.json({ status: 'ok', version: process.env.APP_VERSION || 'dev' });
  });

  app.use('/api', apiRouter);
  app.use('/', pagesRouter);

  app.use((req, res) => {
    res.status(404).render('404', { title: 'Not found' });
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
      return res.status(400).json({ error: 'Invalid JSON' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  });

  return app;
}

module.exports = { createApp };
