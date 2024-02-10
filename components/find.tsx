export default function Find() {
  return (
    <div
      className="flex justify-between h-[400px] bg-[#FCCB04] w-full border mt-20 border-black rounded-3xl p-14 bg- gap-5"
      // style={{
      //   backgroundImage: 'url("/images/bg-find.png")',
      //   backgroundSize: "cover",
      //   backgroundPosition: "center"
      // }}
    >
      <div className=" h-full w-1/2 rounded-3xl overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.938525379262!2d106.76214517453191!3d-6.271814661395947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f0526938c0bf%3A0x945ab245061f8415!2sJl.%20RC.%20Veteran%20Raya%20No.1%2C%20RT.9%2FRW.3%2C%20Bintaro%2C%20Kec.%20Pesanggrahan%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2012330!5e0!3m2!1sid!2sid!4v1707502591058!5m2!1sid!2sid"
          width="630"
          height="300"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>
      <div className="flex flex-col w-1/2  py-10 gap-5">
        <div className="text-4xl font-bold">Temukan Kami</div>
        <div>Jl. RC Veteran No. 1, Kebayoran Lama, Jakarta Selatan</div>
        <div className="grid grid-cols-2 gap-2">
          <p>aaa@gmail.com</p>
          <p>aaa@gmail.com</p>
          <p>aaa@gmail.com</p>
          <p>aaa@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
