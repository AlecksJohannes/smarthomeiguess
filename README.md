# Project Smarthome.

### How to setup:


- Before let's start by pulling this project, in your console or terminal type `git pull git@github.com:AlecksJohannes/smarthomeiguess.git`
- cd in your folder and type in your terminal `yarn` or `npm` to install the project's dependencies.
- After that, you can use this gist to setup the arduino code https://gist.github.com/AlecksJohannes/7df03e4fd67015482abae1ea0a9dfa89
- If everything is ready, you should prepare a real device `iOS` or  `Android` and run this command `react-native run-android`.

### Code documentation.
- Remember to turn on  Bluetooth first

- Prepare our state 
`this.state = { data: {} }`

- Started by init  the bluetooth first as always

```jsx
var config = {
  "uuid": "00001101-0000-1000-8000-00805f9b34fb", // device uuid
  "deviceName": "Bluetooth Example Project",// example name
  "bufferSize": 1024, // data size when transmiting
  "characterDelimiter": "\n" // detect end of data
}
EasyBluetooth.init(config)
.then(function (config) {
 console.log('config initialized')
})
.catch(function (ex) {
  console.warn(ex);
});

```
- startScanning for each devices.

```jsx
EasyBluetooth.startScan()
.then(function (devices) {
 console.log(devices)
}).catch(function (ex) {
  console.warn(ex);
});
```

- We should bind events to those function, the reason why because we need to know whether an device is found, or is being connected, or on sending data. Those are events and we can bind them into our app

Here are 4 basic events.

```js
onDeviceFound(device) {
  if (device.name === 'AlecksBluetooth') {
    EasyBluetooth.connect(device)
    .then(() => {
      alert("Connected!");
    })
    .catch((ex) => {
      console.warn(ex);
    })
  }
  console.log(device);
}

onStatusChange(status) {
  console.log("onStatusChange");
  console.log(status);
}

onDataRead(data) {
  console.log("onDataRead");
  console.log(data);
  this.setState({ data: JSON.parse(data) })
}

onDeviceName(name) {
  console.log("onDeviceName");
  console.log(name);
}
```

- For this code, every time the device is founded by scanning. We can use this piece of code to find our device name and automatically connect them
```js
onDeviceFound(device) {
  if (device.name === 'AlecksBluetooth') { // If device name is matched 
    EasyBluetooth.connect(device) // then connect to it 
    .then(() => {
      alert("Connected!");
    })
    .catch((ex) => {
      console.warn(ex);
    })
  }
  console.log(device);
}
```

- If we disconnected our app, we should disconnect those function as well to save battery.

```js
componentWillUnmount() {
    this.onDeviceFoundEvent.remove();
    this.onStatusChangeEvent.remove();
    this.onDataReadEvent.remove();
    this.onDeviceNameEvent.remove();
}
```

- Now lets display our data
```
<Text> Current Temperature </Text>
  <Text>temp: { this.state.data['temp']} in Degree Celcius</Text>
  <Text>humid: { this.state.data['hum']} in percentage</Text>
</Text>
```
