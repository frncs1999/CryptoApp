const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios');
const ipc = electron.ipcRenderer
const exit = document.getElementById('exit')
const cryposite = document.getElementById('cryposite')
const shell = require('electron').shell
const notifyBtn = document.getElementById('notifyBtn')

let win

notifyBtn.addEventListener('click', function (event) {
  const modalPath = path.join('file://', __dirname, 'add.html')
	win = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true
		},
		alwaysOnTop: true, frame: false, width: 350, height: 250
	})
  win.on('close', function () { win = null })
  win.loadURL(modalPath)
  win.show()
})

var price = document.querySelector('h1')
var targetPriceVal;

const notification = {
	title: 'BTC Alert',
	body: 'BTC just beat your target price!',
	icon: path.join(__dirname, '../assets/images/Froyoshark-Enkel-Bitcoin.ico')
}

function getBTC() {
	axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
		.then(res => {
			const cryptos = res.data.BTC.USD
			price.innerHTML = '$' + cryptos.toLocaleString('en')

			if (targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.USD) {
				const myNotification = new window.Notification(notification.title, notification)
			}

		})
}

getBTC();
setInterval(getBTC, 30000);

var targetPrice = document.getElementById('targetPrice')

ipc.on('targetPriceVal', function (event, arg) {
	targetPriceVal = Number(arg);
	targetPrice.innerHTML = '$' + targetPriceVal.toLocaleString('en')
})


exit.addEventListener('click', function (event) {
	window.close()
	win.close()
})


cryposite.addEventListener('click', function (event) {
	shell.openExternal('http://coinmarketcap.com')
})