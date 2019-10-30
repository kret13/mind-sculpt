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
const ColumnList = ({
  navigateTo,
  navigation,
  data,
  storeItem,
  headerTitle,
}) => {
  return (
    <View style={styles.mainWrapper}>
      <Text style={styles.headerTitle}>{headerTitle}</Text>

      <FlatList
        style={{ width: '100%' }}
        data={data}
        keyExtractor={(result) => result.title}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.itemWrapper}
              onPress={() =>
                navigation.navigate(navigateTo, {
                  id: item.id,
                })
              }
            >
              <ListItem
                styleItemContainer={styles.itemContainer}
                styleItemImage={styles.itemImage}
                styleItemContainerText={styles.itemContainerText}
                styleItemIitle={styles.itemIitle}
                result={item}
                onStoreItem={storeItem}
              />
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

export default withNavigation(ColumnList)

const styles = StyleSheet.create({
  mainWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  itemWrapper: {
    alignItems: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  itemContainer: {
    marginBottom: 15,
    marginTop: 15,
  },
  itemContainerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemImage: {
    width: 250,
    height: 120,
    borderRadius: 4,
    marginBottom: 5,
  },
  itemIitle: {
    flexGrow: 2000,
  },
})
