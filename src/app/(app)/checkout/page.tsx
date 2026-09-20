import type { Metadata } from "next";
import CheckoutPage from "@/components/hotel-room/checkout-page";

export const metadata: Metadata = {
  title: "Checkout | Velora Hotels",
  description:
    "Complete your reservation securely with Velora Hotels.",
};

type Props = {
  searchParams: Promise<{
    room?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <CheckoutPage
      roomId={params.room ?? ""}
      checkIn={params.checkIn ?? ""}
      checkOut={params.checkOut ?? ""}
      guests={Number(params.guests ?? 1)}
    />
  );
}