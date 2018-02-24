const routes = require('next-routes')();

routes.add('/campaigns/new', '/campaigns/new')
routes.add('/campaigns/active', '/campaigns/active')
routes.add('/campaigns/hot', '/campaigns/hot')
routes.add('/campaigns/expired', '/campaigns/expired')
routes.add('/campaigns/editors', '/campaigns/editors')
routes.add('/campaigns/soon', '/campaigns/soon')
routes.add('/campaigns/:address', '/campaigns/show')
routes.add('/about', '/about');

module.exports = routes;
