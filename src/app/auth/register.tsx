// React and React Native imports
import AlertModal from '@components/AlertModal';
import useRegister from '@hooks/auth/register.hooks';
import { RegisterData } from '@interfaces/Register';
import { useRouter } from 'expo-router';
import React, { useState, useRef } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import styles from './styles/register.styles';

const Register = () => {
  const router = useRouter();
  const { loading, register } = useRegister();
  const [registerDetails, setRegisterDetails] = useState<RegisterData>({
    turf_name: '',
    location: '',
    description: '',
    user_name: '',
    user_email: '',
    user_phone: '',
  });

  const alertBoxRef = useRef(null);

  const changeAlertBoxState = () => {
    alertBoxRef.current.setAlertBoxState(true);
  };

  // Update registerDetails when text changes
  const handleInputChange = (field: keyof RegisterData, text: string) => {
    setRegisterDetails((prevState) => ({
      ...prevState,
      [field]: text,
    }));
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text onPress={router.back} style={styles.dismissText}>
        Dismiss
      </Text>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(text) => handleInputChange('user_name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          onChangeText={(text) => handleInputChange('user_phone', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => handleInputChange('user_email', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Venue Name"
          onChangeText={(text) => handleInputChange('turf_name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          onChangeText={(text) => handleInputChange('location', text)}
        />
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Describe about your court"
          multiline
          numberOfLines={6}
          onChangeText={(text) => handleInputChange('description', text)}
        />
        <TouchableOpacity
          style={styles.register}
          onPress={() => register(registerDetails, changeAlertBoxState)}>
          {loading ? (
            <ActivityIndicator size={25} color="white" />
          ) : (
            <Text style={styles.registerText}>Register</Text>
          )}
        </TouchableOpacity>
        <AlertModal
          ref={alertBoxRef}
          description="You have successfully registered with playspots. Our representative will contact you soon!"
        />
      </View>
    </SafeAreaView>
  );
};

export default Register;
