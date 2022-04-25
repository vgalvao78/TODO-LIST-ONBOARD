import { defaultAddres, IAddress } from "./address";
import { defaultCompany, ICompany } from "./company";

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddress;
  phone: string;
  website: string;
  company: ICompany;
}

export const defaultUser: IUser = {
  id: 0,
  name: "",
  username: "",
  email: "",
  address: defaultAddres,
  phone: "",
  website: "",
  company: defaultCompany
};
