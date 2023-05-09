import { faker } from "@faker-js/faker";
import Order, { Platform, GeoBucket, LeadSource } from "../models/order.model";

export function createMockOrder() {
  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 1);

  return new Order({
    customer: {
      fullName: faker.name.fullName(),
      email: faker.internet.email(),
    },
    platform: faker.helpers.arrayElement(Object.values(Platform)),
    geoLocation: {
      countryCode: faker.address.countryCode(),
      country: faker.address.country(),
      state: faker.address.county(),
      city: faker.address.city(),
      addressLine1: faker.address.streetAddress(),
      addressLine2: faker.address.secondaryAddress(),
      postcode: faker.address.zipCode(),

      lat: faker.address.latitude(),
      lon: faker.address.longitude(),
      bucket: faker.helpers.arrayElement(Object.values(GeoBucket)),
    },
    items: Array.from(
      { length: faker.datatype.number({ min: 1, max: 10 }) },
      createMockItem
    ),
    leadSource: faker.helpers.arrayElement(Object.values(LeadSource)),
    date: faker.date.between(fiveYearsAgo, Date.now()),
  });
}

function createMockItem() {
  return {
    item: {
      name: faker.commerce.productName(),
      price: faker.commerce.price(1, 100),
    },
    quantity: faker.datatype.number({ min: 1, max: 10 }),
  };
}
