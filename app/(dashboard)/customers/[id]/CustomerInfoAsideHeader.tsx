"use client";
import { CopyIcon } from "@/components/icons/copy";
import { CopyButton } from "@/components/utilities/utility.component";
import { copyToClipboard } from "@/lib/helper";
import { Customer } from "@/utils/api/services/auth.interface";
import { authApiService } from "@/utils/api/services/auth.service";
import { getStringParam } from "@/utils/helper";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useParams } from "next/navigation";
import styled from "styled-components";

export const CustomerInfoAsideHeaderContainer = styled.div`
  margin-top: 20px;
  margin-left: 0;
  padding: 0 10px;
  
  @media (min-width: 768px) {
    margin-top: 40px;
    margin-left: 22px;
    padding: 0;
  }
`;

const CustomerName = styled.h3`
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.2;
  margin-bottom: 20px;
  word-break: break-word;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
    line-height: 1.438rem;
    margin-bottom: 40px;
  }
`;

const UL = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  margin-bottom: 22px;
  gap: 16px;
  
  @media (min-width: 576px) {
    flex-direction: row;
    gap: 32px;
  }
`;

const LI = styled.li`
  width: 100%;
  max-width: 100%;
  
  @media (min-width: 576px) {
    width: 160px;
  }
`;

const InfoLabel = styled.p`
  color: #8C8C89;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InfoValue = styled.p`
  max-width: 100%;
  word-break: break-all;
  
  @media (min-width: 576px) {
    word-break: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

export const CustomerInfoAsideHeader = () => {
  const params = useParams();
  const customerId = getStringParam(params.id);

  const { isLoading, data: result } = useQuery({
    queryKey: ["customer", customerId],
    queryFn: () => authApiService.getCustomerInfo(customerId!),
  });

  const data = result?.data || {};

  return (
    <CustomerInfoAsideHeaderContainer>
      <CustomerName>
        {data?.firstName} {data?.lastName}
      </CustomerName>
      <UL>
        <LI>
          <InfoLabel>
            Email Address{" "}
            <CopyButton onClick={() => copyToClipboard(data?.email)}>
              <CopyIcon width={16} height={16} />
            </CopyButton>
          </InfoLabel>
          <InfoValue>{data?.email}</InfoValue>
        </LI>
        <LI>
          <InfoLabel>Phone Number</InfoLabel>
          <InfoValue>{data?.phoneNumber}</InfoValue>
        </LI>
      </UL>
    </CustomerInfoAsideHeaderContainer>
  );
};