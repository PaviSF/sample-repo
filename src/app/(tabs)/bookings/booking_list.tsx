import Card from '@components/Card';
import CustomHeader from '@components/CustomHeader';
import { secondaryColor } from '@constants/Colors';
import { BookingTypes } from '@constants/Enums';
import BookingDataApiResponse, { BookingData } from '@interfaces/BookingData';
import ManagerDataResponse from '@interfaces/ManagerData';
import { postData } from '@utils/api';
import groundSpliting, { Split } from '@utils/groundSpliting';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState, useReducer } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';

import styles from './styles/booking_list.styles';

interface BookingState {
  type: number;
  slot_id: string;
  sport_id: string;
  date: string;
  page: number;
}

interface Action {
  type: string;
  payload: number | string; // Update the payload type as per the data type expected
}

const initialState: BookingState = {
  type: 1,
  slot_id: '',
  sport_id: '',
  date: '',
  page: 1,
};

// Define the reducer function
const bookingReducer = (state: BookingState, action: Action) => {
  switch (action.type) {
    case 'SET_TYPE':
      return { ...state, type: action.payload };
    case 'SET_SLOT_ID':
      return { ...state, slotId: action.payload };
    case 'SET_SPORT_ID':
      return { ...state, sportId: action.payload };
    case 'SET_DATE':
      return { ...state, date: action.payload };
    case 'INCREMENT_PAGE':
      return { ...state, page: state.page + 1 };
    case 'RESET_PAGE':
      return { ...state, page: initialState.page };
    default:
      return state;
  }
};

export default function App() {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: `Today's Booking`, value: BookingTypes.TODAY },
    { label: 'Upcoming Booking', value: BookingTypes.UPCOMING },
    { label: 'Past Booking', value: BookingTypes.PAST },
    { label: 'Cancelled', value: BookingTypes.CANCEL },
  ]);
  const [timeOpen, setTimeOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(true);
  const [bookingListLoading, setBookingListLoading] = useState(true);
  const [horizontalCourtList, setHorizontalCourtList] = useState<Split[]>();
  const [bookingDetails, setBookingDetails] = useState<BookingData[]>();
  const [bookingApiBody, dispatchApiBody] = useReducer(bookingReducer, initialState);

  useEffect(() => {
    async function prepare() {
      await postData('turfs/manager_list', {}, true, false, onResponseManagerList);
      // await postData('bookings/my_bookings', bookingApiBody, true, false, onResponseBookingData);
      setLoading(false);
    }
    prepare();
  }, []);

  useEffect(() => {
    async function prepareBookingList() {
      await postData('bookings/my_bookings', bookingApiBody, true, false, onResponseBookingData);
      setBookingListLoading(false);
    }
    prepareBookingList();
  }, [bookingApiBody]);

  const handleItemPress = (itemId) => {
    setSelectedItemId(itemId);
  };

  const onResponseManagerList = (response: AxiosResponse<ManagerDataResponse, any>) => {
    const data: Split[] = groundSpliting(
      response.data.turfs[0].slot_details,
      response.data.turfs[0].sports,
    );
    setHorizontalCourtList(data);
  };

  const onResponseBookingData = (response: AxiosResponse<BookingDataApiResponse, any>) => {
    const newBookingData = response.data.booking.data;
    const allBookingData = bookingDetails ? [...bookingDetails, ...newBookingData] : newBookingData;
    setBookingDetails(allBookingData);
    setBookingListLoading(false);
  };

  const renderItem = ({ item }: { item: Split }) => {
    const isSelected = selectedItemId === item.slot.slot_id;

    return (
      <TouchableOpacity
        onPress={() => handleItemPress('')}
        style={[styles.item, isSelected && styles.selectedItem]}>
        <Text style={styles.itemName}>{item.slot.slot_title}</Text>
      </TouchableOpacity>
    );
  };

  const renderBookingItem = ({ item }: { item: BookingData }) => {
    return (
      <Card
        name={item.slots.user_data.name}
        phoneNumber={item.slots.user_data.phone}
        date={item.date}
        text={item.slots.item_name}
        UTCStartTime={item.start_time}
        UTCEndTime={item.end_time}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {!loading ? (
        <>
          <CustomHeader location="Gadisar Lake" username="PLAY - WELL - NEW" />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <DropDownPicker
                style={{ width: '100%' }}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onChangeValue={(value: number) => {
                  dispatchApiBody({ type: 'SET_TYPE', payload: value });
                  setBookingListLoading(true);
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: 'green',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setTimeOpen(true)}>
              <Text>Crashing</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '100%' }}>
            <FlatList
              data={horizontalCourtList}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />
          </View>
          <View style={{ flex: 1 }}>
            {bookingListLoading ? (
              <ActivityIndicator size={30} color={secondaryColor} />
            ) : (
              <FlatList
                data={bookingDetails}
                showsVerticalScrollIndicator={false}
                renderItem={renderBookingItem}
                keyExtractor={(item) => item.booking_id}
                onEndReached={() => dispatchApiBody({ type: 'INCREMENT_PAGE', payload: null })}
                onEndReachedThreshold={0.5}
              />
            )}
          </View>
          <DatePicker
            modal
            open={timeOpen}
            date={date}
            onConfirm={(date) => {
              setTimeOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setTimeOpen(false);
            }}
          />
        </>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </SafeAreaView>
  );
}
