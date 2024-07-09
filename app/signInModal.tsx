import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const SignInModal = () => {
  return (
    <View style={{paddingHorizontal: 15, flex: 1, backgroundColor: 'white'}}>
      <Text style={{fontWeight: 'bold', fontSize: 30, marginTop: 50}}>Log in</Text>
      <Text style={{fontWeight: '500', fontSize: 15, marginTop: 30}}>Email/Phone number</Text>
      <TextInput placeholder='+62xxx' style={{width: '100%', backgroundColor: '#F5F5F5', height: 55, borderRadius: 7, paddingHorizontal: 15, marginTop: 10}}>
      </TextInput>
      <TouchableOpacity
        onPress={() => {
          router.navigate('(tabs)')
        }}
        style={{width: '100%', backgroundColor: '#FCD635', height: 55, borderRadius: 7, paddingHorizontal: 15, marginTop: 30, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontWeight: '600', fontSize: 16}}>Next</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', marginTop: 15}}>
        <View style={{borderBottomWidth: 1, width: '40%', borderColor: '#778293'}}/>
        <View style={{width: '20%', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{ marginBottom: -8, color: '#778293'}}>or</Text>
        </View>
        <View style={{borderBottomWidth: 1, width: '40%', borderColor: '#778293'}}/>
      </View>
      <TouchableOpacity style={{width: '100%', height: 55, borderRadius: 7, paddingHorizontal: 15, marginTop: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E8EAED'}}>
        <Text style={{fontWeight: '600', fontSize: 16}}>Continue with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{width: '100%', height: 55, borderRadius: 7, paddingHorizontal: 15, marginTop: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E8EAED'}}>
        <Text style={{fontWeight: '600', fontSize: 16}}>Continue with Apple</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignInModal