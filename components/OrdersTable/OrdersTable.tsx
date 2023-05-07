import classNames from "classnames";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { filtersSelectors } from "@/store/filters/filters.selectors";
import { useEffect } from "react";
import { fetchOrders } from "@/store/orders/orders.slice";
import { ordersSelectors } from "@/store/orders/orders.selectors";
import { Thumbnail } from "../Thumbnail/Thumbnail";
import { stringifyArrayWithLimit } from "@/shared/utils";
import numeral from "numeral";
import LocationThumbnail from "../LocationThumbnail/LocationThumbnail";
import LeadSourceThumbnail from "../LeadSourceThumbnail/LeadSourceThumbnail";

import styles from "./OrdersTable.module.scss";
import SvgCircleLoader from "@/icons/SvgDotsLoader";

export interface OrdersTableProps {
  className?: string;
}

// TODO: Add loading state.
export function OrdersTable({ className }: OrdersTableProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { startDate, endDate } = useSelector(filtersSelectors.getDateRange);

  const isLoadingSuccess = useSelector(ordersSelectors.getIsLoadingSuccess);

  useEffect(() => {
    dispatch(fetchOrders({ startDate, endDate, limit: 5 }));
  }, [startDate, endDate]);

  const orders = useSelector(ordersSelectors.selectAll);

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.header}>
        <h2 className={styles.title}>Latest orders</h2>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.columnHeader} scope="col">
                Customer
              </th>
              <th className={styles.columnHeader} scope="col">
                Items
              </th>
              <th className={styles.columnHeader} scope="col">
                Location
              </th>
              <th className={styles.columnHeader} scope="col">
                Lead
              </th>
              <th className={styles.columnHeader} scope="col">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const orderValue = order.items.reduce(
                (acc, item) => acc + item.item.price * item.quantity,
                0
              );
              const itemsText = stringifyArrayWithLimit(
                order.items.map(({ item }) => item.name),
                2
              );

              return (
                <tr className={styles.row} data-testid="OrdersTable_row">
                  <td
                    className={styles.cell}
                    data-testid="OrdersTable_cell_customer"
                  >
                    <Thumbnail
                      title={order.customer.fullName}
                      subtitle={order.platform}
                    />
                  </td>
                  <td
                    className={styles.cell}
                    data-testid="OrdersTable_cell_items"
                  >
                    {itemsText}
                  </td>
                  <td
                    className={styles.cell}
                    data-testid="OrdersTable_cell_location"
                  >
                    <LocationThumbnail
                      countryCode={order.geoLocation.countryCode}
                      country={order.geoLocation.country}
                      city={order.geoLocation.city}
                    />
                  </td>
                  <td
                    className={classNames(
                      styles.cell,
                      styles.extraPaddingRight
                    )}
                    data-testid="OrdersTable_cell_lead"
                  >
                    <LeadSourceThumbnail leadSource={order.leadSource} />
                  </td>
                  <td
                    className={classNames(
                      styles.cell,
                      styles.rightAligned,
                      styles.bold
                    )}
                    data-testid="OrdersTable_cell_value"
                  >
                    {numeral(orderValue).format("$0.[0]a")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {!isLoadingSuccess && (
        <div className={styles.loadingOverlay}>
          <SvgCircleLoader className={styles.loadingIndicator} />
        </div>
      )}
    </div>
  );
}
