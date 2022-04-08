import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Modal,
  Pressable,
  button,
  Linking,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { notification } from "../../assets/style";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Button } from "react-native-paper";

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [scannData, setScannData] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannData(data);
    // Alert.alert(
    //   `Bar code with type ${type} and data ${data} has been scanned!`
    // );
  };

  if (hasPermission === null) {
    return (
      <Text style={{ marginTop: 100 }}>Requesting for camera permission</Text>
    );
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={notification.scanner}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject]}
      />
      {scanned ? undefined : (
        <View style={[notification.ditaction, notification.ocrloader]} />
      )}

      {scanned && (
        <>
          <View style={notification.centeredView}>
            <View style={notification.centeredView}>
              <View style={notification.modalView}>
                <Text
                  style={notification.reloadIcon}
                  onPress={() => setScanned(false)}
                >
                  <Ionicons name="reload" size={24} color="#fd248a" />
                </Text>
                <View style={notification.modalText}>
                  <Text style={notification.dataHeading}>
                    data has been scanned!{" "}
                  </Text>
                  {/* <Text>{scannData}</Text> */}
                  <Button
                    color="#fff"
                    style={notification.extarnalLink}
                    onPress={() => {
                      Linking.openURL(`${scannData}`);
                    }}
                  >
                    <Feather name="external-link" size={24} color="#fff" />
                    Click Here
                  </Button>
                </View>
              </View>
            </View>
            {/* <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(modalVisible);
              }}
            >
              
            </Modal> */}
            {/* <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>Show Modal</Text>
          </Pressable> */}
          </View>
        </>
      )}
      {/* {scanned ? undefined : (
        
      )} */}
    </View>
  );
}
