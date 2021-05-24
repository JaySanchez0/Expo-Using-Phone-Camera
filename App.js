
import { Camera } from 'expo-camera';
import React from 'react';
import { StyleSheet, Text, View,StatusBar, Button, Dimensions, Image, Animated, ImagePickerIOS } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';


export default function App() {
  let camera = null;
  const [img,setImg] = React.useState(null);
  const [process,setProcess] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      await ImagePicker.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      //setHasPermission(status === 'granted');
    })();
  }, []);

  if(img===null){
    return (<View>
      <StatusBar></StatusBar>
      <Button title="launch camera" onPress={async ()=>{
        setImg(await ImagePicker.launchCameraAsync());
      }}></Button>
    </View>)
  }else{
    console.log(img);
    return(
      <View style={{backgroundColor:"orange"}}>
        <StatusBar backgroundColor="#c5c5c5" />
        <Image source={{uri:img.uri}} style={{width:200,height:200}}>

        </Image>
        <Button title="back" onPress={()=>setImg(null)}></Button>
        <View style={{width:"100%",height:10}}></View>
        <Button title="Save" onPress={async ()=>{
          await MediaLibrary.saveToLibraryAsync(img.uri);
          setImg(null);
        }}></Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
