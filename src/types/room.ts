export type RoomStatus =
  | "Available"
  | "Occupied"
  | "Cleaning"
  | "Maintenance"
  | "Blocked";

export type RoomType = "Standard" | "Deluxe" | "Suite" | "Executive" | "Family";

export type BedType = "Single" | "Twin" | "Double" | "Queen" | "King";

export interface Room {
  id: string;
  roomNumber: string;
  name: string;
  type: RoomType;
  floor: number;
  status: RoomStatus;

  pricePerNight: number;
  capacity: number;
  beds: number;
  bedType: BedType;

  size: number;
  description: string;

  amenities: string[];
  images: string[];

  createdAt: string;
  updatedAt: string;
}

export interface CreateRoomInput {
  roomNumber: string;
  name: string;
  type: RoomType;
  floor: number;
  status: RoomStatus;

  pricePerNight: number;
  capacity: number;
  beds: number;
  bedType: BedType;

  size: number;
  description: string;

  amenities: string[];
  images: string[];
}

export type UpdateRoomInput = Partial<CreateRoomInput>;

export interface RoomFilters {
  search?: string;
  status?: RoomStatus | "All";
  type?: RoomType | "All";
}
