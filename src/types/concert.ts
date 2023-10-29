export interface Concert {
  pieceName: string;
  group: {
    groupId?: string; // if no group ID, use the group name. but if there is a group id, join with the group table in mongodb
    groupName: string; // if linked to a group, search for the group and use the name there
  };
  performanceTime: number; // unix epoch
  location: {
    latitide?: number;
    longitude?: number;
    name: string;
  };
  originalLink: string;
}
