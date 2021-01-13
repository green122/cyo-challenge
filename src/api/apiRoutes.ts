export const basicUrl = "http://localhost:4400";

export const ordersUrl = `${basicUrl}/orders`;

export const orderByIdUrl = (orderId: string) => `${ordersUrl}/${orderId}`;
