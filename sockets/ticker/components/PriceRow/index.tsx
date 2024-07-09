import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import { Link, router } from 'expo-router';
import useWebSocket from 'react-use-websocket';
import { createShimmerPlaceHolder } from 'expo-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
import { debounce } from 'lodash';

import { DataTicker } from '@/types/ticker';
import { formatNumber } from '@/helpers/formatNumber';

type PriceRowComponentProps = {
  pair: string;
  title: string;
};

const products_id = ['PI_XBTUSD', 'PI_ETHUSD', 'PF_SOLUSD', 'PF_BNBUSD'];
export const WSS_FEED_URL = 'wss://www.cryptofacilities.com/ws/v1';

const PriceRowComponent: React.FC<PriceRowComponentProps> = ({ pair, title }) => {
  const queryClient = useQueryClient();
  const tickerQueryKey = `${pair}_ticker_ws`;
  const ShimmerPlaceHolder = createShimmerPlaceHolder(LinearGradient);

  const mutationFn = async (newData: DataTicker) => {
    if (newData.product_id === 'PI_ETHUSD') {
      queryClient.setQueryData('ethusd_ticker_ws', newData);
    }
    if (newData.product_id === 'PI_XBTUSD') {
      queryClient.setQueryData('xbtusd_ticker_ws', newData);
    }
    if (newData.product_id === 'PF_SOLUSD') {
      queryClient.setQueryData('solusd_ticker_ws', newData);
    }
    if (newData.product_id === 'PF_BNBUSD') {
      queryClient.setQueryData('bnbusd_ticker_ws', newData);
    }
  };

  const { mutate: mutateTicker } = useMutation(mutationFn);

  const debouncedOnMessage = debounce((event: MessageEvent) => {
    const data: DataTicker = JSON.parse(event.data);
    mutateTicker(data);
  }, 100);

  const { sendJsonMessage } = useWebSocket(WSS_FEED_URL, {
    onOpen: () => console.log('WebSocket connection opened.'),
    onClose: () => console.log('WebSocket connection closed.'),
    shouldReconnect: () => true,
    onMessage: debouncedOnMessage,
  });

  React.useEffect(() => {
    const subscribeMessage = {
      event: 'subscribe',
      feed: 'ticker',
      product_ids: products_id,
    };
    sendJsonMessage(subscribeMessage);

    return () => {
      const unSubscribeMessage = {
        event: 'unsubscribe',
        feed: 'ticker',
        product_ids: products_id,
      };
      sendJsonMessage(unSubscribeMessage);
    };
  }, [sendJsonMessage]);

  const { data: tickerData } = useQuery(tickerQueryKey, () => {
    return queryClient.getQueryData<DataTicker>(tickerQueryKey);
  });

  return (
    <ShimmerPlaceHolder width={300} height={35} style={{ marginTop: 20, borderRadius: 7 }} visible={!!tickerData}>
      <Link href={{
        pathname:'/CoinDetail',
        params: { pair: pair, title: title }
      }} asChild>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 50 }}>
        <Text style={{ fontWeight: '500', fontSize: 18 }}>{title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 120 }}>
            {tickerData && (
              <Text style={{ fontWeight: '500', fontSize: 18 }}>{formatNumber(tickerData?.markPrice)}</Text>
            )}
            {tickerData && (
              <Text style={{ fontWeight: '500', fontSize: 12, color: '#7B8697' }}>${formatNumber(tickerData?.markPrice)}</Text>
            )}
          </View>
          <View style={{ width: 80, height: 35, backgroundColor: tickerData && tickerData?.change < 0 ? '#F6475D' : tickerData && tickerData?.change === 0 ? '#F5F5F5' : '#2DBD85', borderRadius: 7, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontWeight: '700', fontSize: 15, color: 'white' }}>
              {tickerData?.change}%
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      </Link>
    </ShimmerPlaceHolder>
  );
};

export default PriceRowComponent;
