import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import TickerWsComponent from '@/sockets/ticker'

const HomePage = () => {

  return (
    <ScrollView style={{margin: 10}}>
      <View style={{marginTop: 20, marginHorizontal: 5}}>
        <Text style={{fontSize: 28, fontWeight: 'bold'}}>
          Join the World's Largest Crypto Exchange
        </Text>
      </View>
        <TouchableOpacity
          onPress={() => router.navigate('signInModal')}
          style={{backgroundColor: '#FCD635', justifyContent: 'center', alignItems: 'center', borderRadius:7, width: 180, height: 35, marginVertical: 20}}>
          <Text style={{fontWeight: 500}}>Sign Up / Log In</Text>
        </TouchableOpacity>
      <TickerWsComponent />
    </ScrollView>
  )
}

export default HomePage