import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { usePastLaunchesListQuery } from "../../graphql/graphql";
import CompareModal from "../../components/CompareModal";

const Home: NextPage = () => {
  const limit = 9;
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const [filterBy, setFilterBy] = useState("mission_name");
  const [filterValue, setFilterValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const { data, fetchMore, loading, error } = usePastLaunchesListQuery({
    variables: {
      offset,
      limit,
      mission_name: filterBy === "mission_name" ? searchValue : "",
      rocket_name: filterBy === "rocket_name" ? searchValue : "",
    },
  });

  if (error && !loading) {
    return (
      <p className="font-generalsans text-base font-bold text-[#525C76]">
        {error?.message}
      </p>
    );
  }

  return (
    <>
      <Head>
        <title>SpaceX Metrics</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex min-h-screen max-w-6xl flex-col items-center p-4">
        <CompareModal open={open} setOpen={setOpen} data={selectedData} />

        <h1 className="mb-6 text-center font-generalsans text-[56px] font-extrabold leading-[64px] text-[#0F1D40] md:text-[56px]">
          SpaceX Metrics
        </h1>
        <p className="mb-8 text-center font-generalsans text-[20px] leading-[32px] text-[#525C76]">
          Find out the launch details and compare the stats
        </p>

        {loading ? (
          <p className="font-generalsans text-base font-bold text-[#525C76]">
            Loading...
          </p>
        ) : (
          <>
            <div className="mb-6 flex w-full justify-between gap-2">
              <button
                className="hover:shadow-button rounded-lg bg-[#6B53FF] py-3 px-4 text-sm font-bold text-white disabled:bg-[#EEEFF2] disabled:text-[#B2B7C2]"
                onClick={() => setOpen(!open)}
              >
                Compare
              </button>
            </div>
            <div className="mb-6 flex w-full justify-between gap-2">
              <div className="flex items-center gap-2">
                <p className="whitespace-nowrap font-generalsans text-base font-bold text-[#525C76]">
                  Search by:
                </p>
                <select
                  className="form-select m-0
      block
      appearance-none
      rounded
      border
      border-solid
      border-gray-300
      bg-white bg-clip-padding bg-no-repeat
      px-3 py-1.5 text-base
      font-normal
      text-gray-700
      transition
      ease-in-out
      focus:border-[#6B53FF] focus:bg-white focus:text-gray-700 focus:outline-none"
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                >
                  <option value="mission_name">Mission name</option>
                  <option value="rocket_name">Rocket name</option>
                </select>
                <input
                  type="text"
                  className="
        form-control
        m-0
        block
        w-full
        rounded
        border
        border-solid
        border-gray-300
        bg-white bg-clip-padding
        px-3 py-1.5 text-base
        font-normal
        text-gray-700
        transition
        ease-in-out
        focus:border-[#6B53FF] focus:bg-white focus:text-gray-700 focus:outline-none
      "
                  placeholder="e.g. Starlink"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                />
                <button
                  className="hover:shadow-button rounded-lg bg-[#6B53FF] py-3 px-4 text-sm font-bold text-white disabled:bg-[#EEEFF2] disabled:text-[#B2B7C2]"
                  onClick={async () => {
                    setSearchValue(filterValue);
                    setOffset(0);

                    // await fetchMore({
                    //   variables: {
                    //     offset,
                    //     limit,
                    //     mission_name:
                    //       filterBy === "mission_name" ? filterValue : "",
                    //     rocket_name:
                    //       filterBy === "rocket_name" ? filterValue : "",
                    //   },
                    // });
                  }}
                >
                  Search
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  className="hover:shadow-button rounded-lg bg-[#6B53FF] py-3 px-4 text-sm font-bold text-white disabled:bg-[#EEEFF2] disabled:text-[#B2B7C2]"
                  disabled={offset === 0}
                  onClick={async () => {
                    if (offset !== 0) {
                      setOffset(offset - 9);

                      await fetchMore({
                        variables: {
                          offset,
                          limit,
                        },
                      });
                    }
                  }}
                >
                  Previous
                </button>

                <button
                  className="hover:shadow-button rounded-lg bg-[#6B53FF] py-3 px-4 text-sm font-bold text-white disabled:bg-[#EEEFF2] disabled:text-[#B2B7C2]"
                  disabled={
                    (data?.launchesPast &&
                      data?.launchesPast?.length > 0 &&
                      data?.launchesPast?.length < 9) ||
                    false
                  }
                  onClick={async () => {
                    setOffset(offset + 9);
                    await fetchMore({
                      variables: {
                        offset,
                        limit,
                      },
                    });
                  }}
                >
                  Next
                </button>
              </div>
            </div>

            <div className="mb-2">
              (Click cards to add in compare modal and vice versa)
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2  md:grid-cols-3">
              {data?.launchesPast?.map((res, i) => (
                <div
                  className="flex cursor-pointer justify-center"
                  onClick={() => {
                    const findLaunch = selectedData?.findIndex(
                      (l) => l.id === res?.id
                    );

                    if (findLaunch === -1 && res?.id) {
                      selectedData.push(res);
                    } else {
                      selectedData.splice(findLaunch, 1);
                    }
                    setSelectedData([...selectedData]);
                  }}
                  key={i}
                >
                  <div
                    className={`block max-w-sm rounded-lg bg-white text-center shadow-lg`}
                  >
                    {res?.links?.flickr_images?.[0] ? (
                      <div
                        className="h-48 border-b border-gray-300 py-3 px-6"
                        style={{
                          backgroundImage: `url(${res?.links?.flickr_images[0]})`,
                          backgroundSize: "cover",
                        }}
                      />
                    ) : (
                      <div className="h-48 border-b border-gray-300 py-3 px-6">
                        No Image Found!
                      </div>
                    )}
                    <div className="p-6">
                      <h6 className="text-md mb-2 font-medium text-gray-900">
                        {selectedData?.find((l) => l.id === res?.id) &&
                          " (Added to Compare)"}
                      </h6>

                      <h5 className="mb-2 text-xl font-medium text-gray-900">
                        {res?.mission_name}
                      </h5>
                      <p className="mb-1 text-base text-gray-700">
                        Rocket Name: {res?.rocket?.rocket_name}
                      </p>

                      <p className="mb-2 text-base text-gray-700">
                        Rocket Type: {res?.rocket?.rocket_type}
                      </p>

                      <p className="mb-2 text-base text-gray-700">
                        Launch Site: {res?.launch_site?.site_name_long}
                      </p>
                    </div>
                    <div className="border-t border-gray-300 py-3 px-6 text-gray-600">
                      {`${new Date(res?.launch_date_utc)}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Home;
