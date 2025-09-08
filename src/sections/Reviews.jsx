import rev from "../assets/images/review.png";
import MixedTitle from "../components/MixedTitle";

const Reviews = ({ id, content }) => {
  return (
    <div className="flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44">
    <div
      className="py-8 sm:py-12 md:py-16 flex flex-col xl:flex-row items-start justify-between w-full max-w-[1400px] bg-white gap-8 xl:gap-12"
      id={id}
    >
      {/* Left Section */}
      <div className="flex flex-col items-start justify-start gap-3 sm:gap-4 w-full xl:w-auto xl:max-w-[400px]">
        <MixedTitle 
          text={content?.revTitle} 
          stil={"text-brand-color text-[45px] sm:text-[48px] md:text-[51px] lg:text-[54px] xl:text-[57px] 2xl:text-[60px] font-semibold max-w-full xl:max-w-[300px] leading-tight"} 
        />
        <p className="text-light-text text-base sm:text-lg md:text-xl lg:text-2xl max-w-full xl:max-w-[400px] leading-7 sm:leading-8 md:leading-9 tracking-wide">
          {content?.revSubtitle}
        </p>
        <p className="text-light-text text-sm sm:text-base md:text-lg max-w-full xl:max-w-[400px] leading-7 sm:leading-8 md:leading-9 tracking-wide">
          {content?.revNumOfUsers}
        </p>
        <img src={rev} className="w-auto h-auto max-w-[200px] sm:max-w-[250px] md:max-w-full" alt="Reviews" />
        <p className="text-light-text text-xs sm:text-sm max-w-full xl:max-w-[400px] leading-6 sm:leading-7 md:leading-9 tracking-wide -mt-2 sm:-mt-3 md:-mt-4">
          Based on 146 reviews
        </p>
      </div>

      <div className="flex items-end justify-center">
      {/* Right Section - Reviews Grid */}
      <div className="flex flex-col items-center xl:items-end justify-start gap-4 sm:gap-6 md:gap-8 w-full xl:flex-1">
        {/* First Row - Two Reviews */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 items-stretch justify-center xl:justify-between w-full">
          <div className="bg-card-bg rounded-[15px] sm:rounded-[20px] w-full sm:w-[calc(50%-16px)] lg:w-[320px] xl:w-[380px] 2xl:w-[438px] h-[200px] sm:h-[220px] md:h-[250px] lg:h-[280px] xl:h-[299px] p-4 sm:p-6 md:p-8 flex flex-col items-start justify-between">
            <p className="text-light-text font-bold text-md sm:text-base md:text-lg lg:text-xl leading-relaxed">
              {content?.reviewZone[0]?.reviewText}
            </p>
            <div className="flex flex-col mt-auto">
              <p className="text-light-text font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                {content?.reviewZone[0]?.name}
              </p>
              <p className="text-light-text font-normal text-xs sm:text-sm md:text-base tracking-wide">
                {content?.reviewZone[0]?.position}
              </p>
            </div>
          </div>
          
          <div className="bg-card-bg rounded-[15px] sm:rounded-[20px] w-full sm:w-[calc(50%-16px)] lg:w-[320px] xl:w-[380px] 2xl:w-[438px] h-[200px] sm:h-[220px] md:h-[250px] lg:h-[280px] xl:h-[299px] p-4 sm:p-6 md:p-8 flex flex-col items-start justify-between">
            <p className="text-light-text font-bold text-md sm:text-base md:text-lg lg:text-xl leading-relaxed">
              {content?.reviewZone[1]?.reviewText}
            </p>
            <div className="flex flex-col mt-auto">
              <p className="text-light-text font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                {content?.reviewZone[1]?.name}
              </p>
              <p className="text-light-text font-normal text-xs sm:text-sm md:text-base tracking-wide">
                {content?.reviewZone[1]?.position}
              </p>
            </div>
          </div>
        </div>

        {/* Second Row - One Review (Centered) */}
        <div className="flex justify-center xl:justify-start w-full">
          <div className="bg-card-bg rounded-[15px] sm:rounded-[20px] w-full sm:w-[calc(50%-16px)] lg:w-[320px] xl:w-[380px] 2xl:w-[438px] h-[200px] sm:h-[220px] md:h-[250px] lg:h-[280px] xl:h-[299px] p-4 sm:p-6 md:p-8 flex flex-col items-start justify-between">
            <p className="text-light-text font-bold text-md sm:text-base md:text-lg lg:text-xl leading-relaxed">
              {content?.reviewZone[2]?.reviewText}
            </p>
            <div className="flex flex-col mt-auto">
              <p className="text-light-text font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                {content?.reviewZone[2]?.name}
              </p>
              <p className="text-light-text font-normal text-xs sm:text-sm md:text-base tracking-wide">
                {content?.reviewZone[2]?.position}
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    </div>
  );
};

export default Reviews;