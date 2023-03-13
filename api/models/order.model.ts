import mongoose from "mongoose";

export enum Platform {
  Amazon = "Amazon",
  Ebay = "Ebay",
  Allegro = "Allegro",
  Farfetch = "Farfetch",
}

export enum GeoBucket {
  Europe = "Europe",
  Asia = "Asia",
  Americas = "Americas",
  Other = "Other",
}

export enum LeadSource {
  Facebook = "Facebook",
  Instagram = "Instagram",
  GoogleAds = "GoogleAds",
  Email = "Email",
}

const Order = new mongoose.Schema({
  customer: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
  },
  platform: { type: String, required: true, enum: Platform },
  geoLocation: {
    countryCode: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String, required: true },
    postcode: { type: String, required: true },

    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    bucket: { type: String, required: true, enum: GeoBucket },
  },
  items: [
    {
      item: {
        name: { type: String, required: true },
        price: { type: Number, required: true },
      },
      quantity: { type: Number, required: true },
    },
  ],
  leadSource: { type: String, required: true, enum: LeadSource },
  date: { type: Date, required: true },
});

// This prevents Mongoose from recompiling the model.
export default mongoose.models.Order || mongoose.model("Order", Order);
