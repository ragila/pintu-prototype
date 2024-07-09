import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import { DataTicker } from '@/types/ticker';
import { formatNumber } from '@/helpers/formatNumber';

type HeaderPriceDataComponentProps = {
    title: string | string[] | undefined;
    tickerData?: DataTicker;
  };

const HeaderPriceDataComponent: React.FC<HeaderPriceDataComponentProps> = ({ title, tickerData}) => {
  // console.log(tickerData, 'tickerData')
  return (
    <View style={{margin: 10}}>
        <TouchableOpacity
          onPress={() => {
            router.back()
          }}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <AntDesign name='arrowleft' size={25}/>
          <Text style={{fontSize: 17, fontWeight: 700, marginLeft: 15}}>{title}/USD</Text>
        </TouchableOpacity>
        <View style={{marginTop: 20}}>
            <View style={{alignItems: 'center', alignSelf: 'flex-start'}}>
              <Text style={{fontWeight: 600}}>Price</Text>
              <View style={{borderBottomWidth: 3, width: 20, marginTop: 7, borderColor: '#FCD635'}}/>
            </View>
        </View>

        <View style={{marginTop: 10, flexDirection: 'row'}}>
          <View style={{width: '50%'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>{formatNumber(tickerData?.markPrice)}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 12, fontWeight: '600', marginTop: 5}}>=${formatNumber(tickerData?.markPrice)}</Text>
              <Text style={{fontSize: 12, fontWeight: '600', marginTop: 5, marginLeft: 5, color: tickerData && tickerData?.change < 0 ? '#F6475D' : tickerData && tickerData?.change == 0 ? '#F5F5F5' : '#2DBD85'}}>{tickerData?.change}%</Text>
            </View>
          </View>
          <View style={{width: '50%', flexDirection: 'row', justifyContent: 'flex-end'}}>
          <View style={{marginRight: 20}}>
              <Text style={{fontSize: 10, color: '#7A8495'}}>24h High</Text>
              <Text style={{fontSize: 10}}>{formatNumber(tickerData?.high)}</Text>
              <Text style={{fontSize: 10, color: '#7A8495', marginTop: 5}}>24h Low</Text>
              <Text style={{fontSize: 10}}>{formatNumber(tickerData?.low)}</Text>
            </View>
            <View style={{marginRight: 10}}>
              <Text style={{fontSize: 10, color: '#7A8495'}}>24h Vol({title})</Text>
              <Text style={{fontSize: 10}}>{tickerData?.volume}</Text>
              <Text style={{fontSize: 10, color: '#7A8495', marginTop: 5}}>24h Vol(USDT)</Text>
              <Text style={{fontSize: 10}}>{tickerData?.volumeQuote}</Text>
            </View>
          </View>
        </View>
      </View>
  )
}

export default HeaderPriceDataComponent