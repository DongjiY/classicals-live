export interface Concert {
  pieces: Array<{ pieceName: string; composerName: string }>;
  searchString: string;
  group: {
    groupId?: string; // if no group ID, use the group name. but if there is a group id, join with the group table in mongodb
    groupName: string; // if linked to a group, search for the group and use the name there
  };
  performanceTime: number; // unix epoch
  additionalPerformanceTimes: Array<number>;
  location: {
    latitide?: number;
    longitude?: number;
    name: string;
  };
  originalLink: string;
}
