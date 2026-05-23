export interface PhoneFormat {
  dialCode: string;
  regex: RegExp;
  placeholder: string;
}

export const PHONE_FORMATS: Record<string, PhoneFormat> = {
  SA: { dialCode: "+966", regex: /^5\d{8}$/, placeholder: "5XXXXXXXX" },
  AE: { dialCode: "+971", regex: /^5\d{8}$/, placeholder: "5XXXXXXXX" },
  EG: { dialCode: "+20",  regex: /^(10|11|12|15)\d{8}$/, placeholder: "1XXXXXXXXX" },
  JO: { dialCode: "+962", regex: /^7[789]\d{7}$/, placeholder: "7XXXXXXXX" },
  KW: { dialCode: "+965", regex: /^[569]\d{7}$/, placeholder: "XXXXXXXX" },
  QA: { dialCode: "+974", regex: /^[3567]\d{7}$/, placeholder: "XXXXXXXX" },
  BH: { dialCode: "+973", regex: /^[369]\d{7}$/, placeholder: "XXXXXXXX" },
  OM: { dialCode: "+968", regex: /^[79]\d{7}$/, placeholder: "XXXXXXXX" },
  IQ: { dialCode: "+964", regex: /^7\d{9}$/, placeholder: "7XXXXXXXXX" },
  SY: { dialCode: "+963", regex: /^9\d{8}$/, placeholder: "9XXXXXXXX" },
  LB: { dialCode: "+961", regex: /^[37]\d{7}$/, placeholder: "XXXXXXXX" },
  PS: { dialCode: "+970", regex: /^5\d{8}$/, placeholder: "5XXXXXXXX" },
  YE: { dialCode: "+967", regex: /^7[0-7]\d{7}$/, placeholder: "7XXXXXXXX" },
  LY: { dialCode: "+218", regex: /^9[1-5]\d{7}$/, placeholder: "9XXXXXXXX" },
  TN: { dialCode: "+216", regex: /^[2-9]\d{7}$/, placeholder: "XXXXXXXX" },
  DZ: { dialCode: "+213", regex: /^[567]\d{8}$/, placeholder: "XXXXXXXXX" },
  MA: { dialCode: "+212", regex: /^[67]\d{8}$/, placeholder: "XXXXXXXXX" },
  SD: { dialCode: "+249", regex: /^9\d{8}$/, placeholder: "9XXXXXXXX" },
  US: { dialCode: "+1",   regex: /^[2-9]\d{9}$/, placeholder: "XXXXXXXXXX" },
  GB: { dialCode: "+44",  regex: /^7\d{9}$/, placeholder: "7XXXXXXXXX" },
  CA: { dialCode: "+1",   regex: /^[2-9]\d{9}$/, placeholder: "XXXXXXXXXX" },
  AU: { dialCode: "+61",  regex: /^4\d{8}$/, placeholder: "4XXXXXXXX" },
  DE: { dialCode: "+49",  regex: /^1[5-7]\d{9,10}$/, placeholder: "1XXXXXXXXXX" },
  FR: { dialCode: "+33",  regex: /^[67]\d{8}$/, placeholder: "XXXXXXXXX" },
  TR: { dialCode: "+90",  regex: /^5\d{9}$/, placeholder: "5XXXXXXXXX" },
  MY: { dialCode: "+60",  regex: /^1\d{8,9}$/, placeholder: "1XXXXXXXX" },
  ID: { dialCode: "+62",  regex: /^8\d{8,10}$/, placeholder: "8XXXXXXXX" },
  PK: { dialCode: "+92",  regex: /^3\d{9}$/, placeholder: "3XXXXXXXXX" },
  IN: { dialCode: "+91",  regex: /^[6-9]\d{9}$/, placeholder: "XXXXXXXXXX" },
  OTHER: { dialCode: "+",  regex: /^\d{5,14}$/, placeholder: "XXXXXXXXXX" },
};
