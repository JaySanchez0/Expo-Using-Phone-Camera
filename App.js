
import { Camera } from 'expo-camera';
import React from 'react';
import { StyleSheet, Text, View,StatusBar, Button, Dimensions, Image } from 'react-native';
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

  if(process){
    return <View>
      <StatusBar>
      </StatusBar>
      <Text>Process photo</Text>
    </View>
  };

  const capture = async ()=>{
    const pic = await camera.takePictureAsync({quality: 0, base64: true,});
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
              <Button title="Capture" onPress={()=>capture()}></Button>
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
