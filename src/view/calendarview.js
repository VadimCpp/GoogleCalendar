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
         * @type {?Object} data
         * @private
         */
        this._data = null;

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

        that._data = data;

        /**
         * Init and render fullcalendar.io
         */
        $('#calendar-view').fullCalendar({
            dayClick: function(date, jsEvent, view) {
                that.dayClick(date, jsEvent, view, this);
            },
            dayRender: function(date, cell) { 
                that.dayRender(date, cell, this);
            },
        });
    }

    /**
     * @param {!Object} data
     * @param {!Object} jsEvent
     * @param {!Object} view
     * @param {!Object} el
     * @public
     */
    dayClick(date, jsEvent, view, el) {
        console.log('Clicked on el: ', el);

        console.log('Clicked on: ' + date.format());

        console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

        console.log('Current view: ' + view.name);

        // change the day's background color just for fun
        // $(el).css('background-color', 'red');
        // TODO:
    }

    /**
     * @param {!Object} data
     * @param {!Object} cell
     * @param {!Object} el
     * @public
     */
    dayRender(date, cell, el) {

        /**
         * @type {?boolean}
         */
        let eventsFound = false;

        /**
         * @type {!Array}
         */
        let events = [];

        /**
         * @type {!number}
         */
        let i;

        for(i = 0; i < this._data.items.length; i++) {
            
            /**
             * @type {!Object}
             */
            let e = this._data.items[i];

            if (moment(e.start.dateTime).format("YYYY-MM-DD") == date.format()) {
                events.push(e);
                eventsFound = true;
            }
        }

        if (eventsFound) {
            $(cell).css('position', 'relative');
            $(cell).html('<div class="event">🍺</div>');
        }
    }

};
