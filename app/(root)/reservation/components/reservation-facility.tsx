import React from "react";

type ReservationFacilityProps = {
  data: {
    iconId: string;
    name: string;
    _id: string;
  }[];
  description: string;
  embededMap: string;
};

const DATA_FACILITY_IMAGE = {
  "1": "/images/facility/facility-1.png",
  "2": "/images/facility/facility-2.png",
  "3": "/images/facility/facility-4.png",
  "4": "/images/facility/facility-3.png",
};

const ReservationFacility: React.FC<ReservationFacilityProps> = ({
  data,
  description,
  embededMap,
}) => {
  const FacilityItem = ({
    label,
    iconId,
  }: {
    label: string;
    iconId: keyof typeof DATA_FACILITY_IMAGE;
  }) => {
    const getImage = DATA_FACILITY_IMAGE[iconId];

    return (
      <div className="md:w-[65px] md:h-[65px] w-[50px] h-[50px] ">
        <div className="w-[fit-content] h-[fit-content] flex flex-col justify-center items-center gap-1">
          <img className="w-10 h-10 bg-gray-200 rounded-lg" src={getImage} />

          <div className="text-center text-xs font-semibold">{label}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full md:h-[450px] h-[650px] gap-5 flex flex-col md:flex-row py-10 md:py-0">
      <div className="w-full h-full radial-gradient-3 rounded-xl p-8">
        <p className="font-black text-2xl">Deskripsi</p>
        <div className="w-full h-full overflow-y-auto py-2 ">
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>
      </div>

      <div className="md:w-1/2 w-full flex flex-col gap-5">
        <iframe
          className="w-full h-full rounded-xl"
          src={embededMap}
          width="1030"
          height="700"
        ></iframe>

        <div className="flex flex-col gap-4">
          <p className="text-2xl font-black">Fasilitas</p>

          <div className="w-full flex gap-2 flex-wrap">
            {data?.map((item) => {
              return (
                <FacilityItem
                  key={item._id}
                  iconId={item?.iconId as keyof typeof DATA_FACILITY_IMAGE}
                  label={item.name}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationFacility;
