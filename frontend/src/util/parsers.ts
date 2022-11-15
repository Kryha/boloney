export const parseMatchData = (data: Uint8Array): unknown => JSON.parse(String.fromCharCode(...data));
