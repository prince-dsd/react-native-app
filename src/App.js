import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View, Dimensions} from 'react-native';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

import Video from 'react-native-video';

import axios from 'axios';

const App = () => {
  const [isLoading, setLoading] = useState(true);
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

  useEffect(() => {
    (async () => {
      try {
        let response = await axios.post(
          'https://europe-west1-boom-dev-7ad08.cloudfunctions.net/videoFeed',
          {page: 0},
        );

        setLoading(false);
        console.log(Object.values(response.data).map((i, d) => i.playbackUrl));
        const dataArray = Object.values(response.data).map(
          (i, d) => i.playbackUrl,
        );
        setDataProvider((prevState) => prevState.cloneWithRows(dataArray));
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const rowRenderer = (type, url) => {
    return (
      <View style={styles.videoView}>
        <Video
          source={{
            uri: url,
          }}
          style={styles.backgroundVideo}
          rate={1}
          volume={1}
          muted={true}
          resizeMode="cover"
          repeat={true}
          key={url}
        />
      </View>
    );
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
            contentContainerStyle={{margin: 3}}
            renderAheadOffset={7680}
          />
        </>
      )}
    </View>
  );
};
export default App;
const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
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
