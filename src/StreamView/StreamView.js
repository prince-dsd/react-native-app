import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {RecyclerListView, LayoutProvider, DataProvider} from 'recyclerlistview';
import {connect} from 'react-redux';
import {StreamVideo} from '../Stream/Stream';
//actions
import {getStreamData} from '../redux/streamData/actions';

const StreamView = ({getAllStreams, isLoading, streamData}) => {
  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => {
      return r1 !== r2;
    }),
  );
  const [page, setPage] = useState(0);
  const {width, height} = Dimensions.get('screen');
  const [layoutProvider] = useState(
    new LayoutProvider(
      (index) => 0,
      (type, dim) => {
        dim.width = width;
        dim.height = height;
      },
    ),
  );
  const ViewTypes = {
    FULL: 0,
  };

  useEffect(() => {
    getAllStreams(page);
  }, [page, getAllStreams]);

  useEffect(() => {
    setDataProvider((prevDataProvider) =>
      prevDataProvider.cloneWithRows(streamData),
    );
  }, [streamData]);

  useEffect(() => {
    console.log(dataProvider._size);
    console.log(streamData);
  });

  const rowRenderer = (type, url) => {
    switch (type) {
      case ViewTypes.FULL:
        return <StreamVideo stream={url} />;
      default:
        return null;
    }
  };

  const handleReachedEnd = () => {
    setPage((prevPage) => prevPage + 1);
    if (page > 0) getAllStreams(page);
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
            renderAheadOffset={0}
            onEndReachedThreshold={500}
            onEndReached={handleReachedEnd}
            scrollViewProps={{
              refreshControl: (
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={async () => {
                    setPage(0);
                    await getAllStreams(1);
                  }}
                />
              ),
            }}
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
    padding: 0,
    justifyContent: 'space-between',
    backgroundColor: '#0c0c14',
  },
});

const mapStateToProps = (state) => ({
  isLoading: state.streams.isLoading,
  streamData: state.streams.streamData,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllStreams: (page) => dispatch(getStreamData(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamView);
