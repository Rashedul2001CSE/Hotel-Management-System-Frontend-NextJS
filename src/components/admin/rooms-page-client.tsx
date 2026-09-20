"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaBed,
  FaBroom,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaCircleExclamation,
  FaClock,
  FaDoorClosed,
  FaEllipsisVertical,
  FaEye,
  FaFilter,
  FaGear,
  FaMagnifyingGlass,
  FaPen,
  FaPlus,
  FaRotate,
  FaTrash,
  FaUsers,
  FaXmark,
} from "react-icons/fa6";

import {
  createRoom,
  deleteRoom,
  getRooms,
  updateRoom,
  updateRoomStatus,
} from "@/lib/mock/room-api";

import type {
  BedType,
  CreateRoomInput,
  Room,
  RoomStatus,
  RoomType,
} from "@/types/room";

const PAGE_SIZE = 7;

const roomTypes: Array<RoomType | "All"> = [
  "All",
  "Standard",
  "Deluxe",
  "Suite",
  "Executive",
  "Family",
];

const statuses: Array<RoomStatus | "All"> = [
  "All",
  "Available",
  "Occupied",
  "Cleaning",
  "Maintenance",
  "Blocked",
];

const bedTypes: BedType[] = ["Single", "Twin", "Double", "Queen", "King"];

const emptyForm: CreateRoomInput = {
  roomNumber: "",
  name: "",
  type: "Standard",
  floor: 1,
  status: "Available",
  pricePerNight: 100,
  capacity: 2,
  beds: 1,
  bedType: "Queen",
  size: 30,
  description: "",
  amenities: [],
  images: [],
};

