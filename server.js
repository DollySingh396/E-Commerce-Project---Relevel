
const express = require('express');
const app = express();

const serverConfigs = require('./configs/server.config');

app.listen(serverConfigs.PORT, () => {
    console.log(`Application is running on port number: ${serverConfigs.PORT}`)
});