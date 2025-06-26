import Image from "next/image";

const GoalsSection = () => {
  return (
    <section className="my-12 min-h-screen scroll-mt-28" id="goals">

      <h1 className="text-primary text-center font-semibold text-[40px] mb-10">Mục Tiêu</h1>

      <div className="overflow-hidden relative">
        <div
          className="bg-[url('/images/bbmd3.jpeg')] bg-cover bg-center blur-xs absolute inset-0 bg-blend-multiply bg-black/50"
          aria-hidden="true"
        ></div>

        <div className="relative z-10 p-10 text-white">
          <div className="flex flex-col md:flex-row items-center justify-around">
            <div className="relative rounded-2xl shadow-2xl overflow-hidden w-[250px] h-[150px] md:w-[350px] md:h-[250px] md:mr-10 mb-5 md:mb-0">
              <Image src="/images/bbmd3.jpeg" alt="goal1" fill objectFit="cover" />
            </div>

            <p className="md:max-w-[600px] md:w-1/2 text-sm md:text-[16px] leading-7">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>

      </div>

      <div className="overflow-hidden relative">
        <div
          className="bg-[url('/images/bbmd4.jpeg')] bg-cover bg-center blur-xs absolute inset-0 bg-blend-multiply bg-black/50"
          aria-hidden="true"
        ></div>

        <div className="relative z-10 p-10 text-white">
          <div className="flex flex-col md:flex-row items-center justify-around">
            <p className="md:max-w-[600px] md:w-1/2 text-sm md:text-[16px] leading-7 order-2 md:order-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <div className="relative rounded-2xl shadow-2xl overflow-hidden w-[250px] h-[150px] md:w-[350px] md:h-[250px] md:ml-10 mb-5 md:mb-0 order-1 md:order-2">
              <Image src="/images/bbmd4.jpeg" alt="goal1" fill objectFit="cover" />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default GoalsSection;
