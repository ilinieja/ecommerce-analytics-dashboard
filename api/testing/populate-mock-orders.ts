import { createMockOrder } from "./create-mock-order";
import { insertOrders } from "./insert-orders";

const randomOrders = Array.from({ length: 10000 }, createMockOrder);

(async function () {
  await insertOrders(randomOrders);
})();
