const express = require('express')

;(async () => {

    const app = express();
    const port = process.env.PORT || 3334;
    const path = require('path');

    app.use(express.static(__dirname + '/dist/'));

    app.get('*', function (request, response) {
        response.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });

    app.listen(port, () => {
        console.log(`Static frontend server started at http://localhost:${port}/`);
    });

})();
