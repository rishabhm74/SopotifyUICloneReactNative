import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  TouchableNativeFeedback,
  Dimensions,
  Alert,
  TextInput,
  ActivityIndicator,
  Keyboard
} from 'react-native';

import LoginHeader from '../components/LoginHeader';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../AuthProvider';
import AuthenticationActivityLoader from '../components/AuthenticationActivityLoader';
import { cos } from 'react-native-reanimated';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const LoginScreen = () => {

  // const [loginEmail, setLoginEmail] = useState('rishabh@a.com');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  // const [loginPassword, setLoginPassword] = useState('123456789');
  const [ loading, setLoading ] = useState(false);
  const [ occuredError, setOccuredError ] = useState('')
  const [nextState, setNextState] = useState(true)


  const { login } = useContext(AuthContext)

  const navigation = useNavigation();

  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const loginUser = () => {
    if (loginEmail.length > 0) {
      if (reg.test(loginEmail) === true){
        Keyboard.dismiss();
        setLoading(!loading);
        login(loginEmail, loginPassword).catch(error => {
          if (error.code === 'auth/user-disabled') {
            setOccuredError('This email address has been disabled.')
          }
          if (error.code === 'auth/user-not-found') {
            setOccuredError('This email and password combination is incorrect.')
            setLoading(false);
          }
          if (error.code === 'auth/wrong-password') {
            setOccuredError('This email and password combination is incorrect.')
            setLoading(false);
          }
          return false
        });
        // let abc;
        // async() => {
        //   let bcd = await login(loginEmail, loginPassword)
        //   console.log(bcd)
        //   console.log("1211")
        // };
        // console.log(login(loginEmail, loginPassword))
        // if(login(loginEmail, loginPassword)) {
        //   console.log("hogya")
        // } else {
        //   console.log("nahi")
        // }
        // console.log(abc)
      } 
    }
  }
  
  return (
    <View style={styles.signUpScreenView}>
      <LoginHeader />
      <View style={styles.signUpScreen}>
        <Text style={styles.whatsYourEmailText}>
          What's your email?
        </Text>
        <TextInput 
          onChangeText={(userLoginEmail) => setLoginEmail(userLoginEmail)}
          style={styles.emailInputBar}
          keyboardType='email-address'
          autoCapitalize="none"
          autoCorrect={false}
          value={loginEmail}
          // autoFocus={true}
        />
        <View style={styles.spacer} />
        <Text style={styles.whatsYourEmailText}>
          Password
        </Text>
        <TextInput 
          onChangeText={(userLoginPassword) => setLoginPassword(userLoginPassword)}
          style={styles.emailInputBar}
          // keyboardType='email-address'
          // autoCapitalize="none"
          // autoCorrect={false}
          value={loginPassword}
          // autoFocus={true}
          secureTextEntry={true}
        />

        <Text style={styles.errorText}>
          {occuredError}
        </Text>
      </View>
      


      <View>
        {
          loginEmail.length > 0 && loginPassword.length >= 8 && reg.test(loginEmail) === true  ?
          <TouchableNativeFeedback
            disabled={false}
            onPress={loginUser}
          >
            <View 
              style={styles.emailNextButtonViewNotDisabled}
            >
              <Text style={styles.emailNextButtonTextNotDisabled}>
                LOG IN
              </Text>
            </View>
          </TouchableNativeFeedback> :
          <TouchableNativeFeedback
            disabled={true}
            onPress={loginUser}
          >
            <View 
              style={styles.emailNextButtonViewDisabled  }
            >
              <Text style={styles.emailNextButtonTextDisabled}>
                LOG IN
              </Text>
            </View>
          </TouchableNativeFeedback>



        }
      </View>

      <TouchableNativeFeedback>
        <View style={styles.loginWithoutPasswordView}>
          <Text style={styles.loginWithoutPasswordText}>
            LOG IN WITHOUT PASSWORD
          </Text>
        </View>
      </TouchableNativeFeedback>
        

      {
        loading ? <AuthenticationActivityLoader />: null
      }


    </View>
  )
}

const styles = StyleSheet.create({
  signUpScreenView: {
    flex: 1,
    width: '100%',
    backgroundColor: '#141414'
  }, 
  spacer: {
    width: screenWidth,
    height: screenHeight > 640 ? 15 : 15,
  },
  signUpScreen: {
    width: screenWidth,
    height: screenHeight > 640 ? 285 : 249,
    // backgroundColor: 'red',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: screenHeight > 640 ? 20 : 15,
  },
  whatsYourEmailText: {
    color: '#fff',
    fontFamily: 'Product Sans Bold 700',
    fontSize: 30,
    marginBottom: screenHeight > 640 ? 2 : 2
  },
  emailInputBar: {
    backgroundColor: '#616060',
    width: '100%',
    borderRadius: 5,
    padding: 10,
    height: screenHeight > 640 ? 55 : 50,
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Product-Sans-Regular',
    marginBottom: screenHeight > 640 ? 12 : 10
  },
  confirmEmailText: {
    fontSize: 13,
    color: '#fff',
    fontFamily: 'Product-Sans-Regular',
  },
  emailNextButtonViewNotDisabled: {
    backgroundColor: '#fff',
    // width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight > 640 ? 47 : 43,
    borderRadius: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
    // marginTop: 5,
    paddingLeft: 48,
    paddingRight: 48
  },
  emailNextButtonTextNotDisabled: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Product Sans Bold 700',
    textTransform: 'uppercase',

  },
  emailNextButtonViewDisabled: {
    // backgroundColor: '#616060',
    backgroundColor: '#fff',
    opacity: 0.5,
    // width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight > 640 ? 47 : 43,
    borderRadius: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
    // marginTop: 5,
    paddingLeft: 48,
    paddingRight: 48
  },
  emailNextButtonTextDisabled: {
    fontSize: 16,
    color: '#141414',
    fontFamily: 'Product Sans Bold 700',
    textTransform: 'uppercase',

  },
  loginWithoutPasswordView: {
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 1.5,
    borderColor: '#ffffff50',
    padding: 4,
    paddingLeft: 12.5,
    paddingRight: 12.5,
    borderRadius: 50,
    marginTop:  screenHeight > 640 ? 35 : 35
  },
  loginWithoutPasswordText: {
    fontSize: 11,
    color: '#fff',
    fontFamily: 'Product Sans Bold 700',
    textTransform: 'uppercase',
    letterSpacing: 1.5
  },
  activityIndicatorMainView: {
    flex: 1,
    height: screenHeight,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#14141490',
    position: 'absolute',
    top: 0,
    zIndex: 10
  },
  activityIndicatorView: {
    height: 150,
    width: 300,
    backgroundColor: '#fff',
    elevation: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    fontSize: 13.5,
    color: '#fff',
    fontFamily: 'Product-Sans-Regular',
  }
})


export default LoginScreen;