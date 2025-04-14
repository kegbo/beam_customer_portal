export interface Role {
  id: string;
  name: string;
  permissions: string[];
}

export interface Broker {
  id: string;
  name: string;
  email: string;
}

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  isSuperAdmin: boolean;
  isOwner: boolean;
  broker: Broker;
  role: Role;
}
