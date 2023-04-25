import React, {Component} from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

interface IState {
  arraySize: number;
  arrayData: number[];
}

class App extends Component<{}, IState> {
  intervalId: NodeJS.Timeout | null = null;

  constructor(props: {}) {
    super(props);
    const arraySize = Math.floor(Math.random() * (60 - 45 + 1) + 45);
    const arrayData = Array.from({length: arraySize}, () =>
      Math.floor(Math.random() * 6000),
    );
    this.state = {arraySize, arrayData};
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      const newData = Array.from({length: this.state.arraySize}, () =>
        Math.floor(Math.random() * 6000),
      );
      this.setState({arrayData: newData});
    }, 1000);
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <Text style={styles.navBarTitle}>Assignment 1</Text>
        </View>
        <LineChart
          data={{
            labels: Array.from({length: this.state.arraySize}, (_, i) =>
              i.toString(),
            ),
            datasets: [
              {
                data: this.state.arrayData,
              },
            ],
          }}
          width={screenWidth}
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          }}
          style={{marginVertical: 8, borderRadius: 16}}
          withDots={false}
          withInnerLines={false}
          withOuterLines={false}
          withShadow={true}
          withHorizontalLabels={true}
          withVerticalLabels={false}
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
  navBar: {
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  navBarTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#5065AD',
  },
});

export default App;
