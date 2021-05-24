
import { Camera } from 'expo-camera';
import React from 'react';
import { StyleSheet, Text, View,StatusBar, Button, Dimensions, Image, Animated } from 'react-native';
import * as MediaLibrary from 'expo-media-library';


export default function App() {
  let camera = null;
  const [img,setImg] = React.useState(null);
  const [process,setProcess] = React.useState(false);
  
  React.useEffect(() => {
    (async () => {
      await Camera.requestPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      //setHasPermission(status === 'granted');
    })();
  }, []);


  const capture = async ()=>{
    setProcess(true);
    const pic = await camera.takePictureAsync({quality: 0, base64: true});
    setProcess(false);
    setImg(pic);
    console.log("Finish");
  }
  if(img===null){
    return (
      <View>
        <StatusBar backgroundColor="#c5c5c5" />
        <View style={{backgroundColor:"orange",width:"auto"}}>
          <Camera ref={ref=> camera=ref}>
            <View style={{justifyContent:"flex-end",width:"100%",height:"100%"}}>
              <Button disabled={process} title="Capture" onPress={()=>capture()}></Button>
            </View>
          </Camera>
        </View>
      </View>
    );
  }else{
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
