import { PiPushPin } from "react-icons/pi";
import { GoMail } from "react-icons/go";
import { FiInstagram } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function Find() {
  return (
    <div className="flex flex-col md:flex-row justify-between  md:h-[400px] bg-[#FCCB04] w-full border mt-20 border-black md:rounded-3xl py-10 px-2  md:p-14   gap-5 mb-10">
      <div className=" h-full w-full md:w-1/2 md:rounded-3xl overflow-hidden">
        <iframe
          className="w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.938525379262!2d106.76214517453191!3d-6.271814661395947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f0526938c0bf%3A0x945ab245061f8415!2sJl.%20RC.%20Veteran%20Raya%20No.1%2C%20RT.9%2FRW.3%2C%20Bintaro%2C%20Kec.%20Pesanggrahan%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2012330!5e0!3m2!1sid!2sid!4v1707502591058!5m2!1sid!2sid"
          width="1030"
          height="700"
        ></iframe>
      </div>
      <div className="flex flex-col w-full justify-center md:w-1/2 md:py-10 px-5 gap-5">
        <div className="text-4xl font-bold text-center">Temukan Kami</div>
        <div className="grid grid-cols-1  gap-4 text-2xl w-full">
          <div className="flex items-start">
            <PiPushPin className="w-8 h-8 mr-2 flex-shrink-0" />
            <div>Jl. RC Veteran No. 1, Kebayoran Lama, Jakarta Selatan</div>
          </div>
          <div className="flex items-start">
            <GoMail className="w-8 h-8 mr-2" /> info@soccerchief.co
          </div>
          <div className="flex items-start">
            <FiInstagram className="w-8 h-8 mr-2" /> @soccerchief.co
          </div>
          <div className="flex items-start">
            <FaWhatsapp className="w-8 h-8 mr-2" /> 080000000000
          </div>
        </div>
      </div>
    </div>
  );
}
