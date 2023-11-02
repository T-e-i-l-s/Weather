import { StyleSheet, StatusBar } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333842',
    alignItems: 'center',
    justifyContent: 'center',
  },

  exitButton: {
    position: 'absolute',
    top: StatusBar.currentHeight,
    left: 15,
  },
  
  title: {
    width: '100%',
    fontSize:19,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center'
  },

  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  infoBlock: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  temp: {
    width: '100%',
    fontSize:40,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
  },

  text: {
    width: '100%',
    fontSize:19,
    fontWeight: '300',
    color: '#fff',
    textAlign: 'center'
  },
});
