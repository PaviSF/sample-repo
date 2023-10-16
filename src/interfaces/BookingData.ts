export interface BookingData {
  turf_data: TurfData[];
  booking_id: string;
  booking_order_id: string;
  date: string;
  slots: Slot;
  offer_details?: OfferDetails;
  start_time: number;
  end_time: number;
  users_id: string;
  type_of_booking: number;
  turf_id: string;
  created_at: string;
  cancelled_by?: CancelledBy;
  cancelled_at?: string;
  refund_status: number;
  settlement_id: string;
  is_eligible_for_review: number;
  amount_paid: number;
  online_paid: number;
  offline_paid: number;
  pending_payment: number;
  staff_details?: StaffDetails | null;
  has_app: number;
  users_count: number;
  type: number;
  pkg_offer_details?: PkgOfferDetails;
  booking_remark?: string;
  payment_status?: number;
  advance_pay_status?: number;
}

interface PkgOfferDetails {
  pkg_offer_id: { $oid: string };
  playspots_offer: number;
  pkg_offer_actual_value: number;
  pkg_offer_value: number;
  pkg_offer_code: string;
}

interface TurfData {
  turf_phone: string;
  coordinates: number[];
  turf_currency: string;
  time_offset: string;
  time_offset_in_minute: number;
  turf_currency_symbol: string;
  generate_invoice: number;
}

interface Slot {
  slot_id: {
    $oid: string;
  };
  sport_id: {
    $oid: string;
  };
  start_time: number;
  end_time: number;
  actual_price: number;
  price: number;
  booking_method: number;
  booking_status: number;
  payment_status: number;
  payment_mode: number;
  advance_pay_status: number;
  slot_name: string;
  slot_title: string;
  item_name: string;
  item_icon: string;
  user_data: UserData;
}

interface UserData {
  user_id: {
    $oid: string;
  };
  phone: string;
  email: string | null;
  name: string;
  image: string;
  bio: string;
  country_code: string;
}

interface OfferDetails {
  offer_title: string;
  offer_value: number;
}

interface CancelledBy {
  _id: string;
  name: string;
  phone: string;
}

interface StaffDetails {
  _id: string;
  name: string;
  phone: string;
}

export default interface BookingDataApiResponse {
  status: number;
  message: string;
  booking: {
    current_page: number;
    data: BookingData[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}
