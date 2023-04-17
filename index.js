const mongoose = require('mongoose');
const {DB_USER,
    DB_PASSWORD,
    DB_HOST,
    API_VERSION,
    IP_SERVER} = require('./constants');

const APP = require('./app');

const PORT = process.env.POST || 3977;

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`, 
    (error) => {
        if (error)  {
            throw error
        }else {
            APP.listen(PORT, ()=> {
                console.log(`listening on port ${PORT}`);
                console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
            })
        }
    }
);