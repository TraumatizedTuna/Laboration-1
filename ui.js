let ui;
function setupUi() {

    document.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            ui.callback(ui.inputEl.value, ...ui.args);
        }
    });
    ui = {
        locEl: document.getElementById('loc'),
        infoEl: document.getElementById('info'),
        inputEl: document.getElementById('user-input'),

        callback() { },

        setLoc(content) {
            ui.locEl.innerText = content;
        },
        userInput(info, callback, ...args) {
            ui.callback = callback;
            ui.args = args;
            ui.infoEl.innerText = info;
            ui.inputEl.value='';
        }
    }
}