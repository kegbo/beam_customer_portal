import { Wallet } from "@/components/wallet/Wallet";
import { CustomerInfoAsideHeader } from "./CustomerInfoAsideHeader";
import Modal from "@/components/Modal";
import { useQuery } from "@tanstack/react-query";
import { authApiService } from "@/utils/api/services/auth.service";

export const CustomerAsideData = () => {
  return (
    <>
      <CustomerInfoAsideHeader />
      <Wallet />
    </>
  );
};
