/**
 * Amenities catalogue for BAHINA Hospitality farmhouses
 */

export const AMENITIES = [
  {
    id: "pool",
    icon: "Waves",
    labelKey: "hosp.amenity.pool",
    descKey: "hosp.amenity.poolDesc",
  },
  {
    id: "meals",
    icon: "Utensils",
    labelKey: "hosp.amenity.meals",
    descKey: "hosp.amenity.mealsDesc",
  },
  {
    id: "wifi",
    icon: "Wifi",
    labelKey: "hosp.amenity.wifi",
    descKey: "hosp.amenity.wifiDesc",
  },
  {
    id: "kitchen",
    icon: "Flame",
    labelKey: "hosp.amenity.kitchen",
    descKey: "hosp.amenity.kitchenDesc",
  },
  {
    id: "power_backup",
    icon: "Zap",
    labelKey: "hosp.amenity.powerBackup",
    descKey: "hosp.amenity.powerBackupDesc",
  },
  {
    id: "lawn",
    icon: "Trees",
    labelKey: "hosp.amenity.lawn",
    descKey: "hosp.amenity.lawnDesc",
  },
  {
    id: "campfire",
    icon: "Sparkles",
    labelKey: "hosp.amenity.campfire",
    descKey: "hosp.amenity.campfireDesc",
  },
  {
    id: "parking",
    icon: "Car",
    labelKey: "hosp.amenity.parking",
    descKey: "hosp.amenity.parkingDesc",
  },
  {
    id: "mountain_view",
    icon: "Mountain",
    labelKey: "hosp.amenity.mountainView",
    descKey: "hosp.amenity.mountainViewDesc",
  },
  {
    id: "games",
    icon: "Dices",
    labelKey: "hosp.amenity.games",
    descKey: "hosp.amenity.gamesDesc",
  },
  {
    id: "pet_friendly",
    icon: "Heart",
    labelKey: "hosp.amenity.petFriendly",
    descKey: "hosp.amenity.petFriendlyDesc",
  },
  {
    id: "ac",
    icon: "Wind",
    labelKey: "hosp.amenity.ac",
    descKey: "hosp.amenity.acDesc",
  },
];

export const getAmenityById = (id) => AMENITIES.find((a) => a.id === id);

export const AMENITIES_LIST = AMENITIES;

export default AMENITIES;

