export interface AccountKeys {
  privateKey: string;
  viewKey: string;
  address: string;
}

export const isAccountKeys = (value: unknown): value is AccountKeys => {
  const assertedVal = value as AccountKeys;

  return (
    assertedVal.address !== undefined &&
    assertedVal.viewKey !== undefined &&
    assertedVal.privateKey !== undefined &&
    typeof assertedVal.address === "string" &&
    typeof assertedVal.viewKey === "string" &&
    typeof assertedVal.privateKey === "string"
  );
};
