import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View } from 'react-native';

import PriceRowComponent from '@/sockets/ticker/components/PriceRow';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <PriceRowComponent pair="xbtusd" title="BTC" />
      <PriceRowComponent pair='ethusd' title='ETH' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15
  }
});
