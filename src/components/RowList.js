import React from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { withNavigation } from 'react-navigation'
import ListItem from './ListItem'

const RowList = ({ title, results, onStoreItem, navigation }) => {
  if (!results.length) {
    return null
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={results}
        keyExtractor={(result) => result.title}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('HomeDetailScreen', { id: item.id })
              }
            >
              <ListItem
                onStoreItem={onStoreItem}
                result={item}
                styleItemContainer={styles.itemContainer}
                styleItemImage={styles.itemImage}
                styleItemContainerText={styles.itemContainerText}
                styleItemIitle={styles.itemTitle}
              />
            </TouchableOpacity>
          )
        }}
      />
      <View style={styles.divider} />
    </View>
  )
}
export default withNavigation(RowList)

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 5,
    color: '#F85',
  },
  mainContainer: {
    marginBottom: 10,
  },
  divider: {
    borderWidth: 0.3,
    borderColor: '#633689',
    marginTop: 5,
    marginBottom: 7,
    marginLeft: 15,
  },
  itemContainer: {
    marginLeft: 15,
  },
  itemImage: {
    width: 250,
    height: 120,
    borderRadius: 4,
    marginBottom: 5,
  },
  itemContainerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontWeight: 'bold',
  },
})
