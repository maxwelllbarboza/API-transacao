const { eventNames } = require('npmlog');
const app = require('./servidor');
app.listen(process.env.PORT || 3000);

