// Encode function to convert special characters to safe representations
export const encodeCollectionName = (name: string): string => {
  return name.replace(/æ/g, "$ae").replace(/ø/g, "$oe").replace(/å/g, "$aa");
};

// Decode function to convert safe representations back to special characters
export const decodeCollectionName = (name: string): string => {
  return name.replace(/\$ae/g, "æ").replace(/\$oe/g, "ø").replace(/\$aa/g, "å");
};
