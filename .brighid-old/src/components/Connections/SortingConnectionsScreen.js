// @flow

import * as React from 'react';
import {
  Alert,
  AsyncStorage,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import {
  sortByNameAscending,
  sortByNameDescending,
  sortByDateAddedAscending,
  sortByDateAddedDescending,
  sortByTrustScoreAscending,
  sortByTrustScoreDescending,
  types,
} from './sortingUtility';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * Connection screen of BrightID
 * Displays a search input and list of Connection Cards
 */

type Props = {
  connections: Array<{
    nameornym: string,
    id: number,
  }>,
  dispatch: () => null,
  connectionsSort: string,
  searchParam: string,
};

class SortingConnectionsScreen extends React.Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    title: 'Connections',
    headerRight: (
      <TouchableOpacity
        style={styles.headerSave}
        onPress={() => {
          navigation.goBack(null);
        }}
      >
        <Text style={styles.headerSaveText}>Save</Text>
      </TouchableOpacity>
    ),
  });

  componentDidMount() {
    console.log('Sorting Connections Screen Screen Mounting');
  }

  componentWillUnmount() {
    console.log('Sorting Connections ScreenScreen Unmounting');
  }

  renderCaret = () => {
    const { connectionsSort } = this.props;
    switch (connectionsSort) {
      case types.byDateAddedAscending:
      case types.byTrustScoreAscending:
      case types.byNameAscending:
        return (
          <MaterialCommunityIcons size={26} name="chevron-up" color="#4990e2" />
        );
      case types.byDateAddedDescending:
      case types.byTrustScoreDescending:
      case types.byNameDescending:
        return (
          <MaterialCommunityIcons
            size={26}
            name="chevron-down"
            color="#4990e2"
          />
        );
      default:
        return (
          <MaterialCommunityIcons size={26} name="chevron-up" color="#4990e2" />
        );
    }
  };

  sortByName = () => {
    const { connectionsSort } = this.props;
    return (
      connectionsSort === types.byNameAscending ||
      connectionsSort === types.byNameDescending
    );
  };

  sortByDateAdded = () => {
    const { connectionsSort } = this.props;
    return (
      connectionsSort === types.byDateAddedAscending ||
      connectionsSort === types.byDateAddedDescending
    );
  };

  sortByTrustScore = () => {
    const { connectionsSort } = this.props;
    return (
      connectionsSort === types.byTrustScoreAscending ||
      connectionsSort === types.byTrustScoreDescending
    );
  };

  selectedStyle = () => ({
    ...styles.sortingOption,
    ...styles.selected,
  });

  render() {
    const { dispatch, connectionsSort } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Sorting connections</Text>
          <Text style={styles.infoText}>Choose one of the methods below</Text>
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={
              this.sortByDateAdded()
                ? this.selectedStyle()
                : styles.sortingOption
            }
            onPress={() => {
              if (connectionsSort !== types.byDateAddedDescending) {
                dispatch(sortByDateAddedDescending());
              } else {
                dispatch(sortByDateAddedAscending());
              }
            }}
          >
            <Text style={styles.sortingText}>Sort by date added </Text>
            {this.sortByDateAdded() ? this.renderCaret() : <View />}
          </TouchableOpacity>
          <TouchableOpacity
            style={
              this.sortByName() ? this.selectedStyle() : styles.sortingOption
            }
            onPress={() => {
              if (connectionsSort !== types.byNameDescending) {
                dispatch(sortByNameDescending());
              } else {
                dispatch(sortByNameAscending());
              }
            }}
          >
            <Text style={styles.sortingText}>Sort by name </Text>
            {this.sortByName() ? this.renderCaret() : <View />}
          </TouchableOpacity>
          <TouchableOpacity
            style={
              this.sortByTrustScore()
                ? this.selectedStyle()
                : styles.sortingOption
            }
            onPress={() => {
              if (connectionsSort !== types.byTrustScoreDescending) {
                dispatch(sortByTrustScoreDescending());
              } else {
                dispatch(sortByTrustScoreAscending());
              }
            }}
          >
            <Text style={styles.sortingText}>Sort by trust score </Text>
            {this.sortByTrustScore() ? this.renderCaret() : <View />}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  optionsContainer: {
    width: '96.7%',
  },
  sortingOption: {
    marginTop: 23,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 5,
  },
  sortingText: {
    fontFamily: 'ApexNew-Medium',
    fontSize: 14,
    color: '#4990e2',
  },
  titleContainer: {
    justifyContent: 'space-around',
    height: 106,
    paddingTop: 11,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e3e1e1',
    width: '96.7%',
  },
  titleText: {
    fontFamily: 'ApexNew-Book',
    fontSize: 18,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.09)',
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 4,
  },
  infoText: {
    fontFamily: 'ApexNew-Book',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
  },
  headerSave: {
    padding: 12,
  },
  headerSaveText: {
    fontFamily: 'ApexNew-Medium',
    fontSize: 18,
    color: '#fff',
    marginRight: 11,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    textShadowColor: 'rgba(0, 0, 0, 0.24)',
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 4,
  },
  selected: {
    borderWidth: 1,
    borderColor: '#4990e2',
  },
});

export default connect((state) => state.main)(SortingConnectionsScreen);
