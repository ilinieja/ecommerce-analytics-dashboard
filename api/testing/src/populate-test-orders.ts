import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";
dotenv.config();

import Order, {
  Platform,
  GeoBucket,
  LeadSource,
} from "../../models/order.model";
import dbConnection from "../../utils/dbConnection";
import logger from "../../utils/logger";

async function populateTestData() {
  const connection = await dbConnection();

  const orders = Array.from({ length: 1000 }, createRandomOrder);

  try {
    await Order.collection.insertMany(orders);
    logger.info("Test data populated successfully");
  } catch (err) {
    logger.error(err);
  } finally {
    connection.disconnect();
  }
}

function createRandomOrder() {
  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);

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
      createRandomItem
    ),
    leadSource: faker.helpers.arrayElement(Object.values(LeadSource)),
    date: faker.date.between(fiveYearsAgo, Date.now()),
  });
}

function createRandomItem() {
  return {
    item: {
      name: faker.commerce.productName(),
      price: faker.commerce.price(1, 100),
    },
    quantity: faker.datatype.number({ min: 1, max: 10 }),
  };
}

(async function () {
  await populateTestData();
})();
