import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector, useDispatch } from 'react-redux'

import { LineChart } from "react-native-chart-kit";
import { Dimensions, ScrollView } from 'react-native';
import { Text, View, Button } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import s from './styles';

const Statistics = () => {

  const transactionHistory = useSelector((state) => state.transactions.transactionHistory);

  console.log('ESTOY EN LAS ESTADISTICAS ', transactionHistory)

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

  const StatisticsPerDay = () => {
    let dates = [];
    let amounts = [];
    transactionHistory.map(transaction => {
      dates.push(transaction.createdAt.substring(5, 10).split('-').reverse().join('/'));
      amounts.push(transaction.amount)
    });

    let dataPerDay = {

      labels: dates,
      datasets: [
        {
          data: amounts,
          color: (opacity = 1) => `rgba(75, 129, 231, ${opacity})`,
          strokeWidth: 2,
        }
      ],
    };

    return dataPerDay;
  }

  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(72, 129, 231, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(72, 129, 231 , ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    propsForDots: {
      r: "5",
      strokeWidth: "2",
      stroke: "#4b81e7"
    },
    style: {
      borderRadius: 16,
      fontFamily: 'RedHatText_Regular',
    },
  };

  return (
    <View>
      <Text style={s.header}>Estadisticas</Text>
      <View>
        <ScrollView horizontal={true}>
          < LineChart
            data={StatisticsPerDay()}
            width={3600}
            height={310}
            chartConfig={chartConfig}
          />
        </ScrollView>
      </View>
      <View style={s.optionsContainer}>
        {/* <Button style={s.button} onPress={() => showModeOne()}>
          <Text style={s.textButton}>Fecha inicial</Text>
        </Button>
        <Button style={s.button}onPress={() => showModeTwo()}>
          <Text style={s.textButton}>Fecha limite</Text>
        </Button> */}
        <View style={s.optionTypeContainer}>
          <Button style={s.button} onPress={() => showModeOne()}>
            <Text style={s.textButton}>Ingresos</Text>
          </Button>
          <Button style={s.button} onPress={() => showModeTwo()}>
            <Text style={s.textButton}>Gastos</Text>
          </Button>
        </View>
        <View style={s.optionTimeContainer}>
          <Button style={s.timeButton} onPress={() => showModeOne()}>
            <Text style={s.textButton}>Semana</Text>
          </Button>
          <Button style={s.timeButton} onPress={() => showModeTwo()}>
            <Text style={s.textButton}>3 Meses</Text>
          </Button>
          <Button style={s.timeButton} onPress={() => showModeOne()}>
            <Text style={s.textButton}>6 Meses</Text>
          </Button>
        </View>
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