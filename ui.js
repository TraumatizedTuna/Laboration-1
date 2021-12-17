let ui;
/** Setup user interface */
function setupUi() {

    document.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            ui.next(ui.inputEl.value, ...ui.args);
        }
    });

    /** Methods and data related to the ui. */
    ui = {
        locEl: document.getElementById('loc'),
        infoEl: document.getElementById('info'),
        inputEl: document.getElementById('user-input'),
        next() { },
    
        /**
         * Update location in ui.
         * @param {string} locName - Name of location
         */
        setLoc(locName) {
            ui.locEl.innerText = locName;
        },
        /**
         * Ask user for input and use that input.
         * @param {string} info - Message to the user.
         * @param {function} next - Method to call when user hits enter.
         * @param  {...any} args - Extra arguments for callback.
         */
        userInput(info, next, ...args) {
            ui.next = next;
            ui.args = args;
            ui.infoEl.innerText = info;
            ui.inputEl.value='';
        }
    }
}