import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import WebView from 'react-native-webview'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useQuery, useQueryClient } from 'react-query';

import { DataTicker } from '@/types/ticker';

import HeaderPriceDataComponent from './components/HeaderPriceData';
import OrderBook from '@/sockets/orderbook';

const CoinDetailPage = () => {
  const { pair, title } = useLocalSearchParams();
  const queryClient = useQueryClient();

  const uriTradingView = `https://www.tradingview-widget.com/embed-widget/advanced-chart/?locale=en#%7B%22autosize%22%3Atrue%2C%22symbol%22%3A%22${pair==`xbtusd`?`BITMEX`:`BINANCE`}%3A${pair}%22%2C%22interval%22%3A%22D%22%2C%22timezone%22%3A%22Etc%2FUTC%22%2C%22theme%22%3A%22light%22%2C%22style%22%3A%221%22%2C%22hide_top_toolbar%22%3Afalse%2C%22hide_legend%22%3Atrue%2C%22hide_side_toolbar%22%3Atrue%2C%22allow_symbol_change%22%3Afalse%2C%22save_image%22%3Afalse%2C%22watchlist%22%3A%5B%5D%2C%22compareSymbols%22%3A%5B%5D%2C%22details%22%3Afalse%2C%22hotlist%22%3Afalse%2C%22calendar%22%3Afalse%2C%22studies%22%3A%5B%5D%2C%22hide_volume%22%3Atrue%2C%22support_host%22%3A%22https%3A%2F%2Fwww.tradingview.com%22%2C%22height%22%3A%22100%25%22%2C%22width%22%3A%22100%25%22%2C%22utm_source%22%3A%22www.tradingview.com%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22advanced-chart%22%2C%22page-uri%22%3A%22www.tradingview.com%2Fwidget-wizard%2Fen%2Flight%2Fadvanced-chart%2F%22%7D`
  const tickerQueryKey = `${pair}_ticker_ws`;

  const { data: tickerData } = useQuery(tickerQueryKey, () => {
    return queryClient.getQueryData<DataTicker>(tickerQueryKey);
  });

  return (
    <SafeAreaView style={{ flex:1, backgroundColor: 'white' }}>
      <Stack.Screen options={{ headerShown: false }} />
      <HeaderPriceDataComponent tickerData={tickerData} title={title} />
      <ScrollView>
        <View style={{height: 350}}>
          <WebView 
            source={{ uri: uriTradingView }} 
            />
        </View>
        <View style={{marginHorizontal:10, marginVertical: 20}}>
          <View style={{backgroundColor: '#F5F5F5', width: 100, justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius: 7}}>
            <Text style={{fontWeight: 500}}>Order Book</Text>
          </View>
          <OrderBook productId='PI_XBTUSD'/>
        </View>
      </ScrollView>
      <View style={{position:'absolute',bottom:0, backgroundColor: 'white', width: '100%', height: 80, flexDirection:'row', justifyContent: 'space-evenly'}}>
           <TouchableOpacity style={{ backgroundColor: '#2DBD85', justifyContent: 'center', alignItems: 'center', width: 80, height: 40, borderRadius: 7, marginTop: 10}}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>Buy</Text>
           </TouchableOpacity>
           <TouchableOpacity style={{ backgroundColor: '#F6455D', justifyContent: 'center', alignItems: 'center', width: 80, height: 40, borderRadius: 7, marginTop: 10}}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>Sell</Text>
           </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default CoinDetailPage