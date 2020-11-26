import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { LineChart, BarChart } from "react-native-chart-kit";
import { Dimensions, ScrollView } from 'react-native';
import { Text, View, Button } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import s from './styles';

const Statistics = () => {

  const transactionHistory = useSelector((state) => state.transactions.transactionHistory);

  console.log('ESTOY EN LAS ESTADISTICAS ', transactionHistory)

  const [active, setActive] = useState({
    income: false,
    expenses: false,
    weekly: false,
    threeMonths: false,
    sixMonths: false,
  });

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
    strokeWidth: 6,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    propsForDots: {
      r: 12,
      strokeWidth: '12',
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
          < BarChart
            data={StatisticsPerDay()}
            width={3600}
            height={310}
            chartConfig={chartConfig}
          />
        </ScrollView>
      </View>
      <View style={s.optionsContainer}>
        <View style={s.optionTypeContainer}>
          <Button style={active.income ? s.activeButtonType : s.button} onPress={() => setActive(!active.income)}>
            <Text style={active.income ? s.activeText : s.textButton}>Ingresos</Text>
          </Button>
          <Button style={active.expenses ? s.activeButtonType : s.button} onPress={() => showModeTwo()}>
            <Text style={active.expenses ? s.activeText : s.textButton}>Gastos</Text>
          </Button>
        </View>
        <View style={s.optionTimeContainer}>
          <Button style={s.timeButton} onPress={() => showModeOne()}>
            <Text style={s.textButton}>Semanal</Text>
          </Button>
          <Button style={s.timeButton} onPress={() => showModeTwo()}>
            <Text style={s.textButton}>3 Meses</Text>
          </Button>
          <Button style={s.timeButton} onPress={() => showModeOne()}>
            <Text style={s.textButton}>6 Meses</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Statistics;