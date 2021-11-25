import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {store} from './src/store';
import FeedView from './src/pages/FeedView';
import {NativeBaseProvider} from 'native-base';
import PostDetailView from './src/pages/PostDetailView';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Feed" component={FeedView} />
            <Stack.Screen name="Post detail" component={PostDetailView} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
