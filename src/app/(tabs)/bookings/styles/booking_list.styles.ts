import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingTop: 0,
  },
  item: {
    backgroundColor: '#E0E0E0',
    padding: 8,
    borderRadius: 10,
    borderWidth: 0.3,
    borderColor: 'gray',
    margin: 5,
  },
  selectedItem: {
    borderColor: 'blue', // Customize the border color for selected item
  },
  itemName: {
    fontSize: 14,
  },
});
export default styles;
