// These interface are for writing and reading from collections. Use these interfaces if you interacting with a Collection
export interface CollectionInteractionWrite {
  collection: string;
  key: string;
  value: { [key: string]: string };
}

export interface CollectionInteractionRead {
  collection: string;
  key: string;
}