const availableAmenities = [
  "Free Wi-Fi",
  "Air Conditioning",
  "Smart TV",
  "Mini Bar",
  "Coffee Machine",
  "Room Service",
  "City View",
  "Panoramic View",
  "Work Desk",
  "Living Area",
  "Dining Area",
  "Bathtub",
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function statusClasses(status: RoomStatus) {
  switch (status) {
    case "Available":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";

    case "Occupied":
      return "bg-blue-50 text-blue-700 border-blue-200";

    case "Cleaning":
      return "bg-amber-50 text-amber-700 border-amber-200";

    case "Maintenance":
      return "bg-orange-50 text-orange-700 border-orange-200";

    case "Blocked":
      return "bg-red-50 text-red-700 border-red-200";

    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

function statusIcon(status: RoomStatus) {
  switch (status) {
    case "Available":
      return <FaCheck />;

    case "Occupied":
      return <FaUsers />;

    case "Cleaning":
      return <FaBroom />;

    case "Maintenance":
      return <FaGear />;

    case "Blocked":
      return <FaCircleExclamation />;

    default:
      return null;
  }
}

export default function RoomsPageClient() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<RoomStatus | "All">("All");
  const [type, setType] = useState<RoomType | "All">("All");

  const [page, setPage] = useState(1);

  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState<string | null>(null);

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  const [form, setForm] = useState<CreateRoomInput>(emptyForm);

  const [formError, setFormError] = useState("");

  const loadRooms = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getRooms({
        search,
        status,
        type,
      });

      setRooms(data);
    } catch {
      // Mock API should not normally fail here.
    } finally {
      setLoading(false);
    }
  }, [search, status, type]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadRooms();
    }, 250);

    return () => clearTimeout(timer);
  }, [loadRooms]);

  useEffect(() => {
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [search, status, type]);

  const statistics = useMemo(() => {
    return {
      total: rooms.length,
      available: rooms.filter((room) => room.status === "Available").length,
      occupied: rooms.filter((room) => room.status === "Occupied").length,
      cleaning: rooms.filter((room) => room.status === "Cleaning").length,
      maintenance: rooms.filter((room) => room.status === "Maintenance").length,
      blocked: rooms.filter((room) => room.status === "Blocked").length,
    };
  }, [rooms]);

  const totalPages = Math.max(1, Math.ceil(rooms.length / PAGE_SIZE));

  const paginatedRooms = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;

    return rooms.slice(start, start + PAGE_SIZE);
  }, [rooms, page]);

  function openCreateForm() {
    setEditingRoom(null);
    setForm(emptyForm);
    setFormError("");
    setShowForm(true);
  }

  function openEditForm(room: Room) {
    setEditingRoom(room);

    setForm({
      roomNumber: room.roomNumber,
      name: room.name,
      type: room.type,
      floor: room.floor,
      status: room.status,
      pricePerNight: room.pricePerNight,
      capacity: room.capacity,
      beds: room.beds,
      bedType: room.bedType,
      size: room.size,
      description: room.description,
      amenities: [...room.amenities],
      images: [...room.images],
    });

    setFormError("");
    setShowForm(true);
  }

  function openDetails(room: Room) {
    setSelectedRoom(room);
    setShowDetails(true);
  }

  function openDelete(room: Room) {
    setSelectedRoom(room);
    setShowDelete(true);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!form.roomNumber.trim()) {
      setFormError("Room number is required.");
      return;
    }

    if (!form.name.trim()) {
      setFormError("Room name is required.");
      return;
    }

    if (form.pricePerNight <= 0) {
      setFormError("Price must be greater than zero.");
      return;
    }

    if (form.capacity <= 0) {
      setFormError("Capacity must be greater than zero.");
      return;
    }

    try {
      setActionLoading(true);
      setFormError("");

      if (editingRoom) {
        await updateRoom(editingRoom.id, form);
      } else {
        await createRoom(form);
      }

      setShowForm(false);
      await loadRooms();
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setActionLoading(false);
    }
  }

  async function handleDelete() {
    if (!selectedRoom) return;

    try {
      setActionLoading(true);

      await deleteRoom(selectedRoom.id);

      setShowDelete(false);
      setSelectedRoom(null);

      await loadRooms();
    } catch {
      // In a real API, show toast/error state.
    } finally {
      setActionLoading(false);
    }
  }

  async function handleStatusChange(room: Room, newStatus: RoomStatus) {
    try {
      setActionLoading(true);
      setShowStatusMenu(null);

      const updated = await updateRoomStatus(room.id, newStatus);

      setRooms((current) =>
        current.map((item) => (item.id === updated.id ? updated : item)),
      );
    } catch {
      // In a real API, show toast/error state.
    } finally {
      setActionLoading(false);
    }
  }

  function toggleAmenity(amenity: string) {
    setForm((current) => {
      const exists = current.amenities.includes(amenity);

      return {
        ...current,
        amenities: exists
          ? current.amenities.filter((item) => item !== amenity)
          : [...current.amenities, amenity],
      };
    });
  }

  function updateField<K extends keyof CreateRoomInput>(
    key: K,
    value: CreateRoomInput[K],
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
              <span>Admin</span>
              <span>/</span>
              <span className="text-foreground">Rooms</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Rooms
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage rooms, availability, pricing and housekeeping status.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={loadRooms}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-medium text-foreground transition hover:bg-accent"
            >
              <FaRotate className={loading ? "animate-spin" : ""} />
              Refresh
            </button>

            <button
              type="button"
              onClick={openCreateForm}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              <FaPlus />
              Add Room
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          <StatCard
            title="Total Rooms"
            value={statistics.total}
            icon={<FaDoorClosed />}
          />

          <StatCard
            title="Available"
            value={statistics.available}
            icon={<FaCheck />}
            iconClass="text-emerald-600"
          />

          <StatCard
            title="Occupied"
            value={statistics.occupied}
            icon={<FaUsers />}
            iconClass="text-blue-600"
          />

          <StatCard
            title="Cleaning"
            value={statistics.cleaning}
            icon={<FaBroom />}
            iconClass="text-amber-600"
          />

          <StatCard
            title="Maintenance"
            value={statistics.maintenance}
            icon={<FaGear />}
            iconClass="text-orange-600"
          />

          <StatCard
            title="Blocked"
            value={statistics.blocked}
            icon={<FaCircleExclamation />}
            iconClass="text-red-600"
          />
        </div>

        {/* Filters */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
            <div className="relative min-w-0 flex-1">
              <FaMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground" />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search room number, room name or type..."
                className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <FaFilter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground" />

                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value as RoomStatus | "All")
                  }
                  className="h-11 w-full min-w-[180px] appearance-none rounded-xl border border-input bg-background pl-9 pr-8 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  {statuses.map((item) => (
                    <option key={item} value={item}>
                      {item === "All" ? "All statuses" : item}
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={type}
                onChange={(event) =>
                  setType(event.target.value as RoomType | "All")
                }
                className="h-11 min-w-[170px] rounded-xl border border-input bg-background px-4 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {roomTypes.map((item) => (
                  <option key={item} value={item}>
                    {item === "All" ? "All room types" : item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Room table */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-4 py-4 md:px-6">
            <div>
              <h2 className="font-semibold text-foreground">Room Inventory</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                {rooms.length} room
                {rooms.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
              <FaBed />
              Live room inventory
            </div>
          </div>

          {loading ? (
            <LoadingState />
          ) : paginatedRooms.length === 0 ? (
            <EmptyState
              search={search}
              onClear={() => {
                setSearch("");
                setStatus("All");
                setType("All");
              }}
              onAdd={openCreateForm}
            />
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[1050px]">
                  <thead>
                    <tr className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                      <th className="px-6 py-4 font-semibold">Room</th>
                      <th className="px-6 py-4 font-semibold">Type</th>
                      <th className="px-6 py-4 font-semibold">Floor</th>
                      <th className="px-6 py-4 font-semibold">Capacity</th>
                      <th className="px-6 py-4 font-semibold">Price</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 text-right font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-border">
                    {paginatedRooms.map((room) => (
                      <RoomRow
                        key={room.id}
                        room={room}
                        statusMenuOpen={showStatusMenu === room.id}
                        actionLoading={actionLoading}
                        onView={() => openDetails(room)}
                        onEdit={() => openEditForm(room)}
                        onDelete={() => openDelete(room)}
                        onToggleStatusMenu={() =>
                          setShowStatusMenu(
                            showStatusMenu === room.id ? null : room.id,
                          )
                        }
                        onStatusChange={(newStatus) =>
                          handleStatusChange(room, newStatus)
                        }
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="divide-y divide-border lg:hidden">
                {paginatedRooms.map((room) => (
                  <MobileRoomCard
                    key={room.id}
                    room={room}
                    onView={() => openDetails(room)}
                    onEdit={() => openEditForm(room)}
                    onDelete={() => openDelete(room)}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex flex-col gap-3 border-t border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6">
                <p className="text-xs text-muted-foreground">
                  Showing{" "}
                  <span className="font-medium text-foreground">
                    {rooms.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium text-foreground">
                    {Math.min(page * PAGE_SIZE, rooms.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-foreground">
                    {rooms.length}
                  </span>
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() =>
                      setPage((current) => Math.max(1, current - 1))
                    }
                    className="inline-flex h-9 items-center gap-2 rounded-lg border border-border px-3 text-sm text-foreground transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FaChevronLeft />
                    Previous
                  </button>

                  <span className="hidden text-sm text-muted-foreground sm:inline">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    type="button"
                    disabled={page >= totalPages}
                    onClick={() =>
                      setPage((current) => Math.min(totalPages, current + 1))
                    }
                    className="inline-flex h-9 items-center gap-2 rounded-lg border border-border px-3 text-sm text-foreground transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Form modal */}
        {showForm && (
          <RoomFormModal
            editingRoom={editingRoom}
            form={form}
            error={formError}
            loading={actionLoading}
            onChange={updateField}
            onToggleAmenity={toggleAmenity}
            onSubmit={handleSubmit}
            onClose={() => setShowForm(false)}
          />
        )}

        {/* Details modal */}
        {showDetails && selectedRoom && (
          <RoomDetailsModal
            room={selectedRoom}
            onClose={() => {
              setShowDetails(false);
              setSelectedRoom(null);
            }}
            onEdit={() => {
              setShowDetails(false);
              openEditForm(selectedRoom);
            }}
          />
        )}

        {/* Delete modal */}
        {showDelete && selectedRoom && (
          <DeleteModal
            room={selectedRoom}
            loading={actionLoading}
            onClose={() => {
              setShowDelete(false);
              setSelectedRoom(null);
            }}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Statistics                                                                 */
/* -------------------------------------------------------------------------- */

function StatCard({
  title,
  value,
  icon,
  iconClass = "text-primary",
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconClass?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-muted-foreground">{title}</p>

        <span
          className={`flex h-8 w-8 items-center justify-center rounded-lg bg-muted ${iconClass}`}
        >
          {icon}
        </span>
      </div>

      <p className="mt-3 text-2xl font-bold tracking-tight text-foreground">
        {value}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Desktop row                                                                */
/* -------------------------------------------------------------------------- */

function RoomRow({
  room,
  statusMenuOpen,
  actionLoading,
  onView,
  onEdit,
  onDelete,
  onToggleStatusMenu,
  onStatusChange,
}: {
  room: Room;
  statusMenuOpen: boolean;
  actionLoading: boolean;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatusMenu: () => void;
  onStatusChange: (status: RoomStatus) => void;
}) {
  return (
    <tr className="group transition hover:bg-muted/30">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted">
            {room.images[0] ? (
              <img
                src={room.images[0]}
                alt={room.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <FaBed className="text-muted-foreground" />
            )}
          </div>

          <div className="min-w-0">
            <button
              type="button"
              onClick={onView}
              className="truncate text-left text-sm font-semibold text-foreground hover:text-primary"
            >
              Room {room.roomNumber}
            </button>

            <p className="max-w-[230px] truncate text-xs text-muted-foreground">
              {room.name}
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <span className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
          {room.type}
        </span>
      </td>

      <td className="px-6 py-4 text-sm text-muted-foreground">
        Floor {room.floor}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-foreground">
          <FaUsers className="text-xs text-muted-foreground" />
          {room.capacity} guests
        </div>

        <p className="mt-1 text-xs text-muted-foreground">
          {room.beds} × {room.bedType}
        </p>
      </td>

      <td className="px-6 py-4">
        <p className="text-sm font-semibold text-foreground">
          {formatCurrency(room.pricePerNight)}
        </p>

        <p className="text-xs text-muted-foreground">per night</p>
      </td>

      <td className="px-6 py-4">
        <div className="relative">
          <button
            type="button"
            disabled={actionLoading}
            onClick={onToggleStatusMenu}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${statusClasses(
              room.status,
            )}`}
          >
            {statusIcon(room.status)}
            {room.status}
          </button>

          {statusMenuOpen && (
            <div className="absolute left-0 top-full z-30 mt-2 w-44 rounded-xl border border-border bg-card p-1.5 shadow-xl">
              {statuses
                .filter((item): item is RoomStatus => item !== "All")
                .map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => onStatusChange(item)}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs transition hover:bg-accent ${
                      item === room.status ? "font-semibold" : ""
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        item === "Available"
                          ? "bg-emerald-500"
                          : item === "Occupied"
                            ? "bg-blue-500"
                            : item === "Cleaning"
                              ? "bg-amber-500"
                              : item === "Maintenance"
                                ? "bg-orange-500"
                                : "bg-red-500"
                      }`}
                    />

                    {item}
                  </button>
                ))}
            </div>
          )}
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex justify-end gap-1">
          <ActionButton label="View" onClick={onView}>
            <FaEye />
          </ActionButton>

          <ActionButton label="Edit" onClick={onEdit}>
            <FaPen />
          </ActionButton>

          <ActionButton label="Delete" danger onClick={onDelete}>
            <FaTrash />
          </ActionButton>

          <button
            type="button"
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-accent hover:text-foreground"
            aria-label="More actions"
          >
            <FaEllipsisVertical />
          </button>
        </div>
      </td>
    </tr>
  );
}

function ActionButton({
  children,
  label,
  onClick,
  danger = false,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm transition ${
        danger
          ? "text-red-500 hover:bg-red-50"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Mobile card                                                                */
/* -------------------------------------------------------------------------- */

function MobileRoomCard({
  room,
  onView,
  onEdit,
  onDelete,
}: {
  room: Room;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="p-4">
      <div className="flex gap-3">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
          {room.images[0] ? (
            <img
              src={room.images[0]}
              alt={room.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <FaBed className="text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <button
                type="button"
                onClick={onView}
                className="text-left text-sm font-semibold text-foreground"
              >
                Room {room.roomNumber}
              </button>

              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                {room.name}
              </p>
            </div>

            <span
              className={`shrink-0 rounded-full border px-2 py-1 text-[10px] font-semibold ${statusClasses(
                room.status,
              )}`}
            >
              {room.status}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span>{room.type}</span>
            <span>Floor {room.floor}</span>
            <span>{room.capacity} guests</span>
            <span>{formatCurrency(room.pricePerNight)}/night</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={onView}
          className="flex h-9 flex-1 items-center justify-center gap-2 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-accent"
        >
          <FaEye />
          View
        </button>

        <button
          type="button"
          onClick={onEdit}
          className="flex h-9 flex-1 items-center justify-center gap-2 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-accent"
        >
          <FaPen />
          Edit
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="flex h-9 w-10 items-center justify-center rounded-lg border border-red-200 text-red-500 hover:bg-red-50"
          aria-label="Delete room"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Room form                                                                  */
/* -------------------------------------------------------------------------- */

function RoomFormModal({
  editingRoom,
  form,
  error,
  loading,
  onChange,
  onToggleAmenity,
  onSubmit,
  onClose,
}: {
  editingRoom: Room | null;
  form: CreateRoomInput;
  error: string;
  loading: boolean;
  onChange: <K extends keyof CreateRoomInput>(
    key: K,
    value: CreateRoomInput[K],
  ) => void;
  onToggleAmenity: (amenity: string) => void;
  onSubmit: (event: React.FormEvent) => void;
  onClose: () => void;
}) {
  return (
    <ModalOverlay onClose={onClose}>
      <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4 md:px-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              {editingRoom ? "Edit Room" : "Add New Room"}
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              {editingRoom
                ? `Update room ${editingRoom.roomNumber}`
                : "Create a new room in your inventory."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <FaXmark />
          </button>
        </div>

        <form onSubmit={onSubmit} className="overflow-y-auto p-5 md:p-6">
          {error && (
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <FaCircleExclamation className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-6">
            {/* Basic information */}
            <section>
              <SectionHeading
                title="Basic Information"
                description="General information about the room."
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField label="Room Number" required>
                  <input
                    value={form.roomNumber}
                    onChange={(event) =>
                      onChange("roomNumber", event.target.value)
                    }
                    placeholder="e.g. 503"
                    className="input"
                  />
                </FormField>

                <FormField label="Room Name" required>
                  <input
                    value={form.name}
                    onChange={(event) => onChange("name", event.target.value)}
                    placeholder="e.g. Deluxe City View"
                    className="input"
                  />
                </FormField>

                <FormField label="Room Type">
                  <select
                    value={form.type}
                    onChange={(event) =>
                      onChange("type", event.target.value as RoomType)
                    }
                    className="input"
                  >
                    {roomTypes
                      .filter((item): item is RoomType => item !== "All")
                      .map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                  </select>
                </FormField>

                <FormField label="Floor">
                  <input
                    type="number"
                    min={0}
                    value={form.floor}
                    onChange={(event) =>
                      onChange("floor", Number(event.target.value))
                    }
                    className="input"
                  />
                </FormField>

                <FormField label="Status">
                  <select
                    value={form.status}
                    onChange={(event) =>
                      onChange("status", event.target.value as RoomStatus)
                    }
                    className="input"
                  >
                    {statuses
                      .filter((item): item is RoomStatus => item !== "All")
                      .map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                  </select>
                </FormField>

                <FormField label="Room Size">
                  <div className="relative">
                    <input
                      type="number"
                      min={1}
                      value={form.size}
                      onChange={(event) =>
                        onChange("size", Number(event.target.value))
                      }
                      className="input pr-14"
                    />

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                      m²
                    </span>
                  </div>
                </FormField>
              </div>
            </section>

            {/* Pricing and occupancy */}
            <section>
              <SectionHeading
                title="Pricing & Occupancy"
                description="Set the nightly price and room capacity."
              />

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <FormField label="Price / Night">
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                      $
                    </span>

                    <input
                      type="number"
                      min={1}
                      value={form.pricePerNight}
                      onChange={(event) =>
                        onChange("pricePerNight", Number(event.target.value))
                      }
                      className="input pl-7"
                    />
                  </div>
                </FormField>

                <FormField label="Guest Capacity">
                  <input
                    type="number"
                    min={1}
                    value={form.capacity}
                    onChange={(event) =>
                      onChange("capacity", Number(event.target.value))
                    }
                    className="input"
                  />
                </FormField>

                <FormField label="Number of Beds">
                  <input
                    type="number"
                    min={1}
                    value={form.beds}
                    onChange={(event) =>
                      onChange("beds", Number(event.target.value))
                    }
                    className="input"
                  />
                </FormField>

                <FormField label="Bed Type">
                  <select
                    value={form.bedType}
                    onChange={(event) =>
                      onChange("bedType", event.target.value as BedType)
                    }
                    className="input"
                  >
                    {bedTypes.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>
            </section>

            {/* Description */}
            <section>
              <SectionHeading
                title="Description"
                description="Describe the room for guests and staff."
              />

              <textarea
                value={form.description}
                onChange={(event) =>
                  onChange("description", event.target.value)
                }
                rows={4}
                placeholder="Enter room description..."
                className="input resize-none"
              />
            </section>

            {/* Amenities */}
            <section>
              <SectionHeading
                title="Amenities"
                description="Select amenities available in this room."
              />

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {availableAmenities.map((amenity) => {
                  const selected = form.amenities.includes(amenity);

                  return (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => onToggleAmenity(amenity)}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-xs transition ${
                        selected
                          ? "border-primary bg-primary/10 font-medium text-primary"
                          : "border-border bg-background text-muted-foreground hover:bg-accent"
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                          selected
                            ? "border-primary bg-primary text-white"
                            : "border-border"
                        }`}
                      >
                        {selected && <FaCheck className="text-[8px]" />}
                      </span>

                      {amenity}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Image */}
            <section>
              <SectionHeading
                title="Room Image"
                description="Add an image URL for the room."
              />

              <input
                value={form.images[0] ?? ""}
                onChange={(event) =>
                  onChange(
                    "images",
                    event.target.value ? [event.target.value] : [],
                  )
                }
                placeholder="https://..."
                className="input"
              />
            </section>
          </div>

          <div className="mt-8 flex flex-col-reverse gap-2 border-t border-border pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-xl border border-border px-5 text-sm font-medium text-foreground hover:bg-accent"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              )}

              {editingRoom ? "Save Changes" : "Create Room"}
            </button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
}

/* -------------------------------------------------------------------------- */
/* Details modal                                                              */
/* -------------------------------------------------------------------------- */

function RoomDetailsModal({
  room,
  onClose,
  onEdit,
}: {
  room: Room;
  onClose: () => void;
  onEdit: () => void;
}) {
  return (
    <ModalOverlay onClose={onClose}>
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl">
        <div className="relative h-56 overflow-hidden bg-muted sm:h-72">
          {room.images[0] ? (
            <img
              src={room.images[0]}
              alt={room.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <FaBed className="text-5xl text-muted-foreground" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur transition hover:bg-black/50"
          >
            <FaXmark />
          </button>

          <div className="absolute bottom-5 left-5 right-5 text-white">
            <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
              Room {room.roomNumber}
            </span>

            <h2 className="mt-2 text-2xl font-bold">{room.name}</h2>

            <p className="mt-1 text-sm text-white/80">
              {room.type} · Floor {room.floor}
            </p>
          </div>
        </div>

        <div className="p-5 md:p-6">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <InfoBox label="Status" value={room.status} />

            <InfoBox
              label="Price"
              value={`${formatCurrency(room.pricePerNight)}/night`}
            />

            <InfoBox label="Capacity" value={`${room.capacity} guests`} />

            <InfoBox label="Size" value={`${room.size} m²`} />
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-foreground">
              Description
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {room.description ||
                "No description has been added for this room."}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-foreground">
              Bed Configuration
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              {room.beds} × {room.bedType} bed
              {room.beds !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-foreground">Amenities</h3>

            <div className="mt-3 flex flex-wrap gap-2">
              {room.amenities.length > 0 ? (
                room.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-full bg-muted px-3 py-1.5 text-xs text-foreground"
                  >
                    {amenity}
                  </span>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No amenities added.
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 grid gap-3 border-t border-border pt-5 text-xs text-muted-foreground sm:grid-cols-2">
            <p>
              Created:{" "}
              <span className="font-medium text-foreground">
                {formatDate(room.createdAt)}
              </span>
            </p>

            <p className="sm:text-right">
              Updated:{" "}
              <span className="font-medium text-foreground">
                {formatDate(room.updatedAt)}
              </span>
            </p>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-xl border border-border px-5 text-sm font-medium text-foreground hover:bg-accent"
            >
              Close
            </button>

            <button
              type="button"
              onClick={onEdit}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              <FaPen />
              Edit Room
            </button>
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
}

/* -------------------------------------------------------------------------- */
/* Delete modal                                                               */
/* -------------------------------------------------------------------------- */

function DeleteModal({
  room,
  loading,
  onClose,
  onDelete,
}: {
  room: Room;
  loading: boolean;
  onClose: () => void;
  onDelete: () => void;
}) {
  return (
    <ModalOverlay onClose={onClose}>
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
          <FaTrash />
        </div>

        <h2 className="mt-5 text-lg font-bold text-foreground">Delete Room?</h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          You are about to delete{" "}
          <span className="font-semibold text-foreground">
            Room {room.roomNumber}
          </span>
          . This action cannot be undone.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-xl border border-border px-5 text-sm font-medium text-foreground hover:bg-accent"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={onDelete}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
          >
            {loading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            Delete Room
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}

/* -------------------------------------------------------------------------- */
/* Shared modal                                                               */
/* -------------------------------------------------------------------------- */

function ModalOverlay({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm md:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Small components                                                           */
/* -------------------------------------------------------------------------- */

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>

      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </span>

      {children}
    </label>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-muted/40 p-3">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-3 p-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-16 animate-pulse rounded-xl bg-muted" />
      ))}
    </div>
  );
}

function EmptyState({
  search,
  onClear,
  onAdd,
}: {
  search: string;
  onClear: () => void;
  onAdd: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
        <FaBed />
      </div>

      <h3 className="mt-4 font-semibold text-foreground">No rooms found</h3>

      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {search
          ? "Try changing your search or filters."
          : "Your hotel does not have any rooms yet."}
      </p>

      <div className="mt-5 flex gap-2">
        {search && (
          <button
            type="button"
            onClick={onClear}
            className="h-9 rounded-lg border border-border px-4 text-xs font-medium hover:bg-accent"
          >
            Clear filters
          </button>
        )}

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground hover:opacity-90"
        >
          <FaPlus />
          Add Room
        </button>
      </div>
    </div>
  );
}
