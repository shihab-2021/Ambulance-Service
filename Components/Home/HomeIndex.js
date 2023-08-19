import Banner from "./Banner";
import HowToBook from "./HowToBook/HowToBook";
import HowToUseSection from "./HowToUseSection";

const HomeIndex = () => {
  return (
    <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl xl:max-w-screen-xl 2xl:max-w-screen-2xl md:px-24 lg:px-8">
      <Banner />
      <HowToBook />
      <HowToUseSection />
    </div>
  );
};

export default HomeIndex;
