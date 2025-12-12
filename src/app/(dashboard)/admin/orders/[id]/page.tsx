/* eslint-disable @typescript-eslint/no-explicit-any */
import OrderDetailsClient from "@/components/modules/Order/OrderDetailsClient";
import { getAllOrders } from "@/services/order/order";

const OrderDetailsServer = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const result = await getAllOrders();
  const orders: any[] = result.data || [];

  const order = orders?.find((order: any) => order?.orderId === id);

  if (!order) return <div className="p-4">Order not found</div>;

  return <OrderDetailsClient order={order} />;
};

export default OrderDetailsServer;
