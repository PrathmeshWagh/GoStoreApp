export const states = {
  CANCELLED: 'CANCELLED',
  SELLER_REJECTED: 'SELLER_REJECTED',
  SHIPPED: 'SHIPPED',
  OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
  DELIVERED: 'DELIVERED',
};

export const trackStepsOrderPlaced = [
  {
    statusToDisplay: 'Order Placed',
    status: 'ORDERED',
    date: '',
  },
  {
    statusToDisplay: 'Order Shipped',
    status: 'SHIPPED',
  },
  {
    statusToDisplay: 'Out for Delivery',
    status: 'OUT_FOR_DELIVERY',
  },
  {
    statusToDisplay: 'Order Delivered',
    status: 'DELIVERED',
  },
];

export const DSRCStatus = ['DELIVERED', 'SELLER_REJECTED', 'CANCELLED'];
export const SRCStatus = ['SELLER_REJECTED', 'CANCELLED'];
export const OSDStatus = ['ORDERED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED'];
export const OSStatus = ['ORDERED', 'SHIPPED', 'OUT_FOR_DELIVERY'];

export const priceSummaryAttr = [
  { name: 'Price', prop: 'mrp', type: 'price', class: 'text-grey-new-dark font-medium' },
  {
    name: 'Buy Back Guarantee Price',
    prop: 'abbPrice',
    type: 'price',
    class: 'text-grey-new-dark font-medium',
  },
  {
    name: 'Item Discount',
    prop: 'itemDiscount',
    type: 'price',
    class: 'text-green-primary',
    minus: '-',
  },
  {
    name: 'Bank Discount',
    prop: 'bankDiscount',
    type: 'price',
    class: 'text-green-primary',
    minus: '-',
  },
  {
    name: 'Coupon Discount',
    prop: 'couponDiscount',
    type: 'price',
    class: 'text-green-primary',
    minus: '-',
  },
  {
    name: 'Exchange Value',
    prop: 'exchangeValue',
    type: 'price',
    class: 'text-green-primary',
    minus: '-',
  },
  {
    name: 'Shipping Charges',
    prop: 'shipmentCharge',
    type: 'price',
    class: 'text-green-primary',
    minus: '-',
  },
  {
    name: 'Total Amount',
    prop: 'totalPrice',
    type: 'price',
    class: 'text-grey-new-dark font-semibold',
  },
];
