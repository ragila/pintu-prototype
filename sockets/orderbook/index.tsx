import React, { FunctionComponent, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { useQueryClient, useMutation } from 'react-query';
import { Text, View } from 'react-native';
import { formatNumber } from '@/helpers/formatNumber';

const WSS_FEED_URL: string = 'wss://www.cryptofacilities.com/ws/v1';

export enum OrderType {
  BIDS,
  ASKS
}

interface OrderBookProps {
  productId: string;
}

interface Delta {
  bids: number[][];
  asks: number[][];
}

const OrderBook: FunctionComponent<OrderBookProps> = ({ productId }) => {
  const [bids, setBids] = useState<number[][]>([[55879, 400000], [56163, 200000], [56653, 69369], [56686, 28552], [56690, 8935], [56607, 296456], [56668, 54495], [56668, 8935], [56671, 43792], [55957, 98]]);
  const [asks, setAsks] = useState<number[][]>([[55879, 400000], [56163, 200000], [56653, 69369], [56686, 28552], [56690, 8935], [56607, 296456], [56668, 54495], [56668, 8935], [56671, 43792], [55957, 98]]);
  const queryClient = useQueryClient();

  // const mutationFn = async (newData: Delta) => {
  //   if (newData.bids?.length > 0) {
  //     setBids((prevBids) => {
  //       const updatedBids = [...prevBids, ...newData.bids.filter(([, size]) => size !== 0)];
  //       return updatedBids.slice(0, 10);
  //     });
  //   }

  //   if (newData.asks?.length > 0) {
  //     setAsks((prevAsks) => {
  //       const updatedAsks = [...prevAsks, ...newData.asks.filter(([, size]) => size !== 0)];
  //       return updatedAsks.slice(0, 10);
  //     });
  //   }
  // };

  // const { mutate: processDelta } = useMutation(mutationFn);

  // const { sendJsonMessage } = useWebSocket(WSS_FEED_URL, {
  //   onOpen: () => console.log('WebSocket connection opened.'),
  //   onClose: () => console.log('WebSocket connection closed.'),
  //   shouldReconnect: (closeEvent) => true,
  //   onMessage: (event: WebSocketEventMap['message']) => processMessages(event)
  // });

  // const processMessages = (event: { data: string }) => {
  //   const response = JSON.parse(event.data);

  //   if (response.numLevels) {
  //     queryClient.setQueryData('orderBook', response);
  //   } else {
  //     processDelta(response);
  //   }
  // };

  // useEffect(() => {
  //   const subscribeMessage = {
  //     event: 'subscribe',
  //     feed: 'book_ui_2',
  //     product_ids: ['PI_xbtusd'],
  //   };
  //   sendJsonMessage(subscribeMessage);

  //   return () => {
  //     const unSubscribeMessage = {
  //       event: 'unsubscribe',
  //       feed: 'book_ui_3',
  //       product_ids: ['PI_xbtusd'],
  //     };
  //     sendJsonMessage(unSubscribeMessage);
  //   };
  // }, [sendJsonMessage]);

  return (
    <View style={{marginTop: 20, marginBottom: 40}}>
      {bids.length && asks.length ? (
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '50%', marginRight: 3 }}>
            <Text style={{marginBottom: 5, color: '#7A8495'}}>Bid</Text>
            {bids.map((data, index) => (
              <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                <Text>{formatNumber(data[1])}</Text>
                <Text style={{color: '#00B879'}}>{formatNumber(data[0])}</Text>
              </View>
            ))}
          </View>
          <View style={{ width: '50%', marginLeft: 3 }}>
            <Text style={{marginBottom: 5, color: '#7A8495'}}>Ask</Text>
            {asks.map((data, index) => (
              <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                <Text style={{color: '#F40037'}}>{formatNumber(data[0])}</Text>
                <Text>{formatNumber(data[1])}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <Text>Loading</Text>
      )}
    </View>
  );
};

export default OrderBook;
