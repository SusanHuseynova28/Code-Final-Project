"use client";
import React, { useEffect, useState } from "react";
import Header from "../_featured/header";
import Footer from "../_featured/footer";


interface OrderProduct {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  items: OrderProduct[];
  total: number;
  status: string;
  date: string;
}

const statuses = ["Pending", "Shipped", "Out for Delivery", "Delivered"];

const OrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  const updateOrderStatus = (id: string, newStatus: string) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const deleteOrder = (id: string) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mt-6 text-center">My Orders</h1>
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center text-2xl mt-6">
            You have no orders yet.
          </p>
        ) : (
          <div className="w-full space-y-8 mt-8">
            {orders.map((order) => (
              <div key={order.id} className="w-full border p-6 rounded-lg shadow relative">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">Date: {order.date}</p>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="bg-customBackground text-white py-2 px-4 rounded"
                  >
                    Delete Order
                  </button>
                </div>

                <div className="flex items-center justify-between my-4 relative">
                  {statuses.map((status, index) => (
                    <div key={status} className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
                          statuses.indexOf(order.status) >= index
                            ? "bg-green-500 text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}
                        onClick={() => updateOrderStatus(order.id, status)}
                        title={status}
                      >
                        ✓
                      </div>
                      <span className="text-xs mt-1 text-gray-600">{status}</span>
                    </div>
                  ))}

                  <div className="absolute top-8 left-0 right-0 flex items-center justify-between transform -translate-y-1/2">
                    {statuses.slice(0, statuses.length - 1).map((_, index) => (
                      <div
                        key={index}
                        className={`flex-1 h-1 ${
                          index === 0 && statuses.indexOf(order.status) > 0
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></div>
                    ))}

                   
                  </div>
                </div>

                <div className="mt-4">
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center space-x-4 mb-2"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                      <div>
                        <h3 className="text-md font-semibold">{item.name}</h3>
                        <p className="text-gray-500">QTY: {item.quantity}</p>
                        <p className="text-gray-700">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <p className="text-lg font-semibold text-gray-900 mt-2 flex justify-end">
                  Total: ${order.total.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrderPage;
