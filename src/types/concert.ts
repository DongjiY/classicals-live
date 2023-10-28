export interface Concert {
  pieceName: string;
  groupName?: string;
  date: string;
  time: string;
  locationName: string;
  locationCoords: [number, number];
}
