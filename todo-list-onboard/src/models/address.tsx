import { defaultGeo, IGeo } from "./geo";

export interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeo;
}

export const defaultAddres: IAddress = {
  street: "",
  suite: "",
  city: "",
  zipcode: "",
  geo: defaultGeo
};
