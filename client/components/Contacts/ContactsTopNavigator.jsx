import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ContactList from './ContactList';
import ImportList from './ImportList';

const Tab = createMaterialTopTabNavigator();

function ContactsTopNavigator() {
  return (
    <Tab.Navigator swipeEnabled={false}>
      <Tab.Screen name="Contacts" component={ContactList} />
      <Tab.Screen name="Import" component={ImportList} />
    </Tab.Navigator>
  );
}

export default ContactsTopNavigator;