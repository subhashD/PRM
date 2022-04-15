const moment = require('moment');

class DateHelper {
    static format = (datetime = null, fromFormat = "DD/MM/YYYY", toFormat = "YYYY-MM-DD") => {
        if(datetime == null) {
            return moment().format(toFormat);
        }
        return moment(datetime, fromFormat).format(toFormat);
    }
}

module.exports = DateHelper;