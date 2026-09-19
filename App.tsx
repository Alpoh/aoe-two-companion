import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/Home/HomeScreen';
import StrategiesScreen from './src/screens/Strategies/StrategiesScreen';
import CalculatorScreen from './src/screens/Calculator/CalculatorScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Inicio' }}
        />
        <Tab.Screen
          name="Strategies"
          component={StrategiesScreen}
          options={{ title: 'Estrategias' }}
        />
        <Tab.Screen
          name="Calculator"
          component={CalculatorScreen}
          options={{ title: 'Calculadora' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
