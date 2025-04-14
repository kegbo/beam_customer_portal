import * as Yup from "yup";

export const BuySellValidationSchema = Yup.object().shape({
  customer: Yup.string().required("Customer is required"),
  side: Yup.string().required("Side is required"),
  orderType: Yup.string().required("Order type is required"),
  price: Yup.number().required("Price is required"),
  quantity: Yup.number().required("Quantity is required"),
  timeInForce: Yup.string().required("Time in force is required"),
});
