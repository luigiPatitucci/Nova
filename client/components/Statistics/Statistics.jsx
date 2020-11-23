import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

import { LineChart } from "react-native-chart-kit";
import { Dimensions, ScrollView } from 'react-native';
import { Text, View, Button } from 'native-base';

import s from './styles';

const Statistics = () => {

  const [initialDate, setInitialDate] = useState(new Date(1598051730000));
  const [limitDate, setLimitDate] = useState(new Date(1598051730000));
  const [showInitial, setShowInitial] = useState(false);
  const [showLimit, setShowLimit] = useState(false);

  const onChangeOne = (event, selectedDate) => {
    let currentDate = selectedDate || initialDate;
    setShowInitial(Platform.OS === 'ios');
    setInitialDate(currentDate);
  };

  const onChangeTwo = (event, selectedDate) => {
    let currentDate = selectedDate || limitDate;
    setShowLimit(Platform.OS === 'ios');
    setLimitDate(currentDate);
  };

  const showModeOne = () => {
    setShowInitial(true);
  };

  const showModeTwo = () => {
    setShowLimit(true);
  };

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, 
        strokeWidth: 2 
      }
    ],
    legend: ["hola"] 
  };

  const chartConfig = {
    backgroundColor: 'yellow',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: .3,
    color: (opacity = 1) => `rgba(75, 129, 231, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false 
  };

  return (
    <View>
      <Text style={s.header}>Estadisticas</Text>
      <View>
        <ScrollView horizontal={true}>
          < LineChart
            data={data}
            width={1000}
            height={300}
            verticalLabelRotation={30}
            chartConfig={chartConfig}
            bezier
          />
        </ScrollView>
      </View>
      <View style={s.optionsContainer}>
        <Button onPress={() => showModeOne()}>
          <Text>Hola</Text>
        </Button>
        <Button onPress={() => showModeTwo()}>
          <Text>Hola2</Text>
        </Button>
        <Button onPress={() => console.log('SOY EL INICIO', initialDate, 'SOY EL FIN', limitDate)}>
          <Text>Chau</Text> 
        </Button>
      </View>
      {/* INITIAL DATE */}
      <View>
        {
          showInitial && (
            <DateTimePicker
              testID="dateTimePicker"
              value={initialDate}
              mode='date'
              is24Hour={true}
              display="default"
              onChange={onChangeOne}
            />
          )
        }
      </View>
      {/* LIMIT DATE */}
      <View>
        {
          showLimit && (
            <DateTimePicker
              testID="dateTimePicker"
              value={limitDate}
              mode='date'
              is24Hour={true}
              display="default"
              onChange={onChangeTwo}
            />
          )
        }
      </View>
    </View>
  );
};

export default Statistics;