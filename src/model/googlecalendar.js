/**
 * Class only loads GoogleCalendar data.
 */
export default class GoogleCalendar {

    constructor(requestConfig) {

        /**
         * @type {!string}
         * @private
         */
        this._calendarUrl = 'https://www.googleapis.com/calendar/v3/calendars/' 
            + requestConfig.calendarId 
            + '/events?key=' 
            + requestConfig.apiKey,

        /**
         * @type {!string}
         * @private
         */
        this._timeMin = '2016-06-03T10:00:00-07:00';

        /**
         * @type {!string}
         * @private
         */
        this._timeMax = '2020-06-03T10:00:00-07:00';

        /**
         * @type {!boolean}
         * @private
         */
        this._recurringEvents = true;

        /**
         * @type {!Object}
         * @private
         */
        this._data = null;
    }

    /**
     * Gets JSON from Google Calendar and transfroms it into html list items and appends it to past or upcoming events list
     * @param { !function( !boolean, ?Object ) }
     * @public
     */
    load(callback) {

        /**
         * @type {!string}
         */
        let finalURL = this._calendarUrl;

        finalURL = finalURL.concat('&singleEvents=true&orderBy=starttime');
        finalURL = finalURL.concat('&timeMin=' + this._timeMin);
        finalURL = finalURL.concat('&timeMax=' + this._timeMax);
        
        /**
         * @type {!XMLHttpRequest}
         */
        let request = new XMLHttpRequest();

        request.open('GET', finalURL, true);
        
        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {

                this._data = JSON.parse(request.responseText);;
                callback(true, this._data);
            } else {
                console.error(err);
                callback(false, null);
            }
        };
        
        request.onerror = () => {
            console.error(err);
            callback(false, null);
        };
        
        request.send();
    };

    /**
     * @return {?Object}
     * @public
     */
    getData() {
        return this._data;
    }

};
