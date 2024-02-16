import Image from "next/image";

export default function Facility() {
  const listFacility = [
    {
      title: "Mini Soccer Court",
      description:
        "Selain ukuran yang berstandar nasional, lapangan Kami juga dilengkapi dengan rumput sintetis yang dapat meminimalisir cedera.",
      image: "/images/facility/facility-1.png"
    },
    {
      title: "Toilet",
      description:
        "Kebelet saat main? No worries! Kamu tinggal gunakan fasilitas Toilet di Soccer Chief!.",
      image: "/images/facility/facility-2.png"
    },
    {
      title: "Shower Room",
      description:
        "Setelah bermain Mini Soccer di lapangan Kami, tak perlu repot untuk mandi di rumah. Kami menyediakan Shower Room agar kamu segar kembali!.",
      image: "/images/facility/facility-1.png"
    },
    {
      title: "Mushola",
      description:
        "Kami menyediakan Musala untuk Kamu yang beribadah sebelum/sesudah bermain Mini Soccer..",
      image: "/images/facility/facility-1.png"
    }
  ];
  return (
    <section className="my-20 flex flex-col md:flex-row justify-between gap-x-20">
      <div className="flex flex-col w-full md:w-1/3">
        <div className="w-full h-64 relative">
          <Image
            src="/images/ornament-1.png"
            alt="Facility"
            fill
            objectFit="contain"
          />
        </div>
        <div className="font-bold text-6xl text-center">Fasilitas Soccer Chief </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  flex-1 gap-16 my-10 ">
        {listFacility.map((facility, index) => (
          <FacilityCard
            key={index}
            title={facility.title}
            description={facility.description}
            image={facility.image}
          />
        ))}
      </div>
    </section>
  );
}

function FacilityCard({
  title,
  description,
  image
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center text-center px-10">
      <div>
        <Image
          src={image}
          alt="Facility"
          width={50}
          height={50}
        />
      </div>
      <div className="font-bold ">{title}</div>
      <div className="font-medium text-sm leading-6">{description}</div>
    </div>
  );
}
