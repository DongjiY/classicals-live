import { Ticket } from "@/types/Ticket";

export const dummy_ticket: Array<Ticket> = [
  {
    _id: "656d199b9538a6469dd68912",
    ticketTitle: "TEST TICKET",
    ticketTop: {
      seatingInfo: {
        aisle: 3,
        row: 2,
        seat: 11,
      },
      dateAndTimeInfo: 1701648778,
    },
    ticketBottom: { data: { attendee: "Dongji Yang" } },
    ticketOwner: "6559412ffd1af853ddd5d522",
    isValid: true,
    __v: 0,
  },
];
