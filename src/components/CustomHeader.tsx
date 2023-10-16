import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const CustomHeader = ({ username, location }) => {
  //const [profileIcon, setProfileIcon] = React.useState<string>('');
  React.useEffect(() => {
    async function prepare() {
      //const profileIconLink = await AsyncStorage.getItem('turf_logo');
      //const icon = process.env.EXPO_PUBLIC_PROFILE_IMAGE_URL + profileIconLink;
      // setProfileIcon(
      //   'https://imgs.search.brave.com/rCy26_MYXBlZ7U1GsVc6XhQ4nRClOT4sCUVouJEDT_g/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/c2kuY29tLy5pbWFn/ZS9jX2xpbWl0LGNz/X3NyZ2IsZmxfcHJv/Z3Jlc3NpdmUscV9h/dXRvOmdvb2Qsd183/MDAvTVRZNE1UQXlO/VGMxTXpJME1EYzVN/emMzLzIwMTEtMDQy/Ny1saW9uZWwtbWVz/c2lqcGcuanBn',
      // );
    }
    prepare();
  }, []);
  return (
    <View style={styles.header}>
      {/* User information */}
      <View style={styles.userInfo}>
        <Image
          source={{
            uri: 'https://imgs.search.brave.com/rCy26_MYXBlZ7U1GsVc6XhQ4nRClOT4sCUVouJEDT_g/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/c2kuY29tLy5pbWFn/ZS9jX2xpbWl0LGNz/X3NyZ2IsZmxfcHJv/Z3Jlc3NpdmUscV9h/dXRvOmdvb2Qsd183/MDAvTVRZNE1UQXlO/VGMxTXpJME1EYzVN/emMzLzIwMTEtMDQy/Ny1saW9uZWwtbWVz/c2lqcGcuanBn',
          }}
          style={styles.profileIcon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.location}>{location}</Text>
        </View>
      </View>

      {/* Right icons */}
      <View style={styles.rightIcons}>
        <TouchableOpacity>
          {/* Icon 2 */}
          <Ionicons
            name="add-circle-outline"
            size={28}
            color="white"
            style={{ paddingHorizontal: 5 }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          {/* Icon 1 */}
          <MaterialCommunityIcons
            name="bell"
            size={28}
            color="white"
            style={{ paddingHorizontal: 5 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 0.08,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#00913E',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  textContainer: {
    marginLeft: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#ffffff',
  },
  location: {
    fontSize: 16,
    color: '#ffffff',
  },
  rightIcons: {
    flexDirection: 'row',
  },
});

export default CustomHeader;
