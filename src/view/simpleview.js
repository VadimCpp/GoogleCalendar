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
        let innerHTML = '<h1 class="h2"> Анонс мероприятий </h1>';

        for (i in upcomingResult) {
            innerHTML += this._transformToParagraph(upcomingResult[i]);
        }

        innerHTML += '<p> Подробнее на сайте ➡️  <a href="http://events4friends.vadimcpp.ru/">http://events4friends.vadimcpp.ru/</a> </p>';

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

        /**
         * @type {!Array}
         */
        let dateStart = this._getDateInfo(event.start.dateTime || event.start.date);

        retVal += this._getSimpleFormattedDate(dateStart);;
        retVal += ' － ';
        retVal += '«' + event.summary + '»';
        retVal += ', ';

        retVal += this._getSimpleLocation(event.location || ''),

        retVal += '</p>';

        return retVal;
    }

    /**
     * Get temp array with information abou day in followin format: [day number, month number, year, hours, minutes]
     *
     * @type {!string} startDate
     * @return {!Array}
     * @private
     */
    _getDateInfo(startDate) {
        /**
         * @type {!Date}
         */
        let date = new Date(startDate);

        return [date.getDate(), date.getMonth(), date.getFullYear(), date.getHours(), date.getMinutes(), 0, 0];
    };


    /**
     * @type {!Array} dateStart
     * @return {!string} - date, month, day, time
     * @private
     */
    _getSimpleFormattedDate(dateStart) {
        /**
         * @type {!string}
         */        
        let formattedTime = '🕗&nbsp;&nbsp;' + this._getFormattedTime24(dateStart);
            
        /**
         * @type {!string}
         */  
        let dayNameStart = this._getDayNameFormatted(dateStart);

        return '📅&nbsp;&nbsp;' + dateStart[0] + ' ' + this._getMonthName(dateStart[1]) + ', ' + dayNameStart + ' ' + formattedTime;
    }

    /**
     * @type {!Array} date
     * @return {!string} - hh:mm
     * @private
     */
    _getFormattedTime24(date) {
        var formattedTime = '',
            hour = date[3],
            minute = date[4];

        // Ensure 2-digit minute value.
        minute = (minute < 10 ? '0' : '') + minute;

        // Ensure 2-digit hour value.
        hour = (hour < 10 ? '0' : '') + hour;

        // Format time.
        formattedTime = hour + ':' + minute;

        return formattedTime;
    }

    /**
     * @type {!Array} dateFormatted
     * @return {!string} - ????
     * @private
     */
    _getDayNameFormatted(dateFormatted) {

        return this._getDayName(this._getDateFormatted(dateFormatted).getDay()) + ' ';

    }
    
    /**
     * @type {!number} day
     * @return {!string} - week day
     * @private
     */        
    _getDayName(day) {

        /**
         * @type {!Array}
         */        
        let dayNames = [
            'воскресенье', 
            'понедельник', 
            'вторник', 
            'среда', 
            'четверг', 
            'пятница', 
            'суббота'
        ];

        return dayNames[day];
    };    

    /**
     * @type {!Array} dateInfo
     * @return {!Date}
     * @private
     */        
    _getDateFormatted(dateInfo) {

        return new Date(dateInfo[2], dateInfo[1], dateInfo[0], dateInfo[3], dateInfo[4] + 0, 0);

    }

    /**
     * Get month name according to index.
     *
     * @type {!number} month
     * @return {!string}
     * @private
     */      
    _getMonthName(month) {

        /**
         * @type {!Array}
         */      
        let monthNames = [
            'января', 
            'февраля', 
            'марта', 
            'апреля', 
            'мая', 
            'июня', 
            'июля', 
            'августа', 
            'сентября', 
            'октября', 
            'ноября', 
            'декабря'
        ];

        return monthNames[month];
    };

    /**
     * @type {!string} location
     * @return {!string}
     * @private
     */   
    _getSimpleLocation(location) {

        /**
         * @type {!string}
         */  
        let simpleLocation = '';

        /**
         * @type {!number}
         */  
        let secondCommaPosition = location.indexOf(',', location.indexOf(',', 0) + 1);

        if (secondCommaPosition > 0) {
          simpleLocation = location.substr(0, secondCommaPosition);
        }

        return '📍&nbsp;&nbsp;' + simpleLocation;
    }


}
