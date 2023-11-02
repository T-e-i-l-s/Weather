import { StatusBar } from 'expo-status-bar'
import { Animated, Text, View, Image } from 'react-native'
import styles from './styles'
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { TouchableHighlight } from 'react-native';

let flag = false

export default function App({navigation, route}) {

  const param = route.params
  const weatherAPI = 'http://api.weatherapi.com/v1/current.json?key=015d182f792b430abc1103802230111&q='+ param.city +'&aqi=no'
  const forecastAPI = 'http://api.weatherapi.com/v1/forecast.json?key=015d182f792b430abc1103802230111&q='+ param.city +'&days=1&aqi=no&alerts=no'
  const [today, setToday] = useState({})
  const [tomorrow, setTomorrow] = useState({})
  const [data,setData] = useState({})
  const [day,setDay] = useState(0)
  const [cityName, setCityName] = useState(param.city + '(Сегодня)')

  const translateX = useRef(
    new Animated.Value(0)
  ).current

  const Opacity = useRef(
    new Animated.Value(1)
  ).current


  function getData() {
    axios.get(weatherAPI).then((response) => {
      const data = response.data;
      setToday({
        'temp': data.current.temp_c,
        'img': data.current.condition.icon,
        'feelsLike': data.current.feelslike_c,
        'wind': data.current.wind_kph
      })
      setData({
        'temp': data.current.temp_c,
        'img': data.current.condition.icon,
        'feelsLike': data.current.feelslike_c,
        'wind': data.current.wind_kph
      })
    })
    axios.get(forecastAPI).then((response) => {
      const data = response.data.forecast.forecastday[0].day;
      setTomorrow({
        'temp': Math.round(data.mintemp_c) + " - " + Math.round(data.maxtemp_c),
        'img': data.condition.icon,
        'feelsLike': "-",
        'wind': data.maxwind_kph
      })
      console.log(response.data.forecast.forecastday[0].day)
    })
  }

  function changeDay(i) {
    if ( i == 1 ) {
      Animated.timing(Opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start()
      Animated.timing(translateX, {
        toValue: -400,
        duration: 500,
        useNativeDriver: true
      }).start()
      setTimeout(() => {
        setDay(1)
        setData(tomorrow)
        setCityName(param.city + "(Завтра)")
        Animated.timing(translateX, {
          toValue: 400,
          duration: 0,
          useNativeDriver: true
        }).start()
        setTimeout(() => {
          Animated.timing(translateX, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
          }).start()
          Animated.timing(Opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
          }).start()
        },1)
      },500)
    } else 
    if ( i == 0 ) {
      Animated.timing(Opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start()
      Animated.timing(translateX, {
        toValue: 400,
        duration: 500,
        useNativeDriver: true
      }).start()
      setTimeout(() => {
        setDay(0)
        setData(today)
        setCityName(param.city + "(Сегодня)")
        Animated.timing(translateX, {
          toValue: -400,
          duration: 0,
          useNativeDriver: true
        }).start()
        setTimeout(() => {
          Animated.timing(translateX, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
          }).start()
          Animated.timing(Opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
          }).start()
        },1)
      },500)
    }
  }

  React.useEffect(() => { // Хук загрузки данных при переходе на страницу

    const focusHandler = navigation.addListener('focus', async () => {

      getData()

    });

    return focusHandler;

  }, [navigation]);

  return (
    
    <View style={styles.container}>

      <StatusBar style="auto"/>


      <TouchableHighlight 
      underlayColor={'rgba(255, 0, 255,0)'}
      onPress={() => navigation.navigate('City')}
      style={styles.exitButton}>
        <Image style={{height: 30, width: 30}}
        source={require('../../assets/icons/cancel.png')}/>
      </TouchableHighlight>
            

      <View style={styles.row}>

        <Animated.View style={[styles.button, {opacity: Opacity}]}>
        {
          day == 1 ? (
            <TouchableHighlight 
            underlayColor={'rgba(255, 0, 255,0)'}
            onPress={() => changeDay(0)}>
              <Image style={{height: 40, width: 40}}
              source={require('../../assets/icons/previous.png')}/>
            </TouchableHighlight>
          ):null
        }
        </Animated.View>

        <Animated.View style={[styles.infoBlock, {transform:[{translateX: translateX}]}]}>
          <Text style={styles.title}>{cityName}</Text>
          <Image style={{height: 50, width: 50, marginTop: 5}}
          source={{
            uri: "https:" + data.img,
          }}/>
          <Text style={styles.temp}>{data.temp}°C</Text>
          <Text style={styles.text}>Ощущается как: {data.feelsLike}°C</Text>
          <Text style={styles.text}>Ветер: {data.wind} км/ч</Text>
        </Animated.View>

        <Animated.View style={[styles.button, {opacity: Opacity}]}>
        {
          day == 0 ? (
            <TouchableHighlight  
            underlayColor={'rgba(255, 0, 255,0)'}
            onPress={() => changeDay(1)}>
              <Image style={{height: 40, width: 40}}
              source={require('../../assets/icons/next.png')}/>
            </TouchableHighlight>
          ):null
        }
        </Animated.View>

      </View>

    </View>

  );
}
