
import React,{Component} from "react";
import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
const firebase = require("firebase");

export default class App extends Component{
  
  constructor(props){
    super(props);

    let firebaseConfig = {
      apiKey: "AIzaSyAcR9g2ZJQ_NiNDz-unlVI1po8ViDO7dvo",
      authDomain: "biblioteca-22073.firebaseapp.com",
      databaseURL: "https://biblioteca-22073.firebaseio.com",
      projectId: "biblioteca-22073",
      storageBucket: "biblioteca-22073.appspot.com",
      messagingSenderId: "710084049524",
      appId: "1:710084049524:web:8a1b6a1f1f28ee02"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged((user)=>{
      user ? alert("Entrou") : alert("saiu");
    });
    
  }

  logoff(){
    firebase.auth().signOut();
  }

  logar(){

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
    
  }
  
  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.title}>CADASTRO</Text>
        <View style={styles.area}>
        <Text style={styles.titleInput}>Email</Text>
          <TextInput style={styles.input} 
           underlineColorAndroid = "transparent"
           placeholder = "Email"
           placeholderTextColor = "#9a73ef"
           autoCapitalize = "none"
          ></TextInput>
          <Text style={styles.titleInput}>Password</Text>
          <TextInput style={styles.input} 
           underlineColorAndroid = "transparent"
           placeholder = "Password"
           placeholderTextColor = "#9a73ef"
           autoCapitalize = "none"
          ></TextInput>
        </View>
        <TouchableOpacity
          style={styles.submit}
          onPress={this.logar}
        ><Text style={styles.buttonSub}>CADASTRAR</Text></TouchableOpacity>
        <View>
          <Button onPress={this.logoff} title="Logoff"></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title:{
    textAlign:'center',
    fontSize:30,
    fontWeight: '900'
  },
  container: {
    paddingTop: 23
  },
  area: {
    margin: 10,
  },
  input: {
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  titleInput:{
    marginBottom:10,
    marginTop:10
  },
  submit:{
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40
  },
  buttonSub:{
    color:'#ffffff',
    textAlign:'center'
  }

});
