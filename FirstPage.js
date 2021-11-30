import React, {Component} from 'react';
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
} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import {Picker, Icon} from 'native-base';
import PropTypes from 'prop-types';
import {FloatingAction} from 'react-native-floating-action';
let {width, height} = Dimensions.get('window');

class TypingText extends Component<{}> {
  constructor() {
    super();

    this.index = 0;

    this.typing_timer = -1;

    this.blinking_cursor_timer = -1;

    this.state = {text: '', blinking_cursor_color: 'transparent'};
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
          {text: this.state.text + this.props.text.charAt(this.index)},
          () => {
            this.index++;

            this.typing_timer = setTimeout(() => {
              this.typingAnimation();
            }, this.props.typingAnimationDuration);
          },
        );
      }
    }
  };

  blinkingCursorAnimation = () => {
    this.blinking_cursor_timer = setInterval(() => {
      if (this.refs.animatedText) {
        if (this.state.blinking_cursor_color == 'transparent')
          this.setState({blinking_cursor_color: this.props.color});
        else this.setState({blinking_cursor_color: 'transparent'});
      }
    }, this.props.blinkingCursorAnimationDuration);
  };

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <Text
          ref="animatedText"
          style={{
            color: this.props.color,
            fontSize: this.props.textSize,
            textAlign: 'center',
            marginTop: this.props.marginTop,
            marginHorizontal: this.props.marginHorizontal,
            // fontFamily: this.props.fontFamily,
          }}>
          {this.state.text}

          <Text style={{color: this.state.blinking_cursor_color}}>|</Text>
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
        Animated.spring(this.springValue, {
          toValue: -0.0 * height,
          friction: 5,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(this.springValue, {
          toValue: 100,
          duration: 300,
          useNativeDriver: true,
        }),
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
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#2F95D6',
      borderBottomColor: '#ffffff',
      borderBottomWidth: 3,
    },
    headerTitleStyle: {
      fontSize: 18,
    },
  };

  render() {
    const ticketHeight = 280;
    const {navigate} = this.props.navigation;

    let Splash_Screen = (
      <View style={styles.SplashScreen_RootView}>
        <View style={styles.SplashScreen_ChildView}>
          <ImageBackground
            source={require('./games/splash_new.jpg')}
            style={styles.image}>
            <View >
              <Image
                source={require('./games/splash_bg.png')}
              style={styles.image}/>
              {/* <Text style={styles.topHeadingInvite}>
                ಶ್ರೀ ವೀರಭದ್ರ ಸ್ವಾಮಿ ಜಾತ್ರೆ{'\n'}ಬೆಟಗೇರಿ
              </Text> */}
            </View>
          </ImageBackground>
          <View
            style={{
              width: '100%',
              flex: 1,
              flexDirection: 'row',
              position: 'absolute',
              alignItems: 'flex-start',
              left: 0,
              right: 0,
              top: 1,
            }}>
            <View
              style={{
                flex: 1,
                width: '20%',
                height: '40%',
                alignItems: 'flex-start',
              }}>
              <Animated.View style={[{opacity: this.state.startValue}]}>
                <Image
                  style={styles.tinyLogo}
                  source={require('./games/lamp.png')}
                />
              </Animated.View>
            </View>

            <View
              style={{
                flex: 1,
                width: '20%',
                height: '40%',
                alignItems: 'flex-end',
              }}>
              <Animated.View style={[{opacity: this.state.startValue}]}>
                <Image
                  style={styles.tinyLogo}
                  source={require('./games/lamp.png')}
                />
              </Animated.View>
            </View>
          </View>
        </View>
        <ConfettiCannon count={200} origin={{x: -10, y: 0}} />
      </View>
    );
    return (
      <View style={styles.MainContainer}>
        <ImageBackground
          source={require('./games/bg.jpg')}
          style={{width: '100%', height: '100%'}}>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 5,
              fontSize: 15,
              color: '#FFDF00',
              alignContent: 'center',
              // fontFamily: 'BalooTamma2-Regular',
              fontWeight: 'bold',
            }}>
            || ॐ Shri Veerabhadreshwara Prasanna ||
          </Text>
          <ScrollView>
            <TypingText
              text={'With joyful hearts We request your presence at '}
            />
          </ScrollView>
          {this.state.isVisible === true ? Splash_Screen : null}
        </ImageBackground>
        <Animated.View
          style={[
            styles.animatedView,
            {transform: [{translateY: this.springValue}]},
          ]}>
          <Text style={styles.exitTitleText}>
            press back again to exit the app
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => BackHandler.exitApp()}>
            <Text style={styles.exitText}>Exit</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  SplashScreen_RootView: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },

  SplashScreen_ChildView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    flex: 1,
    padding: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    margin: 24,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  animatedView: {
    width,
    backgroundColor: '#0a5386',
    elevation: 2,
    position: 'absolute',
    bottom: 0,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  exitTitleText: {
    textAlign: 'center',
    color: '#ffffff',
    marginRight: 10,
  },
  exitText: {
    color: '#e5933a',
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  topHeadingInvite: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF4500',
    bottom: 1,
    position: 'absolute',
    backgroundColor: '#80FFFFFF.',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

TypingText.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  marginTop: PropTypes.number,
  marginHorizontal: PropTypes.number,
  textSize: PropTypes.number,
  // fontFamily: PropTypes.fontFamily,
  typingAnimationDuration: PropTypes.number,
  blinkingCursorAnimationDuration: PropTypes.number,
};

TypingText.defaultProps = {
  color: 'rgb(255,223,0)',
  marginTop: 100,
  marginHorizontal: 30,
  textSize: 22,
  // fontFamily: 'Courgette.Regular',
  typingAnimationDuration: 50,
  blinkingCursorAnimationDuration: 650,
};
