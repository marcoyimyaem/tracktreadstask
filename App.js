<script src="http://192.168.3.7:8097"></script>
import React from "react";
import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Button, Image, Text, View, TouchableHighlight , TextInput, VirtualizedList, SafeAreaView} from 'react-native';

const DATA = [{
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
  
}];

const getItem = (data, index) => ({
  id: data[parseInt(index)].id,
  machine_name: data[parseInt(index)].machine_name,
  machine_reading: data[parseInt(index)].machine_reading,
});

// big data test
// const getItem = (data, index) => ({
//   id: parseInt(index),
//   machine_name: `Machine Item # ${index+1}`,
//   machine_reading: 3000,
// });
// input handler for adding a new machine
const App = () => {
  const [text_machine_name, onChangeText] = React.useState("Machine Name");
  const [text_meter_reading, onChangeText2] = React.useState("Meter Reading");
  const getItemCount = (data) => data.length;

  // const onPress = () => <Camera {...props} photo={true} />;
  const onPressCamera = () => console.log("Press for open the camera app");
  const onPressUpload = () => console.log("Press for upload from device");
  const onPressDelete = () => console.log("Press delete a machine");
  

  // big data test 1000 items - performance and rendering is smooth after approximately 800ms
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
  
  
  // the front-end declaration of the test hybrid app
  return (
    <View style={styles.container}>
        <View style={styles.top_header}>
          <Text style={{fontSize: "1.5rem"}}>Meter Reading Inspection</Text>
        </View>
        <View style={styles.row_contents}>
          <Text style={styles.input_label}>Machine Name</Text>
          <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          placeholder={text_machine_name}
          />
        </View>
        <View style={styles.row_contents}>
          <Text style={styles.input_label}>Meter Reading</Text>
          <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={onChangeText2}
          placeholder={text_meter_reading}
          />
        </View>
        {/* take a picture button */}
        <View style={styles.row_contents}>
          <Text style={styles.input_label}>Machine Photos</Text>
          {/* images uploaded counter */}
          <Text style={[styles.input_label, styles.imageCounter]}>0</Text>
           {/* take a picture button */}

           <TouchableHighlight onPress={onPressCamera}>
          <View>
          <Image style={styles.tinyLogo}
              source={{ uri: 'https://icongr.am/fontawesome/camera.svg?size=128&color=currentColor'}}          /> 
          </View>
        </TouchableHighlight>
            {/* upload from gallery button */}
        <TouchableHighlight onPress={onPressUpload}>
          <View>
          <Image style={styles.tinyLogo}
              source={{ uri: 'https://icongr.am/fontawesome/folder-o.svg?size=128&color=currentColor'}}          />
          </View>
        </TouchableHighlight>
          </View>
          <View style={[styles.row_contents_right, styles.add_button]}>
            <Button 
            title="ADD"
            color="mediumspringgreen"
            /> 
          </View>
      <StatusBar style="auto" />
      <Text style={{fontSize: "1.5rem", padding: 10}}>List of entries</Text>
      <SafeAreaView style={styles.container_list}>
      {/* VirtualizedList type of data presentation in preparation for the midium to large data */}
      <VirtualizedList
        data={DATA}
        initialNumToRender={3}
        renderItem={({ item }) => <Item title={item} />}
        keyExtractor={item => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>
    </View>
  );
}
// list items for machines layout
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
    flex: 1,
    backgroundColor: '#fff',
  },
  top_header: {
    backgroundColor: 'aqua',
    padding: "1rem",
    alignItems: 'center',
    fontSize: "3em",
    width: '100%'
  },
  row_contents:{
    flexDirection:'row', 
    width: '100%',
  },
  row_contents_right:{
    flexDirection:'row-reverse', 
    width: '90%',
    padding: 20,
    fontSize: '2rem',
  },
  input_label:{
    height: 40,
    margin: 5,
    padding: 10,
    width: '20%',
  },
  input: {
    height: 40,
    margin: 10,
    borderRadius:5,
    borderWidth: 1,
    padding: 10,
    width: '80%',
    
  },
  imageCounter:{
    fontWeight: 'bold',
    fontSize: '2rem',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  add_button: {
    marginStart: 10, 
  },
  container_list: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  item: {
    backgroundColor: 'ghostwhite',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
  btn_right:{
    flexDirection:'row-reverse', 
    width: '90%',
    padding: 20,
    fontSize: '2rem',
    position: 'absolute'
  },
  // btn_right: {
  //   flexDirection: 'column-reverse'
  // }
  

});
export default App;