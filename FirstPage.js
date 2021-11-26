import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  ImageBackground,
  Button,
  ScrollView,
  BackHandler,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import ConfettiCannon from 'react-native-confetti-cannon';
import { Picker, Icon } from "native-base";
import PropTypes from "prop-types";
import { FloatingAction } from "react-native-floating-action";
import Printer from "./Printer";
import Ticket from "./Ticket";
let {width, height} = Dimensions.get('window');
const actions = [
  {
    text: "Best Compliments",
    icon: require("./games/info_icon.png"),
    name: "btn_familyInfo",
    position: 1,
  },
  {
    text: "Timings & Venue",
    icon: require("./games/location_icon.png"),
    name: "btn_location",
    position: 3,
  },
  // {
  //   text: "Video",
  //   icon: require("./images/location.png"),
  //   name: "bt_videocam",
  //   position: 4,
  // },
];

class TypingText extends Component<{}> {
  constructor() {
    super();

    this.index = 0;

    this.typing_timer = -1;

    this.blinking_cursor_timer = -1;

    this.state = { text: "", blinking_cursor_color: "transparent" };
  }

  componentDidMount() {
    this.typingAnimation();
    this.blinkingCursorAnimation();
  }

  componentWillUnmout() {
    clearTimeout(this.typing_timer);

    this.typing_timer = -1;

    clearInterval(this.blinking_cursor_timer);

    this.blinking_cursor_timer = -1;
  }

  typingAnimation = () => {
    clearTimeout(this.typing_timer);

    this.typing_timer = -1;

    if (this.index < this.props.text.length) {
      if (this.refs.animatedText) {
        this.setState(
          { text: this.state.text + this.props.text.charAt(this.index) },
          () => {
            this.index++;

            this.typing_timer = setTimeout(() => {
              this.typingAnimation();
            }, this.props.typingAnimationDuration);
          }
        );
      }
    }
  };

  blinkingCursorAnimation = () => {
    this.blinking_cursor_timer = setInterval(() => {
      if (this.refs.animatedText) {
        if (this.state.blinking_cursor_color == "transparent")
          this.setState({ blinking_cursor_color: this.props.color });
        else this.setState({ blinking_cursor_color: "transparent" });
      }
    }, this.props.blinkingCursorAnimationDuration);
  };

  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Text
          ref="animatedText"
          style={{
            color: this.props.color,
            fontSize: this.props.textSize,
            textAlign: "center",
            marginTop: this.props.marginTop,
            marginHorizontal: this.props.marginHorizontal,
            fontFamily: this.props.fontFamily,
          }}
        >
          {this.state.text}

          <Text style={{ color: this.state.blinking_cursor_color }}>|</Text>
        </Text>
      </View>
    );
  }
}

export default class FirstPage extends Component<{}> {
  constructor() {
    super();
    this.springValue = new Animated.Value(100);
    this.state = {
      isVisible: true,
      ticketIndex: 1,
      startValue: new Animated.Value(0),
      endValue: 1,
      duration: 10000,
      backClickCount: 0,
      
      // AsyncStorage.setItem('languageSelected', 'en');
      // languageSelected :"en",
    };
  }

  Hide_Splash_Screen = () => {
    this.setState({
      isVisible: false,
    });
  };

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
}

  componentDidMount() {
    var that = this;
    
    setTimeout(function () {
      that.Hide_Splash_Screen();
    }, 10000);

    Animated.timing(this.state.startValue, {
      toValue: this.state.endValue,
      duration: this.state.duration,
      useNativeDriver: true,
    }).start();
  }

  _spring() {
    this.setState({backClickCount: 1}, () => {
        Animated.sequence([
            Animated.spring(
                this.springValue,
                {
                    toValue: -.0 * height,
                    friction: 5,
                    duration: 300,
                    useNativeDriver: true,
                }
            ),
            Animated.timing(
                this.springValue,
                {
                    toValue: 100,
                    duration: 300,
                    useNativeDriver: true,
                }
            ),

        ]).start(() => {
            this.setState({backClickCount: 0});
        });
    });

}


