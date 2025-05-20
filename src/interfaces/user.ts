
export interface IPlan {
  name: string;
  price: number;
  description: string[];
  age: number;
}

export interface IUser {
  name: string;
  lastName: string;
  phoneNumber: string;
  birthDay: string;
  docType: string;
  docNumber: string;
  acceptPrivacyPolicy: boolean;
  acceptCommercialPolicy: boolean;
  plan: IPlan;
};