import React, { useContext } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import DetailItem from '../components/DetailItem'
import ListContext from '../context'
import db from '../db'

const DataDetailScreen = ({ navigation }) => {
  const { storeItem } = useContext(ListContext)

  const id = navigation.getParam('id')
  const result = db.find((item) => item.id === id)

  return (
    <SafeAreaView>
      <ScrollView>
        <DetailItem result={result} storeItem={storeItem} />
      </ScrollView>
    </SafeAreaView>
  )
}
export default DataDetailScreen
