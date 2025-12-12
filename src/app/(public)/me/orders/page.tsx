/* eslint-disable @typescript-eslint/no-explicit-any */
import UserOrderCard from "@/components/modules/Order/UserOrderCard";
import { getMyOrders } from "@/services/order/order";

export const dynamic = "force-dynamic";

const page = async () => {
  const orders = (await getMyOrders()) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 md:py-10">
      <h1 className="font-medium text-lg md:text-xl mb-4">Orders</h1>

      <div className="space-y-4">
        {orders?.map((order: any, idx: number) => (
          <UserOrderCard key={idx} order={order} />
        ))}
      </div>
    </div>
  );
};

export default page;
