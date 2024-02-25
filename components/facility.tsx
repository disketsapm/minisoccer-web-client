import Image from 'next/image';

export default function Facility() {
  const listFacility = [
    {
      title: 'Mini Soccer Court',
      subTitle: '(31m x 45m)',
      description: 'Selain ukuran yang berstandar nasional, lapangan Kami juga dilengkapi dengan rumput sintetis yang dapat meminimalisir cedera.',
      image: '/images/facility/facility-1.png',
    },
    {
      title: 'Toilet',
      description: 'Kebelet saat main? <em>No worries!</em> Kamu tinggal gunakan fasilitas Toilet di Soccer Chief!',
      image: '/images/facility/facility-2.png',
    },
    {
      title: 'Shower Room',
      description:
        'Setelah bermain Mini Soccer di lapangan Kami, tak perlu repot untuk mandi di rumah. Kami menyediakan Shower Room agar kamu segar kembali!',
      image: '/images/facility/facility-3.png',
    },
    {
      title: 'Musala',
      description: 'Kami menyediakan Musala untuk Kamu yang beribadah sebelum/sesudah bermain Mini Soccer.',
      image: '/images/facility/facility-4.png',
    },
  ];
  return (
    <section
      id="facility"
      className="flex flex-col justify-between my-20 md:flex-row gap-x-20 "
    >
      <div className="flex flex-col w-full md:w-1/3">
        <div className="w-full h-[350px] relative">
          <Image
            src="/images/ornament-1.png"
            alt="Facility"
            fill
            objectFit="contain"
          />
        </div>
        <div className="text-6xl font-bold text-center">
          Fasilitas
          <br /> Soccer Chief{' '}
        </div>
      </div>
      <div className="grid flex-1 grid-cols-1 gap-16 my-10 md:grid-cols-2 ">
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
  );
}

function FacilityCard({ title, subTitle, description, image }: { title: string; subTitle?: string; description: string; image: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-center md:justify-start md:text-left md:items-start ">
      <div>
        <Image
          src={image}
          alt="Facility"
          width={50}
          height={50}
        />
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
