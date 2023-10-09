import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './AllFolders/Navigation/StackNavigator';
import store from './Redux/store';
import { Provider } from 'react-redux';
import { ModalPortal } from 'react-native-modals';
import { UserContext } from './UserContext';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <UserContext>
          <StackNavigator/>
          <ModalPortal/>
        </UserContext>
        
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
