import React, { Component } from "react";
import { StyleSheet, View, Button, TouchableHighlight, Alert,Text,SafeAreaView,VirtualizedList, TextInput,TouchableOpacity } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import SimpleLineIconsIcon from "react-native-vector-icons/SimpleLineIcons";
import  {launchImageLibrary, launchCamera} from 'react-native-image-picker';
// ###for image compression when uploaded from this test app
import { Image } from 'react-native-compressor';
import {createStore} from 'redux';


const openCameraAlert = () =>
    Alert.alert('Not Available', 'This feature is not implemented yet', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  const uploadImagesAlert = () =>
    Alert.alert('Not Available', 'This feature is not implemented yet', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);


const getItem = (data, index) => ({
  id: data[parseInt(index)].id,
  machine_name: data[parseInt(index)].machine_name,
  machine_reading: data[parseInt(index)].machine_reading,
});

// ### handels image compression
// const result = await Image.compress('file://path_of_file/image.jpg', {
//   maxWidth: 1000,
//   quality: 0.8,
// });
// input handler for adding a new machine
const App = () => {
  const openCameraAlert = () =>
    Alert.alert('Not Available', 'This feature is not implemented yet', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  const uploadImagesAlert = () =>
    Alert.alert('Not Available', 'This feature is not implemented yet', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);

  // ### Machine Redux State declaration
  const addNewMachine = (machinedata)=> {
      return{
        type: 'ADDNEWMACHINE',
         machinedata
      };
  };
  const addMachine = ()=> {
      return{
        type: 'ADDDEFAULTMACHINE',
        
      };
  };
  const delMachine = ()=> {
      return{
        type: 'DELTHISMACHINE'
      };
  };
  // Machine Redux Reducer with initial values for testing data
  function nextdataMId(dataMs) {
  const maxId = dataMs.reduce((maxId, dataM) => Math.max(dataM.id, maxId), -1)
  return maxId + 1
}
  const initialState = {dataM:[
  {
  machine_name: "Hulk 5000",
  machine_reading: 5000,
  number_of_images: 8,
  id: 1
},
{
  machine_name: "Hulk 4008",
  machine_reading: 3500,
  number_of_images: 7,
  id: 2
},
{
  machine_name: "Hulk 5007",
  machine_reading: 1800,
  number_of_images: 16,
  id: 3
  
},
{
  machine_name: "Hulk 5005",
  machine_reading: 1700,
  number_of_images: 16,
  id: 4
  
}
]}
  const machines = (state = initialState, action) =>{
    switch(action.type){
      case 'ADDDEFAULTMACHINE':
        return{
          ...state
        }
      case 'ADDNEWMACHINE':
        return{
          ...state,
          dataM:[
            ...state.dataM,{
              machine_name: action.machinedata.machine_name,
              machine_reading: parseInt(action.machinedata.machine_reading),
              number_of_images: action.machinedata.number_of_images,
              id: nextdataMId(state.dataM)
            }
          ]
        }
    
      case 'DELTHISMACHINE':
        return;
    }
  }
  const store = createStore(machines);
  store.subscribe(() => console.log(store.getState()));
  store.dispatch(addMachine());
  
  const m1 = {machine_name: "Hulk 8000",machine_reading: 6700,number_of_images: 8}
  store.dispatch(addNewMachine(m1));
  

  
  const [text_machine_name, onChangeText] = React.useState("");
  const [text_meter_reading, onChangeText2] = React.useState("");
  let addmachinefrominput = () =>  {store.dispatch(addNewMachine({machine_name: text_machine_name,machine_reading: text_meter_reading ,number_of_images: 9})
  );
  Alert.alert('New Machine Added', text_machine_name+" "+text_meter_reading+ 'has been added', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  }
  
  const getItemCount = (data) => data.length;
  // ### handling camera and file upload actions
  // const onPressCamera = () => launchCamera({mediaType: 'photo', quality: 0.6, cameraType: 'back', includeExtra: 'true', saveToPhotos: 'true' } ,(response) => {
  //     console.log(response);
  //     });
  // const onPressUpload = () => launchImageLibrary({mediaType: 'photo', quality: 0.6, includeExtra: 'true', saveToPhotos: 'true', selectionLimit: 0},
  //   (response) => {
  //     console.log(response);
  //     }); 
  const onPressDelete = () => console.log("Press delete a machine");
  

  // ### big data test 1000 items - performance and rendering is smooth after approximately 800ms
  // const getItemCount = (data) => 1000;

  // permision for camera bit on process
  // const devices = useCameraDevices()
  // const device = devices.back

  // if (device == null) return <LoadingView />
  // return (
  //   <Camera
  //     style={StyleSheet.absoluteFill}
  //     device={device}
  //     isActive={true}
  //   />
  // )
  
  const DATA = store.getState();
  // ### the front-end declaration of the test hybrid app
  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <View style={styles.rect2}>
          <Text style={styles.meterReading2}>Meter Reading Inspection</Text>
        </View>
      </View>
      <View style={styles.group4}>
        <View style={styles.group2Row}>
          <View style={styles.group2}>
            <View style={styles.rect3Stack}>
              <View style={styles.rect3}>
                <Text style={styles.machineName}>Machine {"\n"}Name</Text>
                <Text style={styles.meterReading}>Meter {"\n"}Reading</Text>
              </View>
              <Text style={styles.machinePhotos}>Machine{"\n"}Photos</Text>
            </View>
          </View>
          <View style={styles.group3}>
            <View style={styles.rect4}>
              <TextInput
                onChangeText={onChangeText}
                value={text_machine_name}
                clearTextOnFocus={true}
                placeholder="Machine Name"
                style={styles.placeholder}
              ></TextInput>
              <TextInput
                onChangeText={onChangeText2}
                placeholder="Meter Reading"
                clearTextOnFocus={true}
                value={text_meter_reading}
                dataDetector="phoneNumber"
                keyboardType="numeric"
                style={styles.placeholder1}
              ></TextInput>
              <View style={styles.zeroRow}>
                <Text style={styles.zero}>0</Text>
                <TouchableOpacity 
                  style={styles.button4}
                  >
                  <SimpleLineIconsIcon
                    name="camera"
                    onPress={openCameraAlert}
                    style={styles.icon5}
                  ></SimpleLineIconsIcon>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.button3}
                  >
                  <SimpleLineIconsIcon
                    name="folder"
                    style={styles.icon4}
                    onPress={uploadImagesAlert}
                  ></SimpleLineIconsIcon>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.button}
              onPress={addmachinefrominput}
              >
                <Text style={styles.add}>ADD</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.listOfEntries}>List of entries</Text>
      <SafeAreaView style={styles.container_list}>
        {/* VirtualizedList type of data presentation in preparation for the midium to large data */}
        <VirtualizedList
          data={DATA}
          initialNumToRender={3}
          renderItem={({ item }) => <Item title={item} />}
          keyExtractor={(item) => item.id}
          getItemCount={getItemCount}
          getItem={getItem}
        />
      </SafeAreaView>
    </View>


    // <SafeAreaView style={styles.container_list}>
    //   {/* ### VirtualizedList type of data presentation in preparation for the midium to large data */}
    //   <VirtualizedList
    //     data={DATA}
    //     initialNumToRender={3}
    //     renderItem={({ item }) => <Item title={item} />}
    //     keyExtractor={item => item.id}
    //     getItemCount={getItemCount}
    //     getItem={getItem}
    //   />
    // </SafeAreaView>
    
  );
}
// ### list items for machines layout

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title.machine_name}</Text> 
    <Text style={styles.title}>{title.machine_reading}</Text>
    <View style={styles.btn_right}>
     
          
          <Button style={{ width:'25%', margin: 12, padding: 12}}
            title="Export to Device"
          />
          <Button style={{ width:'25%', margin: 12, padding: 12}}
            title="Sync to Cloud"
          />
           <TouchableHighlight style={{textAlign: 'right'}}>
            <View>
            <Image style={styles.tinyLogo}
                source={{ uri: 'https://icongr.am/fontawesome/trash.svg?size=128&color=currentColor'}}          />
            </View>
          </TouchableHighlight>
    </View>
  </View>

);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  group: {
    width: 375,
    height: 42,
    
  },
  rect2: {
    height: 42,
    backgroundColor: "#E6E6E6"
  },
  meterReading2: {
    color: "#121212",
    textAlign: "center",
    marginTop: 12,
    marginLeft: 107
  },
  group4: {
    height: 170,
    flexDirection: "row",
    marginTop: 10
  },
  group2: {
    width: 85,
    height: 170
  },
  rect3: {
    top: 0,
    left: 1,
    width: 84,
    height: 170,
    position: "absolute",
    flexDirection: "row"
  },
  machineName: {
    
    color: "#121212"
  },
  meterReading: {
    
    color: "#121212",
    marginLeft: -57,
    marginTop: 45
  },
  machinePhotos: {
    top: 85,
    left: 0,
    position: "absolute",
    
    color: "#121212"
  },
  rect3Stack: {
    width: 85,
    height: 170
  },
  group3: {
    width: 266,
    height: 170
  },
  rect4: {
    width: 266,
    height: 170
  },
  placeholder: {
    
    color: "#121212",
    height: 41,
    width: 247,
    borderWidth: 1,
    borderColor: "#000000",
    marginLeft: 19
  },
  placeholder1: {
    
    color: "#121212",
    height: 41,
    width: 247,
    borderWidth: 1,
    borderColor: "#000000",
    marginTop: 4,
    marginLeft: 19
  },
  zero: {
    color: "#121212",
    fontSize: 24
  },
  button4: {
    width: 47,
    height: 47,
    marginLeft: 25
  },
  icon5: {
    color: "rgba(0,0,0,1)",
    fontSize: 40,
    height: 45,
    width: 40,
    marginLeft: 4
  },
  button3: {
    width: 47,
    height: 47,
    marginLeft: 11
  },
  icon4: {
    color: "rgba(0,0,0,1)",
    fontSize: 40,
    height: 45,
    width: 40,
    marginTop: 1,
    marginLeft: 4
  },
  zeroRow: {
    height: 47,
    flexDirection: "row",
    marginTop: 1,
    marginLeft: 122
  },
  button: {
    width: 88,
    height: 36,
    backgroundColor: "rgba(17,187,136,1)",
    borderRadius: 5,
    marginLeft: 178
  },
  add: {
    
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    marginTop: 9,
    marginLeft: 30
  },
  group2Row: {
    height: 170,
    flexDirection: "row",
    flex: 1,
    marginRight: 12,
    marginLeft: 12
  },
  listOfEntries: {
    
    color: "#121212",
    fontSize: 18,
    marginLeft: 12
  },
  
  item: {
    backgroundColor: "ghostwhite",
    height: 150,
    justifyContent: "center",
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
  btn_right: {
    flexDirection: "row-reverse",
    width: "90%",
    padding: 20,
    fontSize: "2rem",
    position: "absolute",
  },

});
export default App;
