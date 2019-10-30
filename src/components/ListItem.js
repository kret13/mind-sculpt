import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const ListItem = ({
  result,
  onStoreItem,
  styleItemContainer,
  styleItemImage,
  styleItemContainerText,
  styleItemIitle,
}) => {
  return (
    <View style={styleItemContainer}>
      <Image style={styleItemImage} source={result.uri} />
      <View style={styleItemContainerText}>
        <Text style={styleItemIitle}>{result.title}</Text>
        <MaterialIcons
          name={result.favorites ? 'favorite' : 'favorite-border'}
          size={32}
          color="#F85"
          onPress={() => onStoreItem(result)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})

export default ListItem
