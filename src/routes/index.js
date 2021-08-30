// Copyright (C) 2018 Berkadia Commercial Mortgage, LLC - All Rights Reserved
 import fs from 'fs';

export const Router = {
  build(app) {
    const routes = fs.readdirSync(__dirname)
      .filter(file => file !== 'index.js')
      .filter(file => file.match(/^(?!.*\.test\.js$).*\.js$/))
      .map(file => file.split('.')[0]);

    routes.forEach(route => {
      app.use(`/${route}`, this.importSubRouter(`./${route}.js`));
    });
  },
  importSubRouter(filePath) {
    return require(filePath);
  }
};
