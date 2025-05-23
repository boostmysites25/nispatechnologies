import { allServices } from "../../constant";
import { PiCaretDoubleRightBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import { useKeenSlider } from "keen-slider/react";

const OurServices = ({ length }) => {
  const services = allServices;

  const [sliderRefone, instanceRef] = useKeenSlider(
    {
      loop: true,
      slides: {
        perView: 3,
        spacing: 1,
      },
      mode: "free",
      breakpoints: {
        "(max-width: 1024px)": {
          slides: {
            perView: 2, // Show 2 slides for screens below lg
            spacing: 10, // Adjust spacing for better layout
          },
        },
        "(max-width: 768px)": {
          slides: {
            perView: 1, // Show 1 slide for screens below md
            spacing: 5, // Adjust spacing for compact layout
          },
        },
      },
      animation: {
        duration: 1500,
        easing: (t) => t,
      },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  // Button click handler
  const handleNextClick = () => {
    if (instanceRef.current) {
      instanceRef.current.next(); // Move to the next slide
    } else {
      console.warn("Slider instance is not available.");
    }
  };

  const handlePrevClick = () => {
    if (instanceRef.current) {
      instanceRef.current.prev(); // Move to the prev slide
    } else {
      console.log(instanceRef.current, "sdakfjaslkdfjlaksdjf");
      console.warn("Slider instance is not available.");
    }
  };
  return (
    <div className="py-[2rem] sm:py-[5rem] bg-backgroundcolor text-primarytextcolor">
      <div
        data-aos="fade-up"
        className="wrapper flex flex-col text-center gap-5 items-center"
      >
        <div data-aos="fade-up" className="gradient-rounded-text-box mb-2">
          Our Services
        </div>
        <h2 data-aos="fade-up" className="heading-2 max-w-[50rem]">
          We Build Technology That Works for You
        </h2>
        <p data-aos="fade-up" className="desc max-w-[50rem]">
          At NispaTechnologies, we don't create digital solutions–we fix issues.
          We're committed to making businesses succeed in an interconnected,
          competitive marketplace by designing bespoke software, smart systems,
          and future-proof platforms. Our experts combine technical expertise
          with real-world expertise, so you receive solutions that are
          pragmatic, scalable, and designed to deliver.
        </p>
        <div
          data-aos="fade-up"
          ref={sliderRefone}
          className="keen-slider grid sm:grid-cols-2 md:grid-cols-3   mt-3"
        >
          {services.map((service) => (
            <div className="keen-slider__slide  p-4 h-full ">
              <Link
                to={service.link}
                key={service.id}
                className=" rounded-lg p-[1px]  cursor-pointer h-full "
              >
                <div className="group hover:scale-105 h-full   rounded-lg bg-backgro-gradient transition-all  duration-500 relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full absolute opacity-25 top-0 left-0 h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 transition-opacity duration-300"></div>
                  <div className="relative z-[1] rounded-lg min-h-[31rem] sm:min-h-[23.25rem] hover:bg-custom-gradient p-5 flex flex-col justify-between items-start text-start h-full gap-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white  transition-colors duration-300">
                          {/* <BiBrain className="w-6 h-6" /> */}
                          {service.img}
                        </div>
                      </div>
                      <h5 className="font-semibold text-white text-xl font-raleway">
                        {service.title}
                      </h5>
                      <p className="desc text-white">
                        {service.desc}
                      </p>
                    </div>
                    <button className="font-inter mt-1 flex items-center gap-3 text-orange-500  hover:text-primary  transition-all duration-300 underline underline-offset-4">
                      Learn More <PiCaretDoubleRightBold />
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div
          // data-aos="fade-up"
          className="flex justify-center items-center gap-10 mt-2"
        >
          <button
            className="text-primary text-5xl hover:text-primary/70 transition-all duration-200"
            onClick={handlePrevClick}
            aria-label="Previous slide"
          >
            <IoArrowBackCircleOutline />
          </button>
          <button
            className="text-primary text-5xl hover:text-primary/70 transition-all duration-200"
            onClick={handleNextClick}
            aria-label="Next slide"
          >
            <IoArrowForwardCircleOutline />
          </button>
        </div>
        {length && (
          <Link to="/services" className="primary-btn mt-6">
            All Services
          </Link>
        )}
      </div>
    </div>
  );
};

export default OurServices;
