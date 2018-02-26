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
         * Init and render Kendo UI calendar
         */
        // $('#calendar-view').fullCalendar({
        //     dayClick: function(date, jsEvent, view) {
        //         that.dayClick(date, jsEvent, view, this);
        //     },
        //     dayRender: function(date, cell) { 
        //         that.dayRender(date, cell, this);
        //     },
        // });
    }

};
