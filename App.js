import React, { useEffect, useState } from 'react'
import { AsyncStorage, Image, StyleSheet, View } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import logo from './assets/logo-250x188.png'
import ListContext from './src/context'
import db from './src/db'
import FavoritesDetailScreen from './src/screens/FavoritesDetailScreen'
import FavoritesScreen from './src/screens/FavoritesScreen'
import HomeDetailScreen from './src/screens/HomeDetailScreen'
import HomeScreen from './src/screens/HomeScreen'

const Logo = ({ type, favorites }) => {
  return (
    <View style={favorites && { marginLeft: 'auto', marginRight: 'auto' }}>
      <Image
        style={
          type === 'home'
            ? styles.logoImageHome
            : favorites
            ? styles.logoImageFavorites
            : styles.logoImageDetails
        }
        source={logo}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  logoImageHome: {
    height: 140,
    width: 180,
    marginLeft: 15,
  },
  logoImageDetails: {
    height: 140,
    width: 160,
    marginLeft: -10,
    marginBottom: 8,
  },
  logoImageFavorites: {
    height: 140,
    width: 180,
    // marginLeft: 155,
  },
})

const HomeStack = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: () => ({
      headerTitle: <Logo type="home" />,
    }),
  },
  HomeDetailScreen: {
    screen: HomeDetailScreen,
    navigationOptions: () => ({
      headerTitle: <Logo />,
    }),
  },
})

const FavoritesStack = createStackNavigator(
  {
    FavoritesScreen: {
      screen: FavoritesScreen,
      navigationOptions: () => ({
        headerTitle: <Logo favorites />,
      }),
    },
    FavoritesDetailScreen: {
      screen: FavoritesDetailScreen,
      navigationOptions: () => ({
        headerTitle: <Logo />,
      }),
    },
  },
  {
    defaultNavigationOptions: {
      headerTitle: <Logo />,
    },
  }
)

const navigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Favorites: FavoritesStack,
  },
  {
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#ff8855',
      inactiveTintColor: '#FFFFFF',
      style: {
        backgroundColor: '#633689',
        paddingBottom: 10,
      },
      labelStyle: {
        textAlign: 'center',
        fontSize: 18,
      },
    },
  }
)

const App = createAppContainer(navigator)

export default () => {
  const [data, setData] = useState(db)
  const [favoritesList, setFavoritesList] = useState([])

  useEffect(() => {
    // removeAllFavoritesFromStorage()
    fetchFavoritesListFromStorage()
  }, [])

  useEffect(() => {
    transformData(data, favoritesList)
  }, [favoritesList, setFavoritesList])

  removeAllFavoritesFromStorage = async () => {
    try {
      await AsyncStorage.removeItem('FAVORITES')
    } catch (error) {
      console.log(error)
    }
  }

  fetchFavoritesListFromStorage = async () => {
    try {
      const dataStorage = await AsyncStorage.getItem('FAVORITES')
      if (dataStorage !== null) {
        setFavoritesList(JSON.parse(dataStorage))
      }
    } catch (error) {
      console.log(error)
    }
  }

  transformData = (dataList, favoritesList) => {
    let favoritesHashT = {}
    let dataHashT = {}

    for (let val of favoritesList) {
      if (typeof val === 'object' && val !== null) {
        favoritesHashT[val.id] = val
      }
    }
    for (let val of dataList) {
      dataHashT[val.id] = val
    }

    for (let key in dataHashT) {
      if (key in favoritesHashT) {
        dataHashT[key].favorites = favoritesHashT[key].favorites
      } else {
        dataHashT[key].favorites = false
      }
    }

    setData(Object.values(dataHashT))
  }

  storeItem = async (item) => {
    try {
      const newItem = { ...item, favorites: !item.favorites }
      let newFavorites = [...favoritesList]
      if (!newFavorites.length) {
        newFavorites = [newItem]
      } else {
        if (newItem.favorites) {
          newFavorites.push(newItem)
        }
        if (!newItem.favorites) {
          newFavorites.forEach((element, index) => {
            if (element.id === newItem.id) {
              newFavorites.splice(index, 1)
            }
          })
        }
      }
      await AsyncStorage.setItem('FAVORITES', JSON.stringify(newFavorites))
      setFavoritesList(newFavorites)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <ListContext.Provider
      value={{
        favoritesList: favoritesList,
        data: data,
        storeItem: storeItem,
      }}
    >
      <App />
    </ListContext.Provider>
  )
}
