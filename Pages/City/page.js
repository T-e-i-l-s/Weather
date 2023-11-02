import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import styles from './styles'
import { SelectList } from 'react-native-dropdown-select-list'
import { useState } from 'react'
import axios from 'axios'
import { TextInput } from 'react-native-gesture-handler'


export default function App({navigation}) {

  const [selected, setSelected] = useState("Москва")

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={{width: '90%'}}>
        {/* <SelectList 
          boxStyles={[styles.inputStyles]}
          inputStyles={[styles.inputStyles,{width: '90%'}]}
          dropdownStyles={[styles.dropdownStyle]}
          dropdownItemStyles={[styles.selectList,{width: '100%'}]}
          dropdownTextStyles={styles.dropDownText}
          setSelected={(val) => setSelected(val)} 
          data={data} 
          save="value"
          placeholder={selected}
        /> */}
        <TextInput
        style={styles.input}
        placeholder='Введите ваш город'
        placeholderTextColor={"#c7c7c7"}
        onChangeText={(e) => setSelected(e)}/>
      </View>

      <Text style={styles.button} onPress={() => {
        navigation.navigate('Weather', {'city': selected})
      }}>
        Посмотреть прогноз
      </Text>

    </View>
  );
}
