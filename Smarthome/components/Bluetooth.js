import React, { Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import EasyBluetooth from 'easy-bluetooth-classic';

class Bluetooth extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {} }
  }

  componentWillMount () {
    var config = {
        "uuid": "00001101-0000-1000-8000-00805f9b34fb",
        "deviceName": "Bluetooth Example Project",
        "bufferSize": 1024,
        "characterDelimiter": "\n"
      }

      EasyBluetooth.init(config)
        .then(function (config) {
        })
        .catch(function (ex) {
          console.warn(ex);
        });

      EasyBluetooth.startScan()
          .then(function (devices) {
          })
          .catch(function (ex) {
            console.warn(ex);
          });
  }

  componentDidMount() {
    this.onDeviceFoundEvent = EasyBluetooth.addOnDeviceFoundListener(this.onDeviceFound.bind(this));
    this.onStatusChangeEvent = EasyBluetooth.addOnStatusChangeListener(this.onStatusChange.bind(this));
    this.onDataReadEvent = EasyBluetooth.addOnDataReadListener(this.onDataRead.bind(this));
    this.onDeviceNameEvent = EasyBluetooth.addOnDeviceNameListener(this.onDeviceName.bind(this));
  }

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

componentWillUnmount() {
    this.onDeviceFoundEvent.remove();
    this.onStatusChangeEvent.remove();
    this.onDataReadEvent.remove();
    this.onDeviceNameEvent.remove();
}


  render() {
    return (
      <View>
        <Text> Current Temperature </Text>

        <Text>temp: { this.state.data['temp']} in Degree Celcius</Text>
        <Text>humid: { this.state.data['hum']} in percentage</Text>
      </View>
    );
  }
}

export default Bluetooth;
