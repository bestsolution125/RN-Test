import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Post from './src/allPostspage';
import AllPosts from './src/post';
const Stack = createNativeStackNavigator();
class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="All Post" component={AllPosts} />
          <Stack.Screen name="Post Detail" component={Post} />
        </Stack.Navigator>
      </NavigationContainer>
    )


  }
}
export default App
