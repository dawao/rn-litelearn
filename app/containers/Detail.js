import React, { Component } from 'react'
import { NativeModules, StyleSheet,Text, View, TouchableHighlight, Dimensions  } from 'react-native'
import { connect } from 'react-redux'

import SignatureCapture from 'react-native-signature-capture';
//import RNTesseractOcr from 'react-native-tesseract-ocr';
import * as Progress from 'react-native-progress';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Input, Button, Icon } from 'react-native-elements';

import { NavigationActions, createAction } from '../utils'


/* const GET_PRODUCTS = `
  query {
    words {
      id
      spell
      symbol
    }
  }
`; */

const GET_PRODUCTS = `
  query {
    textbooks {
      id
      name
      grade
    }
  }
`;

function Posts() {
  //const { loading, error, data, refetch } = useQuery(GET_PRODUCTS)
  
  //console.log(data);

  return (
    <Text onPress={this.goql}>test hooks </Text>
  )
}


const tessOptions = {
  whitelist: 'abcdefghigklmnopqrstuvwxyz',
  blacklist: '1234567890\'!"#$%&/()={}[]+*-_:;<>'
};

@connect(({ app }) => ({ ...app }))
class Detail extends Component {

  static navigationOptions = {
    title: '测试',
  }
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      fill:0,
      indeterminate: true,
    };
  }
  componentWillUnmount() {
    
  }
  componentDidMount() {
    this.animate();
  }
  
  animate() {
    let progress = 0;
    this.setState({ progress });
    setTimeout(() => {
      this.setState({ indeterminate: false });
      setInterval(() => {
        progress += Math.random() / 5;
        if (progress > 1) {
          progress = 1;
        }
        progress = Math.floor(progress * 100) /  100;
        this.setState({ progress ,fill:progress*100});
      }, 500);
    }, 1500);
  }

  goBack = () => {
    this.props.dispatch(NavigationActions.back({ routeName: 'Account' }))
  }

  goql = () => {
    this.props.dispatch(createAction('app/queryGraph')({ql:GET_PRODUCTS}))
  }
  saveSign() {
    this.refs["sign"].saveImage();
}

resetSign() {
    this.refs["sign"].resetImage();
}

_onSaveEvent(result) {
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    console.log(result);
    NativeModules.ActivityStarter.parseImage((imgPath) => { 
      //alert(imgPath); 
      /** 
        RNTesseractOcr.recognize(imgPath, 'LANG_ENGLISH', tessOptions)
        .then((result) => {
          console.log("OCR Result: ", result);
        })
        .catch((err) => {
          console.log("OCR Error: ", err);
        });*/
    })
}
_onDragEvent() {
     // This callback will be called when the user enters signature
    console.log("dragged");
}
  render() {

    return (
      <View style={styles.container}>
        
        <Progress.Bar progress={this.state.progress} width={800} color={ 'green'}/>
        <SignatureCapture
                    style={[{flex:1},styles.signature]}
                    ref="sign"
                    onSaveEvent={this._onSaveEvent}
                    onDragEvent={this._onDragEvent}
                    saveImageFileInExtStorage={true}
                    showNativeButtons={false}
                    showTitleLabel={false}
                    viewMode={"portrait"}/>
        <View style={{ flex: 1, flexDirection: "row" }}>
              <TouchableHighlight style={styles.buttonStyle}
                  onPress={() => { this.saveSign() } } >
                  <Text>Save</Text>
              </TouchableHighlight>

              <TouchableHighlight style={styles.buttonStyle}
                  onPress={() => { this.resetSign() } } >
                  <Text>Reset</Text>
              </TouchableHighlight>

          </View>

          <AnimatedCircularProgress
            size={200}
            width={20}
            backgroundWidth={30}
            fill={45}
            tintColor="#00e0ff"
            backgroundColor="#3d5875"
            padding={10}
            rotation={0}
            lineCap="round"
            renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="10" fill="blue" />}
            >
              {
                (fill) => (
                <AnimatedCircularProgress
                  size={120}
                  width={5}
                  fill={this.state.fill}
                  tintColor="#00e0ff"
                  backgroundColor="#3d5875">
                  {
                    (fill) => (
                      <Text>{ this.state.fill } </Text>
                    )
                  }
                </AnimatedCircularProgress>
                )
              }
          </AnimatedCircularProgress>

        <Button title="返回" onPress={this.goBack} />
        <Button title="测试请求" onPress={this.goql} />
        <Posts />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
    width: '100%'
},
buttonStyle: {
    flex: 1, justifyContent: "center", alignItems: "center", height: 50,
    backgroundColor: "#eeeeee",
    margin: 10
}
})

export default Detail
