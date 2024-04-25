import React from "react";

type ReservationFacilityProps = {
  data: {
    iconId: string;
    name: string;
    _id: string;
  }[];
};

const DATA_FACILITY_IMAGE = {
  "1": "/images/facility/facility-1.png",
  "2": "/images/facility/facility-2.png",
  "3": "/images/facility/facility-4.png",
  "4": "/images/facility/facility-3.png",
};

const ReservationFacility: React.FC<ReservationFacilityProps> = ({ data }) => {
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
      <div className="w-full h-full radial-gradient-3 rounded-xl p-3">
        <p className="font-black text-2xl">Deskripsi</p>
      </div>

      <div className="md:w-1/2 w-full flex flex-col gap-5">
        <iframe
          className="w-full h-full rounded-xl"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.938525379262!2d106.76214517453191!3d-6.271814661395947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f0526938c0bf%3A0x945ab245061f8415!2sJl.%20RC.%20Veteran%20Raya%20No.1%2C%20RT.9%2FRW.3%2C%20Bintaro%2C%20Kec.%20Pesanggrahan%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2012330!5e0!3m2!1sid!2sid!4v1707502591058!5m2!1sid!2sid"
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
