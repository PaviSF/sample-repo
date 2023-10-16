import { convertUTCToIST } from '@utils/time';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CardProps {
  name: string;
  phoneNumber: string;
  text: string;
  date: string;
  UTCStartTime: number;
  UTCEndTime: number;
}

const Card: React.FC<CardProps> = ({ name, phoneNumber, text, date, UTCStartTime, UTCEndTime }) => {
  const startTime = convertUTCToIST(UTCStartTime);
  const endTime = convertUTCToIST(UTCEndTime);
  return (
    <View style={styles.container}>
      {/* Top Half */}
      <View style={styles.topContainer}>
        <View style={styles.profileContainer}>
          {/* Profile Icon */}
          {/* Replace the 'source' with your profile icon */}
          <View style={styles.profileIcon} />

          {/* Name, Phone Number, and Text */}
          <View style={styles.profileDetails}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.phoneNumber}>{phoneNumber}</Text>
            <Text style={styles.smallText}>{text}</Text>
          </View>
        </View>

        {/* Three Icons */}
        {/* Replace the 'source' with your icon sources */}
        <View style={styles.iconsContainer}>{/* Three icons here */}</View>
      </View>

      {/* Thin Black Line */}
      <View style={styles.line} />

      {/* Bottom Half */}
      <View style={styles.bottomContainer}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.time}>{`${startTime}-${endTime}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'lightgray', // Replace with your desired color or image
  },
  profileDetails: {
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  phoneNumber: {
    fontSize: 14,
  },
  smallText: {
    fontSize: 12,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  line: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 10,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 16,
  },
  time: {
    fontSize: 16,
  },
});

export default Card;
