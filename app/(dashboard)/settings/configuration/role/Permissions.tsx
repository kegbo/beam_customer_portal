"use client";
import Checkbox from "@/components/Checkbox";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { allowedPermissions } from "@/utils/atom";

const PermissionContainer = styled.div`
  margin-top: 32px;
`;

const PermissionItemWrapper = styled.div`
  margin-bottom: 24px;
  border-bottom: 0.031rem solid #a6a5a2;
`;

const PermissionItemWrapperHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PermissionItemWrapperHeaderTitle = styled.p`
  font-size: 0.75rem;
`;

type PermissionProps = {
  defaultValue?: string[]; // ["Wallets.view", "Order.create"]
  onChange: (updatedPermissions: string[]) => void;
};

type PermissionItemProps = {
  module: string;
  permissions: string[];
  selected: string[];
  onPermissionChange: (module: string, permission: string) => void;
};

export const Permission: React.FC<PermissionProps> = ({
  defaultValue = [],
  onChange,
}) => {
  const allowedPermission = useAtomValue(allowedPermissions);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current && Array.isArray(defaultValue)) {
      const normalized = defaultValue.map((perm) => {
        const [module, action] = perm.split(".");
        return `${module.toLowerCase()}.${action.toLowerCase()}`;
      });
      setSelectedPermissions(normalized);
      isInitialized.current = true;
    }
  }, [defaultValue]);

  useEffect(() => {
    if (isInitialized.current) {
      onChange([...selectedPermissions]);
    }
  }, [selectedPermissions]);

  const handlePermissionChange = (module: string, permission: string) => {
    const key = `${module.toLowerCase()}.${permission.toLowerCase()}`;
    setSelectedPermissions((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    );
  };

  return (
    <PermissionContainer>
      <p style={{ fontSize: "0.75rem", marginBottom: "24px" }}>Permissions</p>
      {allowedPermission.map(({ module, permissions }) => (
        <PermissionItem
          key={module}
          module={module}
          permissions={permissions}
          selected={selectedPermissions
            ?.filter((p) => p.startsWith(`${module.toLowerCase()}.`))
            .map((p) => p.split(".")[1].toLowerCase())}
          onPermissionChange={handlePermissionChange}
        />
      ))}
    </PermissionContainer>
  );
};

const PermissionItem: React.FC<PermissionItemProps> = ({
  module,
  permissions,
  selected,
  onPermissionChange,
}) => {
  return (
    <PermissionItemWrapper>
      <PermissionItemWrapperHeader>
        <PermissionItemWrapperHeaderTitle>
          {module}
        </PermissionItemWrapperHeaderTitle>
      </PermissionItemWrapperHeader>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginTop: "13px",
          paddingBottom: 24,
        }}
      >
        {permissions.map((item) => (
          <Checkbox
            key={item}
            label={item}
            checked={selected.includes(item.toLowerCase())}
            onChange={() => onPermissionChange(module, item)}
            labelStyle={{ fontSize: "0.75rem" }}
          />
        ))}
      </div>
    </PermissionItemWrapper>
  );
};
