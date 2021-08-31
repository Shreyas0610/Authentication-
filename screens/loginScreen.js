import { StatusBar } from 'expo-status-bar';
import react from 'react';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Alert, ToastAndroid } from 'react-native';
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner';
import db from '../config';
import firebase from 'firebase';



export default class loginScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            emailID: '',
            passwrod: ''

        }
    }

    login = async (emailID, password) => {
        if (emailID && password){
            try{
                const response = await firebase.auth().signInWithEmailAndPassword(emailID, password)
                if(response){
                    this.props.navigation.navigate('Transaction')
                }
            }
            catch(error){
                console.log(error)
                switch(error.code){
                    case 'auth/user-not-found' : Alert.alert("User doesn't exist")
                    break 
                    case 'auth/invalid-email' : Alert.alert("Invalid Email or Password")
                    break
                }
            }
        }
        else {
            Alert.alert("Enter Email and Password")
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputBox}
                        placeholder='Email ID'
                        value={this.state.emailID}
                        onChangeText={(text) => this.setState({
                            emailID: text
                        })}
                        keyboardType='email-address'
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputBox}
                        placeholder='Password'
                        value={this.state.passwrod}
                        onChangeText={(text) => this.setState({
                            passwrod: text
                        })}
                        secureTextEntry={true}
                    />
                </View>
                <View>
                    <TouchableOpacity style={styles.submitButton} onPress={() => {
                        this.login(this.state.emailID, this.state.passwrod)
                    }}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}


const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    displayText: { fontSize: 15, textDecorationLine: 'underline' },
    scanButton: { backgroundColor: '#2196F3', padding: 10, margin: 10 },
    buttonText: { fontSize: 15, textAlign: 'center', marginTop: 10 },
    inputView: { flexDirection: 'row', margin: 20 },
    inputBox: { width: 200, height: 40, borderWidth: 1.5, borderRightWidth: 0, fontSize: 20 },
    scanButton: { backgroundColor: '#66BB6A', width: 50, borderWidth: 1.5, borderLeftWidth: 0 },
    submitButtonText: { padding: 10, textAlign: 'center', fontSize: 20, fontWeight: "bold", color: 'white' },
    submitButton: { backgroundColor: '#FBC02D', width: 100, height: 50 },
});
