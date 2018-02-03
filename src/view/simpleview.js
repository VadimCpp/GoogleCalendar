/**
 * Class SimpleView renders calendar events.
 */
export default class SimpleView {
    
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
    }

    /**
     * @param {!Object} data
     * @public
     */
    render(data) {

        if (!data) {
            console.warn('SimpleView: cannot render null object. Skipped!');
            return;
        }

        /**
         * The maximum number of events allowed to display
         *
         * @const {!number}
         */
        const upcomingTopN = 10;

        /**
         * @type {!Element}
         */
        let element = document.getElementById(this._elementId);

        /**
         * @type {!Array}
         */
        let result = [];

        /**
         * @type {!Array}
         */
        let upcomingResultTemp = [];


        /**
         * @type {!Array}
         */
        let upcomingResult = [];

        /**
         * @type {!number}
         */
        let upcomingCounter = 0;

        // Remove cancelled events, sort by date
        result = data.items.filter(item => item && item.hasOwnProperty('status') && item.status !== 'cancelled').sort(this._comp).reverse();

        let i;

        for (i in result) {
            if (!this._isPast(result[i].end.dateTime || result[i].end.date)) {
                upcomingResultTemp.push(result[i]);
            }
        }

        upcomingResultTemp.reverse();

        for (i in upcomingResultTemp) {
            if (upcomingCounter < upcomingTopN) {
                upcomingResult.push(upcomingResultTemp[i]);
                upcomingCounter++;
            }
        }

        /**
         * @type {!string}
         */
        let innerHTML = '';

        for (i in upcomingResult) {
            innerHTML += this._transformToParagraph(upcomingResult[i]);
        }

        element.innerHTML = innerHTML;
    }

    /**
     * Check if date is later then now
     *
     * @param {!Date} date
     * @return {!boolean}
     * @private
     */
    _isPast(date) {
        /**
         * @type {!string}
         */
        let compareDate = new Date(date);

        /**
         * @type {!string}
         */
        let now = new Date();

        if (now.getTime() > compareDate.getTime()) {
            return true;
        }

        return false;
    };

    /**
     * Compare dates.
     *
     * @param {!Object} a
     * @param {!Object} b
     * @return {!number}
     * @private
     */
    _comp(a, b) {
        return new Date(a.start.dateTime || a.start.date).getTime() - new Date(b.start.dateTime || b.start.date).getTime();  
    }

    /**
     * Transforms record to a line
     *
     * @param {!Object} event
     * @return {!string}
     * @private
     */
    _transformToParagraph(event) {
        /**
         * @type {!string}
         */
        let retVal = '<p>';

        console.log(event);

        retVal += "TODO:";
        retVal += '</p>';

        return retVal;
    }

}
