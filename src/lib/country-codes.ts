export type CountryCode = {
  code: string;
  nameEn: string;
  nameAr: string;
};

export type Region = {
  nameEn: string;
  nameAr: string;
  countries: CountryCode[];
};

export const AFRICAN_REGIONS: Region[] = [
  {
    nameEn: "North Africa",
    nameAr: "شمال أفريقيا",
    countries: [
      { code: "+20", nameEn: "Egypt", nameAr: "مصر" },
      { code: "+213", nameEn: "Algeria", nameAr: "الجزائر" },
      { code: "+212", nameEn: "Morocco", nameAr: "المغرب" },
      { code: "+216", nameEn: "Tunisia", nameAr: "تونس" },
      { code: "+218", nameEn: "Libya", nameAr: "ليبيا" },
      { code: "+222", nameEn: "Mauritania", nameAr: "موريتانيا" },
    ],
  },
  {
    nameEn: "East Africa",
    nameAr: "شرق أفريقيا",
    countries: [
      { code: "+251", nameEn: "Ethiopia", nameAr: "إثيوبيا" },
      { code: "+254", nameEn: "Kenya", nameAr: "كينيا" },
      { code: "+255", nameEn: "Tanzania", nameAr: "تنزانيا" },
      { code: "+256", nameEn: "Uganda", nameAr: "أوغندا" },
      { code: "+249", nameEn: "Sudan", nameAr: "السودان" },
      { code: "+211", nameEn: "South Sudan", nameAr: "جنوب السودان" },
      { code: "+252", nameEn: "Somalia", nameAr: "الصومال" },
      { code: "+253", nameEn: "Djibouti", nameAr: "جيبوتي" },
      { code: "+291", nameEn: "Eritrea", nameAr: "إريتريا" },
      { code: "+250", nameEn: "Rwanda", nameAr: "رواندا" },
      { code: "+257", nameEn: "Burundi", nameAr: "بوروندي" },
      { code: "+261", nameEn: "Madagascar", nameAr: "مدغشقر" },
      { code: "+230", nameEn: "Mauritius", nameAr: "موريشيوس" },
      { code: "+269", nameEn: "Comoros", nameAr: "جزر القمر" },
      { code: "+248", nameEn: "Seychelles", nameAr: "سيشل" },
    ],
  },
  {
    nameEn: "Central Africa",
    nameAr: "وسط أفريقيا",
    countries: [
      { code: "+243", nameEn: "DR Congo", nameAr: "جمهورية الكونغو الديمقراطية" },
      { code: "+237", nameEn: "Cameroon", nameAr: "الكاميرون" },
      { code: "+244", nameEn: "Angola", nameAr: "أنغولا" },
      { code: "+235", nameEn: "Chad", nameAr: "تشاد" },
      { code: "+236", nameEn: "Central African Republic", nameAr: "جمهورية أفريقيا الوسطى" },
      { code: "+242", nameEn: "Congo", nameAr: "جمهورية الكونغو" },
      { code: "+241", nameEn: "Gabon", nameAr: "الغابون" },
      { code: "+240", nameEn: "Equatorial Guinea", nameAr: "غينيا الاستوائية" },
      { code: "+239", nameEn: "Sao Tome and Principe", nameAr: "ساو تومي وبرينسيب" },
    ],
  },
  {
    nameEn: "West Africa",
    nameAr: "غرب أفريقيا",
    countries: [
      { code: "+234", nameEn: "Nigeria", nameAr: "نيجيريا" },
      { code: "+233", nameEn: "Ghana", nameAr: "غانا" },
      { code: "+225", nameEn: "Côte d'Ivoire", nameAr: "ساحل العاج" },
      { code: "+221", nameEn: "Senegal", nameAr: "السنغال" },
      { code: "+223", nameEn: "Mali", nameAr: "مالي" },
      { code: "+227", nameEn: "Niger", nameAr: "النيجر" },
      { code: "+226", nameEn: "Burkina Faso", nameAr: "بوركينا فاسو" },
      { code: "+229", nameEn: "Benin", nameAr: "بنين" },
      { code: "+228", nameEn: "Togo", nameAr: "توغو" },
      { code: "+224", nameEn: "Guinea", nameAr: "غينيا" },
      { code: "+232", nameEn: "Sierra Leone", nameAr: "سيراليون" },
      { code: "+231", nameEn: "Liberia", nameAr: "ليبيريا" },
      { code: "+245", nameEn: "Guinea-Bissau", nameAr: "غينيا بيساو" },
      { code: "+220", nameEn: "Gambia", nameAr: "غامبيا" },
      { code: "+238", nameEn: "Cape Verde", nameAr: "الرأس الأخضر" },
    ],
  },
  {
    nameEn: "Southern Africa",
    nameAr: "جنوب أفريقيا",
    countries: [
      { code: "+27", nameEn: "South Africa", nameAr: "جنوب أفريقيا" },
      { code: "+260", nameEn: "Zambia", nameAr: "زامبيا" },
      { code: "+263", nameEn: "Zimbabwe", nameAr: "زيمبابوي" },
      { code: "+258", nameEn: "Mozambique", nameAr: "موزمبيق" },
      { code: "+265", nameEn: "Malawi", nameAr: "ملاوي" },
      { code: "+264", nameEn: "Namibia", nameAr: "ناميبيا" },
      { code: "+267", nameEn: "Botswana", nameAr: "بوتسوانا" },
      { code: "+266", nameEn: "Lesotho", nameAr: "ليسوتو" },
      { code: "+268", nameEn: "Eswatini", nameAr: "إسواتيني" },
    ],
  },
];

export function getAllCountryCodes(): CountryCode[] {
  return AFRICAN_REGIONS.flatMap((r) => r.countries);
}

export function getRegionByCode(code: string): Region | undefined {
  return AFRICAN_REGIONS.find((r) => r.countries.some((c) => c.code === code));
}
