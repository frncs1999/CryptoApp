const electron = require('electron')
const remote = electron.remote
const closeBtn = document.getElementById('closeButton')
const ipc = electron.ipcRenderer

closeBtn.addEventListener('click', function (event) {
    var window = remote.getCurrentWindow()
    window.close()
})

const updateBtn = document.getElementById('updateBtn')

updateBtn.addEventListener('click', function () {
    ipc.send('update-notify-value', document.getElementById('notifyVal').value)

    // Close this window
    var window = remote.getCurrentWindow();
    window.close();
})