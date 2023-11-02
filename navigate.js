
import City from './Pages/City/page'
import Weather from './Pages/Weather/page'

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator()

export default function Navigate () {

  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="City"
        component={ City }
        options={ { headerShown: false, animationEnabled: false } }
      />
      <Stack.Screen
        name="Weather"
        component={ Weather }
        options={ { headerShown: false, animationEnabled: false } }
        initialParams={{'city': 'Moscow'}}
      />
    </Stack.Navigator>
  </NavigationContainer>

}
