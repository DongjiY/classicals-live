export interface Ticket {
  ticketTitle: string;
  ticketTop: {
    seatingInfo: Object;
    dateAndTimeInfo: number;
  };
  ticketBottom: {
    data: Object;
  };
  _id: string;
  ticketOwner: string;
  isValid: boolean;
  __v: number;
}
