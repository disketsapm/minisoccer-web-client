import Image from "next/image";

export default function Facility() {
  const listFacility = [
    {
      title: "Mini Soccer Court",
      subTitle: "(31m x 45m)",
      description:
        "Selain ukuran yang berstandar nasional, <br />  lapangan Kami juga dilengkapi dengan rumput <br />  sintetis yang dapat meminimalisir cedera.",
      image: "/images/facility/facility-1.png",
    },
    {
      title: "Toilet",
      description:
        "Kebelet saat main? <em>No worries!</em> Kamu tinggal <br /> gunakan fasilitas Toilet di Soccer Chief!",
      image: "/images/facility/facility-2.png",
    },
    {
      title: "Shower Room",
      description:
        "Setelah bermain Mini Soccer di lapangan Kami, tak <br />  perlu repot untuk mandi di rumah. Kami menyediakan <br /> Shower Room agar kamu segar kembali!",
      image: "/images/facility/facility-3.png",
    },
    {
      title: "Musala",
      description:
        "Kami menyediakan Musala untuk Kamu <br /> yang beribadah sebelum/sesudah <br />  bermain Mini Soccer.",
      image: "/images/facility/facility-4.png",
    },
  ];
  return (
    <div className="w-full h-full radial-gradient-4 py-3 overflow-hidden z-10">
      <section
        id="facility"
        className="flex flex-col  items-center px-10 md:px-0  my-20 md:flex-row  container relative z-10"
      >
        <div className="md:absolute   w-fit   md:px-10 md:top-1/2 md:left-1/2 transform p-3 md:-translate-x-1/2 md:-translate-y-1/2 text-4xl font-black text-center bg-gradient-to-b   from-[#FFFFFF] to-[#FFFFFF00]  rounded-lg">
          Fasilitas Soccer Chief
        </div>

        <div className="w-full md:h-[550px] h-[900px]  absolute m-auto bottom-0 top-0   md:-bottom-[800px] left-0 right-0 -z-10">
          <Image
            src="/images/facility/ball.png"
            alt="Facility"
            fill
            objectFit="contain"
          />
        </div>

        <div className="grid flex-1 grid-cols-1 gap-5 md:gap-28 my-10 md:grid-cols-2 place-items-center  ">
          {listFacility.map((facility, index) => (
            <FacilityCard
              key={index}
              title={facility.title}
              description={facility.description}
              image={facility.image}
              subTitle={facility.subTitle}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function FacilityCard({
  title,
  subTitle,
  description,
  image,
}: {
  title: string;
  subTitle?: string;
  description: string;
  image: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-center   radial-gradient-3 md:w-[450px] md:h-[250px] w-full h-full  p-5 rounded-xl shadow-lg ">
      <div>
        <Image src={image} alt="Facility" priority width={70} height={70} />
      </div>
      <div className="font-bold ">{title}</div>
      {subTitle && <div className="text-xs font-light">{subTitle}</div>}
      <div
        className="text-sm font-medium leading-6"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}
