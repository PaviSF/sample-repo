import { Slot, Sport } from '@utils/groundSpliting';

interface Location {
  country: string;
  iso_country_code: string;
  state: string;
  district: string;
  place: string;
  locality: string;
  type: string;
  coordinates: [number, number];
}

interface Timing {
  start_time: string;
  end_time: string;
}

interface Amenity {
  title: string;
  description: string | null;
  icon: string;
}

interface CourtDimension {
  court_name: string;
  dimension: string;
}

interface Turf {
  _id: string;
  turf_name: string;
  member_status: number;
  turf_phone: string;
  description: string;
  location: Location;
  timing: Timing[];
  images: string[];
  sports: Sport[];
  slot_details: Slot[];
  amenities: Amenity[];
  verify_status: number;
  avg_rating: number;
  tags: string[];
  updated_at: string;
  created_at: string;
  turf_manager: string;
  member_since: string;
  advance_payment: number;
  allow_half_hour: number;
  limit_round: number;
  payment_percentage: number;
  maximum_booking_days: number;
  turf_secondary_phone: string | null;
  pay_at_venue: number;
  turf_currency: string;
  disable_call_option: number;
  display_notes: string | null;
  mail_notification: number;
  maximum_booking_hours: number;
  time_offset: string;
  time_offset_in_minute: number;
  turf_label: any[];
  turf_currency_symbol: string;
  time_zone: string;
  turf_notes: string;
  web_site_link: string | null;
  turf_logo: string;
  visibility: number;
  only_advance_payment: number;
  starting_at_half_hr: number;
  from_thirtieth_minute: number;
  test_turf: number;
  turf_premium: number;
  turf_premium_expiry_date: string | null;
  generate_invoice: number;
  invoice_prefix: string;
  apply_tax: number;
  tax_details: any[];
  turf_premium_end_date: string;
  turf_premium_start_date: string;
  sportshood_venue: number;
  turf_premium_distance: number;
  has_stories: number;
  turf_reference_name: string;
  lowest_price: number;
  court_dimensions: CourtDimension[];
  crone_test: number;
  sett_category_ids: string[];
  allow_broadcast: number;
  allow_sms: number;
  allow_whatsapp_share: number;
  accounts_email: string[];
  online_paid_booking_enabled_at: {
    $date: {
      $numberLong: string;
    };
  };
  online_booking_enabled_at: {
    $date: {
      $numberLong: string;
    };
  };
  story_expires_at: string;
  venue_gst_number: string;
  settlement_category_type: number;
  new_venue_id: string;
}

export default interface ManagerDataResponse {
  status: number;
  message: string;
  turfs: Turf[];
  have_membership_court: number;
  comments_count: number;
  like_count: number;
  dislike_count: number;
}
