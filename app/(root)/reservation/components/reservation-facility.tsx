import React from "react";

type ReservationFacilityProps = {
  data: {
    iconId: string;
    name: string;
    _id: string;
  }[];
};

const ReservationFacility: React.FC<ReservationFacilityProps> = ({ data }) => {
  const FacilityItem = ({ label }: { label: string }) => {
    return (
      <div className="w-[50px] h-[50px]">
        <div className="w-[fit-content] h-[fit-content] flex flex-col justify-center items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-lg" />

          <div className="text-center text-xs">{label}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex-col gap-5 flex">
      <div className="w-full h-[fit-content] px-2 rounded-lg font-semibold text-md text-center bg-[#FC3433] border-2 border-black text-white">
        Fasilitas
      </div>

      <div className="w-full flex justify-center gap-4">
        {data?.map((item) => (
          <FacilityItem label={item?.name} />
        ))}
      </div>
    </div>
  );
};

export default ReservationFacility;
