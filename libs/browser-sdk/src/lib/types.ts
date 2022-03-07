export type BrowserEvent = {
  event: string; //      Event Name
  dt?: string; //     Document Title
  dl?: string; //     Document Location
  sr?: string; //     Screen Resolution
  va?: string; //     Visual Area
  c?: string; //
  i?: EventItem[]; // Items
  props?: object; //      Properties
};

export type EventItem = {
  id: string;
  quantity?: string;
  price?: number;
};

export type TrackingOptions = {
  endpoint: string;
  headers?: HeadersInit;
};
