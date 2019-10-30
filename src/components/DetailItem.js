import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const DetailItem = ({ storeItem, result }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{result.title}</Text>
      <Image style={styles.image} source={result.uri} />

      <Text style={styles.description}>{result.description}</Text>

      <MaterialIcons
        style={styles.icon}
        name={result.favorites ? 'favorite' : 'favorite-border'}
        size={52}
        color="#F85"
        onPress={() => storeItem(result)}
      />
    </View>
  )
}
export default DetailItem

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 12,
  },
  image: {
    height: 200,
    width: 300,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'justify',
    width: '80%',
  },
  icon: {
    marginTop: 10,
    marginBottom: 35,
  },
})
