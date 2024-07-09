import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from "expo-router";
import { StatusBar } from 'expo-status-bar';

import { FontAwesome5 } from '@expo/vector-icons';

import HomePage from '../Home';

export default function TabOneScreen() {
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={{flexDirection: 'row', marginHorizontal: 10, marginTop: 10}}>
        <View style={{backgroundColor: '#FCD635', width: 30, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius:7}}>
          <FontAwesome5 name="btc" size={20} />
        </View>
        <Link href="/modal" asChild>
          <TouchableOpacity style={{ backgroundColor: '#F5F5F5', borderRadius: 10, paddingHorizontal: 15, marginLeft: 15, flexDirection: 'row', alignItems: 'center', flex: 1}}>
            <FontAwesome5 name="search" size={15} color="#939AA5" />
            <Text style={{color: '#939AA5', fontWeight: '600', marginLeft: 10}}>SOL/USDT</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <HomePage />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
