import React from 'react';
import { View } from 'react-native';
import PriceRowComponent from './components/PriceRow';

const TickerWsComponent = () => {
  return (
    <View>
      <PriceRowComponent pair='bnbusd' title='BNB' />
      <PriceRowComponent pair='xbtusd' title='BTC' />
      <PriceRowComponent pair='ethusd' title='ETH' />
      <PriceRowComponent pair='solusd' title='SOL' />
    </View>
  );
};

export default TickerWsComponent;
