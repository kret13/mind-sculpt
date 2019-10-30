// import useAsyncStorage from ' ../hooks/index'
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import ColumnList from '../components/ColumnList'
import RowList from '../components/RowList'
import SearchBar from '../components/SearchBar'
import ListContext from '../context'
const HomeScreen = () => {
  const { data, storeItem } = useContext(ListContext)
  const [term, setTerm] = useState('')

  useEffect(() => {
    filterDataByTitle(term)
  }, [term])

  const filterDataByTitle = (search) => {
    return data.filter((dataItem) => {
      return dataItem.title.toLowerCase().includes(search.trim().toLowerCase())
    })
  }
  const filterDataByCategory = (search) => {
    return data.filter((dataItem) => {
      return dataItem.category.includes(search)
    })
  }

  let list
  if (term) {
    list = (
      <>
        <SearchBar
          term={term}
          onTermChange={setTerm}
          onTermSubmit={() => filterDataByTitle(term)}
        />
        <ColumnList
          headerTitle={'Searching...'}
          data={filterDataByTitle(term)}
          storeItem={storeItem}
          navigateTo={'HomeDetailScreen'}
        />
      </>
    )
  } else {
    list = (
      <>
        <SearchBar
          term={term}
          onTermChange={setTerm}
          onTermSubmit={() => filterDataByTitle(term)}
        />
        <ScrollView>
          <RowList
            onStoreItem={storeItem}
            results={filterDataByCategory('Self Help')}
            title="Self Help"
          />
          <RowList
            onStoreItem={storeItem}
            results={filterDataByCategory('Communication')}
            title="Communication"
          />
          <RowList
            onStoreItem={storeItem}
            results={filterDataByCategory('Food Healing')}
            title="Food Healing"
          />
        </ScrollView>
      </>
    )
  }

  return <>{list}</>
}

export default HomeScreen
