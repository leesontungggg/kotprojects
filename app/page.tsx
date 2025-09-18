import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen w-screen">
      <section className="h-screen w-full bg-black">
        <div className="container mx-auto w-full h-full flex-col justify-between items-center md:items-start py-8 md:py-40">
          <Image
            src="/2.svg"
            alt="KOT Projects Logo"
            width={400}
            height={100}
            className="mb-4 md:mb-16"
          />
          <h1 className="text-4xl text-center md:text-left md:text-8xl font-bold text-white font-grotesk transition-transform duration-300 ease-in-out transform hover:scale-105">
            Ready to bring your
            <br />
            vision to life?
          </h1>
        </div>
      </section>
      <section className="h-fit md:h-screen w-full bg-[#3c55ff]">
        <div className="container mx-auto w-full h-full flex justify-start items-start md:items-end py-16 md:py-40">
          <div className="w-full md:w-3/5 ml-auto flex flex-col items-center text-center">
            <Image
              src="/3.svg"
              alt="KOT Projects Logo"
              width={100}
              height={100}
              className="mb-8"
            />
            <h2 className="text-3xl md:text-6xl font-bold text-[#99d9d9] font-grotesk mb-8">
              Transforming creativity into reality.
            </h2>
            <p className="text-2xl text-[#99d9d9] mb-8 font-anonymous font-bold">
              KOT Projects is a private label and merchandising studio that
              helps creators, brands, and businesses bring ideas to life through
              custom products and full-service support. We provide creative
              development, manufacturing, packaging, logistics, e-commerce, and
              marketing within one unified system.
            </p>
          </div>
        </div>
      </section>
      <section className="h-screen w-full bg-white">
        <div className="container mx-auto w-full h-full flex flex-col justify-start items-center md:items-start py-40">
          <h1 className="text-4xl md:text-8xl font-bold text-black font-grotesk uppercase">
            Got Questions?
            <br />
            Wanna start?
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-center w-full mt-auto gap-8 md:gap-0 px-4 md:px-0">
            <div className="bg-[#3c55ff] text-white px-8 py-4 rounded-[34px] mt-16 font-anonymous font-bold uppercase text-[18px]">
              <p>
                our website is currently under construction but...
                <br />
                feel to REACH OUT TO US at
              </p>
              <br />
              <a href="mailto:kenny@kotprojects.com">
                NORTH AMERICA: kenny@kotprojects.com
              </a>
              <br />

              <a href="mailto:dong@kotprojects.com">
                ASIA: dong@kotprojects.com
              </a>
            </div>
            <div className="flex space-x-4 mt-auto">
              <a href="https://www.facebook.com/kotprojects">
                <Facebook color="black" />
              </a>
              <a href="https://www.instagram.com/kotprojects">
                <Instagram color="black" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
