import GoogleCalendar from './model/googlecalendar.js';
import SimpleView from './view/simpleview.js';
import DetailedView from './view/detailedview.js';
import CalendarView from './view/calendarview.js';

/**
 * Class representing an App.
 */
class App {

    /**
     * @param {{ apiKey: !string, calendarId: !string }} config
     * @public
     */
    constructor(config) {

        let that = this;

        /**
         * @type {!GoogleCalendar}
         * @private
         */
        this._googleCalendar = new GoogleCalendar({ apiKey, calendarId });
    }

    /**
     * Request Google Calendar data and render information.
     *   
     * @public
     */
    start() {
        var that = this;

        document.getElementById('btn-load').addEventListener('click', function(e) {
            that.updateSchedule();
        });

        that.updateSchedule();
    }


    /**
     * Update the schedule.
     * @public
     */
    updateSchedule() {
        this.disableButtons();
        this.displayProgress();
        this.hideError();

        this._googleCalendar.load((success) => {
            if (success) {
                this.hideProgress();
                this.enableButtons();
                this.displayData();
            } else {
                this.hideProgress();
                this.enableButtons();
                this.displayError();
            }
        });
    }

    /**
     * @public
     */
    disableButtons() {
        document.getElementById('btn-load').classList.add('disabled');
        document.getElementById('btn-copy').classList.add('disabled');
    }

    /**
     * @public
     */
    enableButtons() {
        document.getElementById('btn-load').classList.remove('disabled');
        document.getElementById('btn-copy').classList.remove('disabled');
    }

    /**
     * @public
     */
    displayProgress() {
        document.getElementById('view-progress').classList.remove('container_hidden');
    }

    /**
     * @public
     */
    hideProgress() {
        document.getElementById('view-progress').classList.add('container_hidden');
    }

    /**
     * @public
     */
    displayError() {
        document.getElementById('view-error').classList.remove('container_hidden');
    }

    /**
     * @public
     */
    hideError() {
        document.getElementById('view-error').classList.add('container_hidden');
    }


    displayData() {
        /**
         * @type {App}
         */
        const that = this;

        /**
         * @type {!SimpleView}
         */
        let simpleView = new SimpleView('simple-view');

        simpleView.render(that._googleCalendar.getData());

        /**
         * @type {!DetailedView}
         */
        let detailedView = new DetailedView('detailed-view');

        detailedView.render(that._googleCalendar.getData());

        /**
         * @type {!CalendarView}
         */
        let calendarView = new CalendarView('calendar-view');

        calendarView.render(that._googleCalendar.getData());
        calendarView.onDateChanged((date) => { 
            simpleView.render(that._googleCalendar.getData(), date);
            detailedView.render(that._googleCalendar.getData(), date);
        });
    }
}

/**
 * From Google Developer Console
 * @type {!string}
 */
let apiKey = "AIzaSyBOXnnT1F-h9s1FP3063BQ_o0KtD7Y0DPs";

/**
 * From Google Calendar Web App
 * @type {!string}
 */
let calendarId = "dveenjcu4k5ktd3k8pv4iul2bk@group.calendar.google.com";

/**
 * @type {!App}
 */
let app;

window.onload = () => {
    app = new App({ apiKey, calendarId });
    app.start();
};
