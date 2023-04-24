import { GeoBucket, Platform } from "@/api/models/order.model";

const PLATFORMS_PALETTE: { [platform in Platform]: string } = {
  [Platform.Amazon]: "#343434",
  [Platform.Ebay]: "#4875c3",
  [Platform.Allegro]: "#dd8057",
  [Platform.Farfetch]: "#665191",
};

const GEO_BUCKETS_PALETTE: { [geoBucket in GeoBucket]: string } = {
  [GeoBucket.Americas]: "#46608F",
  [GeoBucket.Europe]: "#61AB94",
  [GeoBucket.Asia]: "#C66669",
  [GeoBucket.Other]: "#7C7693",
};

const PLATFORMS_ORDER: { [platform in Platform]: number } = {
  [Platform.Amazon]: 0,
  [Platform.Ebay]: 1,
  [Platform.Allegro]: 2,
  [Platform.Farfetch]: 3,
};

const GEO_BUCKETS_ORDER: { [platform in GeoBucket]: number } = {
  [GeoBucket.Americas]: 0,
  [GeoBucket.Europe]: 1,
  [GeoBucket.Asia]: 2,
  [GeoBucket.Other]: 3,
};

export const DEFAULT_COLOR = "#C9C9C9";

export function getPlatformColor(platform: string) {
  return PLATFORMS_PALETTE[platform as Platform] ?? DEFAULT_COLOR;
}

export function getPlatformOrder(platform: string) {
  return PLATFORMS_ORDER[platform as Platform] ?? 0;
}

export function getGeoBucketColor(geoBucket: string) {
  return GEO_BUCKETS_PALETTE[geoBucket as GeoBucket] ?? DEFAULT_COLOR;
}

export function getGeoBucketOrder(geoBucket: string) {
  return GEO_BUCKETS_ORDER[geoBucket as GeoBucket] ?? 0;
}
