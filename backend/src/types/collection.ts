// These interface are for writing and reading from collections. Use these interfaces if you interacting with a Collection

export interface CollectionInteractionRead {
  collection: string;
  key: string;
}

export interface CollectionInteractionWrite extends CollectionInteractionRead {
  value: { [key: string]: string };
}
