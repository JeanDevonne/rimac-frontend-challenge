import Checkbox from '../../components/ui/checkbox/Checkbox';
import { Input } from '../../components/ui/input/Input';
import styles from './home.module.scss';
import Select from '../../components/ui/select/Select';
import { useEffect } from 'react';
import BubbleBackground from '../../components/ui/Bubble/Bubble';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts';
import { IUser } from '../../interfaces/user';
import { Toaster, toast } from 'sonner'
import { getUserData } from '../../services/api/userService';

type FormData = {
  docType: string;
  docNumber: string;
  phoneNumber: string;
  acceptPrivacyPolicy: boolean;
  acceptCommercialPolicy: boolean;
};

export default function HomePage() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      docType: "DNI",
      docNumber: "",
      phoneNumber: "",
      acceptPrivacyPolicy: false,
      acceptCommercialPolicy: false,
    },
    mode: "onChange",
  });

  const docType = watch("docType");

  const onSubmit = (formData: FormData) => {
    if (!isValid) {
      return;
    }

    getUser(formData);
  }

  const getUser = async (formData: FormData) => {
    try {
      const userData = await getUserData(formData);
      setUser(userData);
      navigate("/planes");
    } catch (error) {
      console.error(error);
      toast.error('Error al obtener los datos del usuario')
    }
  }

  useEffect(() => {
    setUser(null);
  }, []);

  return (
    <div className={styles.stack}>
      <div className={styles.stack__item}>
        <picture className={styles.stack__item__image}>
          <source 
            media="(max-width: 767px)"
            srcSet="/src/assets/images/heroes/familia-mobile@1x.webp 1x,
            /src/assets/images/heroes/familia-mobile@2x.webp 2x"
            type="image/webp"
            sizes="(max-width: 767px) 100vw, 480px"
          />

          <source 
            media="(min-width: 768px)"
            srcSet="/src/assets/images/heroes/familia-desktop@1x.webp 1x,
            /src/assets/images/heroes/familia-desktop@2x.webp 2x"
            type="image/webp"
            sizes="(min-width: 768px) 480px, 100vw"
          />

          <img 
            src="/src/assets/images/heroes/familia-desktop@1x.webp"
            alt="Padre, madre e hijo sonriendo juntos en un ambiente cálido y familiar"
            loading="eager"
            width="480"
            height="560"
            fetchPriority="high"
            decoding="async"
            sizes="(min-width: 768px) 480px, 100vw"
          />
        </picture>

        <div className={styles.stack__item__content}>
          <h1 className={styles.stack__item__content__title}>Seguro Salud Flexible</h1>
          <h2 className={styles.stack__item__content__subtitle}>Creado para ti y tu familia</h2>
        </div>
        <div className={styles.stack__item__form}>
            <p className={styles.stack__item__form__text}>Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Select
                label="Nro. de documento"
                selectorValue={watch("docType")}
                inputValue={watch("docNumber")}
                onInputChange={(value) =>
                  setValue("docNumber", value, { shouldValidate: true })
                }
                onSelectorChange={(value) => setValue("docType", value)}
                validators={register("docNumber", {
                  required: "* Este campo es requerido",
                  validate: {
                    length: (value) =>
                      docType === "DNI"
                        ? value.length === 8 ||
                          "* El número de documento es inválido"
                        : value.length === 11 ||
                          "* El número de documento es inválido",
                  },
                })}
                error={errors.docNumber}
                style={{
                  width: '350px',
                }}
              />
              <Input
                label="Celular"
                inputType="number"
                maxLength={9}
                inputValue={watch("phoneNumber")}
                onInputChange={(value: any) =>
                  setValue("phoneNumber", value, { shouldValidate: true })
                }
                validators={register("phoneNumber", {
                  required: "* Este campo es requerido",
                  validate: (value) =>
                    value.length === 9 && value.startsWith("9")
                      ? true
                      : "* Ingresa un número de celular válido",
                })}
                error={errors.phoneNumber}
                style={{
                  width: '350px',
                }}
              />
              <Checkbox
                id="pp"
                label="Acepto lo Política de Privacidad"
                checked={watch("acceptPrivacyPolicy")}
                onChange={(checked) => {
                  setValue("acceptPrivacyPolicy", checked);
                }}
                validators={register("acceptPrivacyPolicy", {
                  required: true,
                })}
                error={errors.acceptPrivacyPolicy}
              />
              <Checkbox
                id="pcc"
                label="Acepto la Política Comunicaciones Comerciales"
                checked={watch("acceptCommercialPolicy")}
                onChange={(checked) => {
                  setValue("acceptCommercialPolicy", checked);
                }}
                validators={register("acceptCommercialPolicy", {
                  required: true,
                })}
                error={errors.acceptCommercialPolicy}
              />
              <p className={styles.stack__item__form__tos}>Aplican Términos y Condiciones.</p>
              <button type="submit" className={styles.stack__item__form__button}>Cotiza aquí</button>
            </form>
          </div>
      </div>
      <BubbleBackground />
      <Toaster />
    </div>
  )
}
