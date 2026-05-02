

export default function Cards({ data }) {


  return (
    <>
      <div className="flex flex-col  w-full   ">
        <div className=" h-50  lg:h-60  bg-radial from-[#c7c1B4] via-[#C4BEB0] to-[#9F9888] w-full">
          <img
            src={data.images[0] ? data.images[0] : data.images[1]}
            className="h-full  w-full"
          />
        </div>
        <div className="h-28 flex flex-col gap-0.5">
          <p className=" px-1 mt-2 text-sm text-gray-400">{`${data.tags[0] ? data.tags[0] : data.title} | ${data.tags[1] ? data.tags[1] : data.title}`}</p>
          <h1 className=" px-1  font-semibold text-sm text-gray-600 ">
            {data.title}
          </h1>

          <div className="flex justify-between  items-center mb-3">
            <p className=" px-1 text-[13px] text-gray-700 font-bold">
              PKR {data.price}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
