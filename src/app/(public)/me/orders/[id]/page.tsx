/* eslint-disable @typescript-eslint/no-explicit-any */
import UserOrderCart from "@/components/modules/Order/UserOrderCart";
import { getMyOrders } from "@/services/order/order";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const orders = (await getMyOrders()) || [];
  const order = orders?.find((order: any) => order?.orderId === id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 md:py-10">
      <h1 className="font-medium text-lg md:text-xl mb-4">Orders Details</h1>

      <div className="space-y-4">
        <UserOrderCart order={order} />
      </div>
    </div>
  );
};

export default page;
