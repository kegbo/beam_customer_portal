import { authApiService } from "@/utils/api/services/auth.service";
import { CustomerInfoLayout } from "./CustomerInfoLayout";
import { notFound } from "next/navigation";

export default async function Page({ params }: any) {
  const customerId = params?.id;

  if (!customerId) return notFound();

  // const { error, data } = await authApiService.getCustomerInfo(customerId);
  // console.log(error);
  return <CustomerInfoLayout id={customerId} />;
}