handleBackButton = () => {
    this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();

    return true;
};

  static navigationOptions = {
    header: null,
    headerTintColor: "#ffffff",
    headerStyle: {
      backgroundColor: "#2F95D6",
      borderBottomColor: "#ffffff",
      borderBottomWidth: 3,
    },
    headerTitleStyle: {
      fontSize: 18,
    },
    // title: 'Second Page',
    //Sets Header text of Status Bar
  };

  render() {
    const ticketHeight = 280;
    const { navigate } = this.props.navigation;
   
    let Splash_Screen = (
      <View style={styles.SplashScreen_RootView}>
        <View style={styles.SplashScreen_ChildView}>
          {/* <Image
            source={require("./images/veerabhadra10.jpg")}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          /> */}
          <Text style={(styles.topHeadingInvite)}>
                  Ganachari Family Welcomes You
          </Text>
         
          

           
          
        </View>
        <ConfettiCannon count={200} origin={{x: -10, y: 0}} />
      </View>
    );
    return (
      <View style={styles.MainContainer}>
        <ImageBackground
          source={require("./games/bg.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
          <Text
            style={{
              textAlign: "center",
              marginTop: 5,
              fontSize: 15,
              color: "#FFDF00",
              alignContent: "center",
              fontFamily: "BalooTamma2-Regular",
              fontWeight: "bold",
            }}
          >
            || ॐ Shri Veerabhadreshwara Prasanna ||
          </Text>
          <ScrollView>
            <TypingText
              text={
                "With joyful hearts We request your presence at the Marriage ceremony uniting \nChi. Ra Deepak Ganachari\n WITH \nChi. Kum. Sou. Sumalatha Shankhinamath"
              }
            />
          </ScrollView>
          <FloatingAction
          actions={actions}
          onPressItem={(name) => {
            if (name === "btn_location") {
              navigate("SecondPage");
              this.explosion && this.explosion.start();
            } else if (name === "btn_familyInfo") {
              navigate("FamilyInfo");
            } else if (name === "btn_muhurtha") {
            }
            console.log(`selected button: ${name}`);
          }}
        />
          {this.state.isVisible === true ? Splash_Screen : null}
        </ImageBackground>
        <Animated.View style={[styles.animatedView, {transform: [{translateY: this.springValue}]}]}>
                  <Text style={styles.exitTitleText}>press back again to exit the app</Text>

                  <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => BackHandler.exitApp()}
                  >
                      <Text style={styles.exitText}>Exit</Text>
                  </TouchableOpacity>

              </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    paddingTop: Platform.OS === "ios" ? 20 : 0,
  },

  SplashScreen_RootView: {
    justifyContent: "center",
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  fontFamilyDeepak: {
    fontFamily: "Courgette.Regular",
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft:25,
  },

  fontFamilySumalatha: {
    fontFamily: "Courgette.Regular",
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft:15,
  },

  SplashScreen_ChildView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#bb1471",
    flex: 1,
  },
  image: {
    flex: 1,
  },
  title: {
    margin: 24,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  tinyKnot: {
    width: 250,
    height: 150,
    marginBottom: 85,
  },
  animatedView: {
    width,
    backgroundColor: "#0a5386",
    elevation: 2,
    position: "absolute",
    bottom: 0,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
},
exitTitleText: {
    textAlign: "center",
    color: "#ffffff",
    marginRight: 10,
},
exitText: {
    color: "#e5933a",
    paddingHorizontal: 10,
    paddingVertical: 3
},
topHeadingInvite:{
  fontSize: 18,
  fontWeight: "bold",
  fontStyle: 'italic',
  textAlign: "center",
  fontFamily: "Courgette.Regular",
  color:"#ffffff",
},
});

TypingText.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  marginTop: PropTypes.number,
  marginHorizontal: PropTypes.number,
  textSize: PropTypes.number,
  fontFamily: PropTypes.fontFamily,
  typingAnimationDuration: PropTypes.number,
  blinkingCursorAnimationDuration: PropTypes.number,
};

TypingText.defaultProps = {
  color: "rgb(255,223,0)",
  marginTop: 100,
  marginHorizontal: 30,
  textSize: 22,
  fontFamily: "Courgette.Regular",
  typingAnimationDuration: 50,
  blinkingCursorAnimationDuration: 650,
};
