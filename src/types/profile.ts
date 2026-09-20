export type BookingStatus =
  | "Confirmed"
  | "Checked In"
  | "Completed"
  | "Cancelled"
  | "Pending";

export interface GuestBooking {
  id: string;
  hotelName: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
  amount: number;
  currency: string;
}

export interface GuestActivity {
  id: string;
  title: string;
  description: string;
  date: string;
  icon?: "booking" | "review" | "profile" | "security";
}

export interface NotificationPreferences {
  bookingUpdates: boolean;
  promotionalOffers: boolean;
  reviewReminders: boolean;
  securityAlerts: boolean;
}

export interface GuestProfile {
  id: string;
  name: string;
  username?: string;
  email: string;
  emailVerified: boolean;
  phoneNumber?: string;
  phoneVerified: boolean;
  nationalId?: string;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  about?: string;
  profileImageUrl?: string;
  memberSince?: string;

  twoFactorEnabled: boolean;
  lastPasswordChange?: string;
  lastLoginAt?: string;

  preferredRoomType?: string;
  preferredBedType?: string;
  preferredFloor?: "Low" | "Middle" | "High" | "No preference";
  smokingPreference?: "Non-smoking" | "Smoking" | "No preference";
  accessibilityNeeds?: string;

  loyaltyTier?: string;
  loyaltyPoints?: number;

  notificationPreferences: NotificationPreferences;
  connectedAccounts: {
    google: boolean;
    facebook: boolean;
    apple: boolean;
  };

  bookings: GuestBooking[];
  activities: GuestActivity[];
  reviewCount: number;
  accountCount: number;
}

export interface ProfilePageProps {
  profile: GuestProfile;
  onProfileSave?: (profile: GuestProfile) => Promise<void> | void;
  onPasswordChange?: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<void> | void;
  onPasswordReset?: () => Promise<void> | void;
  onTwoFactorToggle?: (enabled: boolean) => Promise<void> | void;
  onPhotoChange?: (file: File) => Promise<void> | void;
  onNotificationPreferencesChange?: (
    preferences: NotificationPreferences,
  ) => Promise<void> | void;
}
