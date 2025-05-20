import { useEffect, useState } from 'react';
import { parse, diffYears } from "@formkit/tempo";
import styles from './plans.module.scss';
import iconForMe from '../../assets/images/icons/IcProtectionLight.svg';
import iconForSomeone from '../../assets/images/icons/IcAddUserLight.svg';
import iconHome from '../../assets/images/icons/IcHomeLight.svg';
import SteepTracker from '../../components/ui/steepTracker/SteepTracker';
import RadioCard from '../../components/ui/radioCard/RadioCard';
import { useUser } from '../../contexts';
import { useNavigate } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// Import required modules
import { Navigation } from 'swiper/modules';

interface Plan {
  name: string;
  price: number;
  description: string[];
  age: number;
}

interface PlansResponse {
  list: Plan[];
}

export default function Plans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedUserType, setSelectedUserType] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const fetchPlans = async () => {
      const userAge = getAgeWithPrecision(user.birthDay);

      try {
        const response = await fetch('https://rimac-front-end-challenge.netlify.app/api/plans.json');
        const data: PlansResponse = await response.json();
        setPlans(data.list.filter(plan => plan.age >= userAge));
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, [selectedUserType]);

  const getAgeWithPrecision = (birthDayStr: string) => {
    const birthDay = parse(birthDayStr, "DD-MM-YYYY");
    const today = new Date();
    return diffYears(today, birthDay);
  }

  const handleUserTypeChange = (id: string) => {
    setSelectedUserType(id);
  };

  const handlePlanSelection = (plan: Plan) => {
    setUser({
      ...user,
      plan: {
        name: plan.name,
        price: selectedUserType === 'forSomeone' ? plan.price * 0.95 : plan.price,
        description: plan.description,
        age: plan.age
      }
    });
    navigate('/resumen');
  }

  const renderPlans = () => {
    if (isMobile) {
      return (
        <div className={styles.plans__cards__mobile}>
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={true}
            onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex + 1)}
            className={styles.plans__cards}
          >
            {plans.map((plan, index) => (
              <SwiperSlide key={index}>
                <div className={styles.PlanDetailCard}>
                  <img src={iconHome} alt={`Icono ${plan.name}`} className={styles.PlanDetailCard__icon}/>
                  <p className={styles.PlanDetailCard__title}>{plan.name}</p>
                  <p className={styles.PlanDetailCard__cost}>Costo del plan</p>
                  {selectedUserType === 'forSomeone' && (
                    <>
                      <p className={styles.PlanDetailCard__price__trash}>
                        ${plan.price} antes
                      </p>
                      <p className={styles.PlanDetailCard__price}>
                        ${(plan.price * 0.95).toFixed(2)} al mes
                      </p>
                    </>
                  )}
                  {selectedUserType === 'forMe' && (
                    <p className={styles.PlanDetailCard__price}>
                      ${plan.price} al mes
                    </p>
                  )}
                  <div className={styles.PlanDetailCard__line}></div>
                  {plan.description.map((desc, idx) => (
                    <p key={idx} className={`${styles.PlanDetailCard__description} ${styles.PlanDetailCard__description__bullet}`}>
                      {desc}
                    </p>
                  ))}
                  <button onClick={() => handlePlanSelection(plan)} className={styles.PlanDetailCard__button}>Seleccionar Plan</button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={styles.plans__navigation}>
            <span className={styles.plans__navigation__counter}>
              {currentSlide} / {plans.length}
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.plans__cards__desktop}>
        {plans.map((plan, index) => (
          <div key={index} className={styles.PlanDetailCard}>
            <img src={iconHome} alt={`Icono ${plan.name}`} className={styles.PlanDetailCard__icon}/>
            <p className={styles.PlanDetailCard__title}>{plan.name}</p>
            <p className={styles.PlanDetailCard__cost}>Costo del plan</p>
            {selectedUserType === 'forSomeone' && (
              <>
                <p className={styles.PlanDetailCard__price__trash}>
                  ${plan.price} antes
                </p>
                <p className={styles.PlanDetailCard__price}>
                  ${(plan.price * 0.95).toFixed(2)} al mes
                </p>
              </>
            )}
            {selectedUserType === 'forMe' && (
              <p className={styles.PlanDetailCard__price}>
                ${plan.price} al mes
              </p>
            )}
            <div className={styles.PlanDetailCard__line}></div>
            {plan.description.map((desc, idx) => (
              <p key={idx} className={`${styles.PlanDetailCard__description} ${styles.PlanDetailCard__description__bullet}`}>
                {desc}
              </p>
            ))}
            <button onClick={() => handlePlanSelection(plan)} className={styles.PlanDetailCard__button}>Seleccionar Plan</button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className={styles.plans}>
        <SteepTracker step={1} backPath="/" />
        <div className={styles.plans__item}>
          <p className={styles.plans__title}>
            {user ? `${user.name}` : 'Usuario'} ¿Para quién deseas cotizar?
          </p>
          <p className={styles.plans__description}>Selecciona la opción que se ajuste más a tus necesidades.</p>
          <div className={styles.card__container}>
            <RadioCard
              id="forMe"
              title="Para mi"
              description="Cotiza tu seguro de salud y agrega familiares si así lo deseas."
              icon={iconForMe}
              checked={selectedUserType === 'forMe'}
              onChange={handleUserTypeChange}
            />
            <RadioCard
              id="forSomeone"
              title="Para alguien más"
              description="Realiza una cotización para uno de tus familiares o cualquier persona."
              icon={iconForSomeone}
              checked={selectedUserType === 'forSomeone'}
              onChange={handleUserTypeChange}
            />
          </div>
          {selectedUserType && renderPlans()}
        </div>
      </div>
    </div>
  );
}