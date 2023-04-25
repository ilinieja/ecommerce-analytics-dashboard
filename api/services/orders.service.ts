import { DbConnection } from "../shared/dbConnection";
import OrderModel, {
  GeoBucket,
  LeadSource,
  Platform,
} from "../models/order.model";

export interface Order {
  customer: {
    fullName: string;
    email: string;
  };
  platform: Platform;
  geoLocation: {
    countryCode: string;
    country: string;
    state: string;
    city: string;
    addressLine1: string;
    addressLine2: string;
    postcode: string;

    lat: number;
    lon: number;
    bucket: GeoBucket;
  };
  items: [
    {
      item: {
        name: string;
        price: number;
      };
      quantity: number;
    }
  ];
  leadSource: LeadSource;
  date: Date;
}

export class OrdersService {
  @DbConnection()
  async getOrders(
    startDate: Date,
    endDate: Date,
    limit: number
  ): Promise<Order[]> {
    const orders = await OrderModel.find(
      { date: { $gte: startDate, $lt: endDate } },
      { projection: { _id: false } }
    )
      .sort({ date: 1 })
      .limit(limit)
      .exec();

    return orders;
  }
}
