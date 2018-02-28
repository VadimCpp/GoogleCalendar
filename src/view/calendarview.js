/**
 * Class CalendarView renders full calendar.
 */
export default class CalendarView {
    
    /**
     * @param {!string} elementId
     * @public
     */
    constructor(elementId) {

        /**
         * @type {!string}
         * @private
         */
        this._elementId = elementId;

        /**
         * @type {?Object}
         * @private
         */
        this._data = null;

        /**
         * @type {?function}
         * @private
         */
         this._onDateChangedCallback = null;
    }

    /**
     * @param {!Object} data
     * @public
     */
    render(data) {
        /**
         * @type {!CalendarView}
         */
        let that = this;

        /**
         * @type {!Date}
         */
        const today = new Date();

        that._data = data;

        console.log('TEST');
        console.log(data);

        let events = that.getEvents();

        console.log('events', events)
        /**
         * Init and render Kendo UI calendar
         */
        $('#calendar-view').kendoCalendar({
            value: today,
            change: function() {
                if (that._onDateChangedCallback) {
                    that._onDateChangedCallback(this.value());
                }
            },
            dates: events,
            month: {
                content: 
                    '<div class="' +
                        '# if ($.inArray(moment(data.date).format("YYYY-MM-DD"), data.dates) != -1) { #' +
                            'calendar-events' + 
                        '# } else { #' +
                            'calendar-no-events' + 
                        '# } #' +
                    '">#= data.value # </div>'
                    
            }
        });
    }


    /**
     * @param {function} cb
     * @public
     */
    onDateChanged(cb) {
        this._onDateChangedCallback = cb;
    }


    /**
     * Return array of dates when event happens.
     * If no events empty array is returned.
     *
     * @param {Date} date
     * @return {Array}
     * @public
     */
    getEvents() {
        /**
         * @type {Array}
         */
        let events = [];

        if (this._data && this._data.items && this._data.items.length) {
            /**
             * @type {number}
             */
            let length = this._data.items.length;

            for (let i = 0; i < length; i++) {
                /**
                 * @type {number}
                 */
                let item = this._data.items[i];

                /**
                 * @type {string}
                 */
                let started = moment(item.start.dateTime).format("YYYY-MM-DD");

                if (events.indexOf(started) == -1) {
                    events.push(started);
                }
            }
        }

        return events;
    }


    /**
     * Return number of events which happens on the specified date.
     * If no events found returns 0.
     *
     * @param {Date} date
     * @return {number}
     * @public
     */
    getEventsNo(date) {

        /**
         * @type {string}
         */
        let momentDate = moment(date).format("YYYY-MM-DD");

        /**
         * @type {number}
         */
        var retVal = 0;

        if (this._data && this._data.items && this._data.items.length) {
            /**
             * @type {number}
             */
            let length = this._data.items.length;

            for (let i = 0; i < length; i++) {
                /**
                 * @type {number}
                 */
                let item = this._data.items[i];

                /**
                 * @type {string}
                 */
                let started = moment(item.start.dateTime).format("YYYY-MM-DD");

                if (started == momentDate) {
                    retVal++;
                }
            }
        }

        return retVal;
    }
};
