import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View, Dimensions} from 'react-native';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

import Stream from './Stream/Stream';

import axios from 'axios';

const StreamView = () => {
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [dataProvider, setDataProvider] = React.useState(
    new DataProvider((r1, r2) => {
      return r1 !== r2;
    }),
  );

  const {width, height} = Dimensions.get('screen');
  const [layoutProvider] = useState(
    new LayoutProvider(
      (index) => 1,
      (type, dim) => {
        dim.width = width;
        dim.height = height;
      },
    ),
  );

  const fetchMoreData = async (page) => {
    try {
      let response = await axios.post(
        'https://europe-west1-boom-dev-7ad08.cloudfunctions.net/videoFeed',
        {page: page},
      );

      setLoading(false);

      console.log(response.data);

      setDataProvider((prevState) =>
        prevState.cloneWithRows(data.concat(response.data)),
      );
      console.log(Object.keys(dataProvider).length);

      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        let response = await axios.post(
          'https://europe-west1-boom-dev-7ad08.cloudfunctions.net/videoFeed',
          {page: 0},
        );

        setLoading(false);

        // console.log(response.data);

        setDataProvider((prevState) =>
          prevState.cloneWithRows(data.concat(response.data)),
        );
        console.log(Object.keys(dataProvider).length);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const rowRenderer = (type, url) => {
    return <Stream stream={url} />;
  };
  const handleReachedEnd = () => {
    setPage((prevPage) => prevPage + 1);
    fetchMoreData(page);
  };
  return (
    <View style={styles.viewStyles}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <RecyclerListView
            style={styles.listView}
            layoutProvider={layoutProvider}
            dataProvider={dataProvider}
            rowRenderer={rowRenderer}
            renderAheadOffset={7680}
            onEndReached={handleReachedEnd}
          />
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  listView: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  viewStyles: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  videoView: {
    flex: 1,
    margin: 5,
  },
});

export default StreamView;
