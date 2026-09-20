import { mockRooms } from "@/lib/mock-admin-rooms";
import type {
  CreateRoomInput,
  Room,
  RoomFilters,
  RoomStatus,
  UpdateRoomInput,
} from "@/types/room";

const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

let rooms: Room[] = [...mockRooms];

export async function getRooms(filters: RoomFilters = {}): Promise<Room[]> {
  await delay();

  const search = filters.search?.trim().toLowerCase();

  return rooms.filter((room) => {
    const matchesSearch =
      !search ||
      room.roomNumber.toLowerCase().includes(search) ||
      room.name.toLowerCase().includes(search) ||
      room.type.toLowerCase().includes(search);

    const matchesStatus =
      !filters.status ||
      filters.status === "All" ||
      room.status === filters.status;

    const matchesType =
      !filters.type || filters.type === "All" || room.type === filters.type;

    return matchesSearch && matchesStatus && matchesType;
  });
}

export async function getRoomById(id: string): Promise<Room | null> {
  await delay();

  return rooms.find((room) => room.id === id) ?? null;
}

export async function createRoom(input: CreateRoomInput): Promise<Room> {
  await delay();

  const duplicate = rooms.some(
    (room) =>
      room.roomNumber.toLowerCase() === input.roomNumber.trim().toLowerCase(),
  );

  if (duplicate) {
    throw new Error("A room with this room number already exists.");
  }

  const now = new Date().toISOString();

  const room: Room = {
    id: `room-${Date.now()}`,
    ...input,
    roomNumber: input.roomNumber.trim(),
    name: input.name.trim(),
    description: input.description.trim(),
    createdAt: now,
    updatedAt: now,
  };

  rooms = [room, ...rooms];

  return room;
}

export async function updateRoom(
  id: string,
  input: UpdateRoomInput,
): Promise<Room> {
  await delay();

  const index = rooms.findIndex((room) => room.id === id);

  if (index === -1) {
    throw new Error("Room not found.");
  }

  if (input.roomNumber) {
    const duplicate = rooms.some(
      (room) =>
        room.id !== id &&
        room.roomNumber.toLowerCase() ===
          input.roomNumber!.trim().toLowerCase(),
    );

    if (duplicate) {
      throw new Error("A room with this room number already exists.");
    }
  }

  const updatedRoom: Room = {
    ...rooms[index],
    ...input,
    roomNumber: input.roomNumber?.trim() || rooms[index].roomNumber,
    name: input.name?.trim() || rooms[index].name,
    description: input.description?.trim() ?? rooms[index].description,
    updatedAt: new Date().toISOString(),
  };

  rooms[index] = updatedRoom;

  return updatedRoom;
}

export async function deleteRoom(id: string): Promise<void> {
  await delay();

  const exists = rooms.some((room) => room.id === id);

  if (!exists) {
    throw new Error("Room not found.");
  }

  rooms = rooms.filter((room) => room.id !== id);
}

export async function updateRoomStatus(
  id: string,
  status: RoomStatus,
): Promise<Room> {
  return updateRoom(id, { status });
}
