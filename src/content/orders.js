var orders = [];

export const getOrders = () => {
  return orders;
};

export const setOrders = orders => {
  orders = orders;
};

export const addOrder = order => {
  orders.push(order);
};
