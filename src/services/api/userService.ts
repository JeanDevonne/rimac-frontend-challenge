import { IUser } from '../../interfaces/user';

interface UserFormData {
  docType: string;
  docNumber: string;
  phoneNumber: string;
  acceptPrivacyPolicy: boolean;
  acceptCommercialPolicy: boolean;
}

export const getUserData = async (formData: UserFormData): Promise<IUser> => {
  const response = await fetch('https://rimac-front-end-challenge.netlify.app/api/user.json');
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Error al obtener los datos del usuario');
  }

  return {
    name: data?.name,
    lastName: data?.lastName,
    birthDay: data?.birthDay,
    docType: formData.docType,
    docNumber: formData.docNumber,
    phoneNumber: formData.phoneNumber,
    acceptPrivacyPolicy: formData.acceptPrivacyPolicy,
    acceptCommercialPolicy: formData.acceptCommercialPolicy,
    plan: null,
  };
}; 