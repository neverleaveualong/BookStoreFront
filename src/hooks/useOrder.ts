import { useEffect, useState } from "react";
import { Order, OrderListItem } from "../models/order.model";
import { fetchOrder, fetchOrders, order } from "../api/order.api";

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  useEffect(() => {
    console.log("useOrders 실행됨");
    fetchOrders().then((orders) => {
      console.log("불러온 주문 목록:", orders);
      setOrders(orders);
    });
  }, []);

  const selectOrderItem = (orderId: number) => {
    if (orders.filter((item) => item.id === orderId)[0].detail) {
      setSelectedItemId(orderId);
      return;
    }
    fetchOrder(orderId).then((orderDetail) => {
      setSelectedItemId(orderId);

      setOrders(
        orders.map((item) => {
          if (item.id === orderId) {
            return {
              ...item,
              detail: orderDetail,
            };
          }
          return item;
        })
      );
    });
  };

  return { orders, selectedItemId, selectOrderItem };
};
