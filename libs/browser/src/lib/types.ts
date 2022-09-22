/**
 * Borrowing the compact measurement protocol from universal analytics.
 * @see https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters
 */
export type BrowserEvent = {
  en: string; //      Event Name
  dt?: string; //     Document Title
  dl?: string; //     Document Location
  sr?: string; //     Screen Resolution
  vp?: string; //     Viewport size
  sd?: string; //     Screen Colors
  ul?: string; //     User Language
  uid?: string; //    User Id
  dr?: string; //     Document Referrer
  c?: string; //
  i?: EventItem[]; // Event Items
  props?: object; //  Event Properties
};

export type EventItem = {
  id: string;
  quantity?: string;
  price?: number;
};

export type TrackingOptions = {
  endpoint: string;
  userId?: string;
  headers?: HeadersInit;
};
