import GoogleCalendar from './model/googlecalendar.js';
import SimpleView from './view/simpleview.js';

/**
 * Class representing an App.
 */
class App {

    /**
     * @param {{ apiKey: !string, calendarId: !string }} config
     * @public
     */
    constructor(config) {
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
        
        // TODO:
    }

    /**
     * Update the schedule.
     * @public
     */
    updateSchedule() {
        this.disableLoadButton();
        this.displayProgress();
        this.hideError();

        this._googleCalendar.load((success) => {
            if (success) {
                this.hideProgress();
                this.enableLoadButton();
                this.displayData();
            } else {
                this.hideProgress();
                this.enableLoadButton();
                this.displayError();
            }
        });
    }

    /**
     * @public
     */
    disableLoadButton() {
        document.getElementById('btn-load').classList.add('disabled');
    }

    /**
     * @public
     */
    enableLoadButton() {
        document.getElementById('btn-load').classList.remove('disabled');
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
         * @type {!SimpleView}
         */
        let simpleView = new SimpleView('simple-view');

        simpleView.render(this._googleCalendar.getData());
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
let app = new App({ apiKey, calendarId });

window.onload = () => {
    app.start();
};
