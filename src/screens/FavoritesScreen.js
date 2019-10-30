import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import ColumnList from '../components/ColumnList'
import ListContext from '../context'
const FavoritesScreen = () => {
  const { favoritesList, storeItem } = useContext(ListContext)

  return (
    <ColumnList
      headerTitle={'My Favorites'}
      data={favoritesList}
      storeItem={storeItem}
      navigateTo={'FavoritesDetailScreen'}
    />
  )
}

const styles = StyleSheet.create({})

export default FavoritesScreen
