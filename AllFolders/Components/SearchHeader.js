import { StyleSheet, Text, View, Pressable, TextInput, SafeAreaView} from 'react-native'
import React from 'react'
import { Ionicons,AntDesign } from '@expo/vector-icons';

const SearchHeader = () => {
  return (
    <View style={{backgroundColor: '#00CED1', padding: 10}}>
        <Pressable style={styles.searchView}>
            <Ionicons name="search" size={22} color="#40403f" />
            <TextInput
                placeholder='Search Amazon.in'
                placeholderTextColor={'gray'}
                style={styles.searchStyle}
            />
            <View style={{marginLeft: 'auto'}}>
                <AntDesign name="scan1" size={24} color="black" />
            </View>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    searchView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 3,
        flex: 1,
        gap: 8,
        height: 45,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#9e9e9e',
        paddingHorizontal: 5
      },
      searchStyle: {
        flex: 1,
        height: 45,
        fontSize: 18
      },
})

export default SearchHeader