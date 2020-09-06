import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Video } from 'expo-av';

const { height, width } = Dimensions.get('window');

const cellHeight = height * 0.6;
const cellWidth = width;

const viewabilityConfig = {
  itemVisiblePercentThreshold: 80,
};

const initialItems = [
  {
    id: 0,
    url:
    'https://i.imgur.com/6x1s2P3.mp4',
    poster:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
  },
  {
    id: 1,
    url:
      'https://i.imgur.com/2G7wigK.mp4',
    poster:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
  },
  {
    id: 2,
    url:
      'https://i.imgur.com/r9VwWcN.mp4',
  },
  {
    id: 3,
    url:
      'https://i.imgur.com/gOZz1TY.mp4',
  },
];

class Item extends React.PureComponent {
  componentWillUnmount() {
    if (this.video) {
      this.video.unloadAsync();
    }
  }

  async play() {
    const status = await this.video.getStatusAsync();
    if (status.isPlaying) {
      return;
    }
    return this.video.playAsync();
  }

  pause() {
    if (this.video) {
      this.video.stopAsync();
    }
  }

  render() {
    const { id, poster, url } = this.props;
    const uri = url + '?bust=' + id;
    return (
      <View style={styles.cell}>
        <Video
          ref={(ref) => {
            this.video = ref;
          }}
          source={{uri}}
          shouldPlay={false}
          isMuted
          resizeMode="cover"
          style={styles.full}
        />
      </View>
    );
  }
}

export default class App extends React.PureComponent {
  state = {
    items: [],
  };

  constructor(props) {
    super(props);
    this.cellRefs = {};
  }

  componentDidMount() {
    this.loadItems();
    setTimeout(this.loadItems, 1000);
    setTimeout(this.loadItems, 1100);
    setTimeout(this.loadItems, 1200);
    setTimeout(this.loadItems, 1300);
  }

  _onViewableItemsChanged = (props) => {
    const changed = props.changed;
    changed.forEach((item) => {
      const cell = this.cellRefs[item.key];
      if (cell) {
        if (item.isViewable) {
          cell.play();
        } else {
          cell.pause();
        }
      }
    });
  };

  loadItems = () => {
    const start = this.state.items.length;
    const newItems = initialItems.map((item, i) => ({
      ...item,
      id: start + i,
    }));
    const items = [...this.state.items, ...newItems];
    this.setState({ items });
  };

  _renderItem = ({ item }) => {
    return (
      <Item
        ref={(ref) => {
          this.cellRefs[item.id] = ref;
        }}
        {...item}
      />
    );
  };

  render() {
    const { items } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          style={{ flex: 1 }}
          data={items}
          renderItem={this._renderItem}
          keyExtractor={(item) => item.id}
          onViewableItemsChanged={this._onViewableItemsChanged}
          windowSize={5}
          getItemLayout={(_data, index) => ({
            length: cellHeight,
            offset: cellHeight * index,
            index,
          })}
          viewabilityConfig={viewabilityConfig}
          removeClippedSubviews={true}
          ListFooterComponent={
            <TouchableOpacity onPress={this.loadItems}>
              <Text style={{ padding: 30 }}>Load more</Text>
            </TouchableOpacity>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cell: {
    width: cellWidth - 20,
    height: cellHeight - 20,
    backgroundColor: '#eee',
    borderRadius: 20,
    overflow: 'hidden',
    margin: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 40,
  },
  full: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  poster: {
    resizeMode: 'cover',
  },
  overlayText: {
    color: '#fff',
  },
});
