const routes = require('next-routes')();

routes.add('/campaigns/new', '/campaigns/new')
routes.add('/campaigns/:address', '/campaigns/show')
routes.add('/about', '/about');

module.exports = routes;
