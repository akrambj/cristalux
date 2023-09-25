import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "../../sections/home/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const Slider = ({ products, isVisible }) => {
  const [slidesPerView, setSlidesPerView] = useState(6);
  const [spaceBetween, setSpaceBetween] = useState(20);
  const swiperRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 800) {
        setSlidesPerView(2);
      } else if (window.innerWidth < 1000) {
        setSlidesPerView(2)
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(3);
      } else if (window.innerWidth < 1200) {
        setSlidesPerView(3);
      } else if (window.innerWidth < 1300) {
        setSlidesPerView(4)
      } else if (window.innerWidth < 1400) {
        setSlidesPerView(4);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleSpace = () => {
      if (window.innerWidth < 500) {
        setSpaceBetween(90);
      } else if (window.innerWidth < 800) {
        setSpaceBetween(10);
      } else if (window.innerWidth < 1024) {
        setSpaceBetween(10);
      } else if (window.innerWidth < 1200) {
        setSpaceBetween(40);
      } else if (window.innerWidth < 1400) {
        setSpaceBetween(120);
      }
    };

    window.addEventListener("resize", handleSpace);
    handleSpace();

    return () => {
      window.removeEventListener("resize", handleSpace);
    };
  }, []);


  const prevbuttonVarant = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeIn",
      },
    },
  };
  
  const nextbuttonVarant = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeIn",
      },
    },
  };


   const cardSize =
     "w-[270px] xs:w-[300px] h-[480px] xs2:w-[230px] xs2:h-[400px] sm:w-[280px] sm:h-[420px] md:w-[300px] md:h-[490px] lg:w-[300px] lg:h-[450px]";

    const lineClamp = "line-clamp-2";
    
  


  return (
    <div className="py-2 relative slider w-full h-full flex flex-col justify-start ">
      <motion.div
        className="w-[25px] xs2:w-[25px] md:w-[40px] h-[150px] md:h-[200px] lg:top-[25%]   bg-cristaluxBrown absolute left-0 top-[50%] translate-y-[-50%] flex items-center justify-start xs2:justify-center"
        initial={"hidden"}
        animate={isVisible ? "visible" : "hidden"}
        variants={prevbuttonVarant}
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="cursor-pointer text-white text-sm md:text-2xl"
          onClick={() => swiperRef.current.swiper.slidePrev()}
        />
      </motion.div>
      <motion.div
        className="w-[25px] xs2:w-[25px] md:w-[40px] h-[150px] md:h-[200px]  bg-cristaluxBrown absolute right-0 top-[50%] lg:top-[25%] translate-y-[-50%] flex items-center justify-end xs2:justify-center"
        initial={"hidden"}
        animate={isVisible ? "visible" : "hidden"}
        variants={nextbuttonVarant}
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          className="cursor-pointer text-white text-sm md:text-2xl"
          onClick={() => swiperRef.current.swiper.slideNext()}
        />
      </motion.div>
      <Swiper
        slidesPerView={slidesPerView}
        ref={swiperRef}
        spaceBetween={spaceBetween}
        className="mySwiper w-[90%] h-[80%] mx-auto"
      >
        {products &&
          products.length &&
          products.map((product) => (
            <SwiperSlide
              className="flex flex-col justify-center "
              key={product.id}
            >
              <div className="py-10 mx-auto flex flex-col justify-center  items-end">
                <ProductCard
                  product={product}
                  size={cardSize}
                  lineClamp={lineClamp}
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Slider;
