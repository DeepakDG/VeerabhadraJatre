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
import GlobalFont from 'react-native-global-font';
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
    let fontName = 'BalooTamma2-Regular';
    GlobalFont.applyGlobal(fontName);
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     Alert.alert('I am appearing...', 'After 5 seconds!');
  //   }, 5000);
  // }, []);

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
            fontFamily: this.props.fontFamily,
            paddingBottom: this.props.paddingBottom,
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
            <View>
              <Image
                source={require('./games/splash_bg.png')}
                style={styles.image}
              />
              <Animated.View style={[{opacity: this.state.startValue}]}>
                <View style={styles.bottombanner}>
                  <ImageBackground
                    style={styles.theImage}
                    source={require('./games/banner_splash.jpg')}>
                    <Text style={styles.topHeadingInvite}>
                      || ಶ್ರೀ ವೀರಭದ್ರದೇವರ "ಮಹಾರಥೋತ್ಸವದ" ಆಮಂತ್ರಣ ಪತ್ರಿಕೆ ||
                    </Text>
                  </ImageBackground>
                </View>
              </Animated.View>
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
                  source={require('./games/lamp1.png')}
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
          source={require('./games/home_bg.jpg')}
          style={{width: null, height: null, flex: 1, resizeMode: 'cover'}}>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 28,
              fontSize: 18,
              color: '#e75480',
              alignContent: 'center',
              fontFamily: 'BalooTamma2-Regular',
              fontWeight: 'bold',
            }}>
            || ಶ್ರೀ ವೀರಭದ್ರೇಶ್ವರ ಪ್ರಸನ್ನ ||
          </Text>

          <ScrollView>
            <TypingText
              text={
                'ಇದೇ ಶಕೆ 1943 ನೇ ಪ್ಲವ ನಾಮ ಸಂವತ್ಸರ ಮಾರ್ಗಶಿರ ಶುದ್ಧ ಪೂರ್ಣಿಮ, ಹೊಸ್ತಿಲ ಹುಣ್ಣಿಮೆ ತಾ// 19-12-2021 ನೆ ರವಿವಾರ ಬೆಳಗ್ಗೆ "ರುದ್ರಾಭಿಷೇಕ" ನಂತರ ಸಾಯಂಕಾಲ 5:00 ಗಂಟೆಗೆ "ಮಹಾ ರಥೋತ್ಸವವು" ಹಾಗೂ ಮಾರ್ಗಶಿರ ಬ.15 ತಾ//20-12-2021 ನೇ ಸೋಮವಾರ ಮುಂಜಾನೆ "ಅಗ್ನಿ ಹಾಯುವುದು" ನಂತರ ಸಾಯಂಕಾಲ 6:00 ಗಂಟೆಗೆ "ಕಡುಬಿನ ಕಾಳಗ"ನೆರವೇರುತ್ತದೆ,ತಾ//21-12-2021 ನೇ ಮಂಗಳವಾರ ಮಧ್ಯಾಹ್ನ "ಮಹಾ ಪ್ರಸಾದ"ಜರುಗುವುದು.ಕಾರಣ ಯಾವತ್ತೂ ಭಕ್ತರು ಈ ಎಲ್ಲಾ ಕಾರ್ಯಕ್ರಮಗಳಿಗೆ ಆಗಮಿಸಿ.ಶ್ರೀ ವೀರಭದ್ರೇಶ್ವರರ ಕೃಪೆಗೆ ಪಾತ್ರರಾಗಬೇಕಾಗಿ ಬಿನ್ನಹ.ತಮ್ಮ ಶ್ರೀ ವೀರಭದ್ರೇಶ್ವರ ಸದ್ಬಕ್ತ ಮಂಡಳಿ, ಬೆಟಗೇರಿ.'
              }
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
  bottombanner: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: '100%',
    position: 'absolute',
    bottom: 1,
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
  theImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    textAlign: 'center',
  },
  topHeadingInvite: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    color: '#FF4500',
    fontFamily: 'BalooTamma2-Regular',
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
  fontFamily: PropTypes.fontFamily,
  typingAnimationDuration: PropTypes.number,
  blinkingCursorAnimationDuration: PropTypes.number,
  paddingBottom:PropTypes.number,
};

TypingText.defaultProps = {
  color: '#e75480',
  marginTop: 45,
  marginHorizontal: 28,
  textSize: 22,
  fontFamily: 'BalooTamma2-Regular',
  typingAnimationDuration: 50,
  blinkingCursorAnimationDuration: 650,
  paddingBottom: 50,
};
