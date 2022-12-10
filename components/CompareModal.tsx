import { useEffect, useState } from "react";

interface CompareModalI {
  open: boolean;
  setOpen: (state: boolean) => void;
  data: any;
}

const CompareModal = ({ open, setOpen, data }: CompareModalI) => {
  console.log("## data-", data);
  return open ? (
    <div className="fixed h-screen w-screen">
      <div className="max-w-fullxl m-auto max-h-screen w-full overflow-y-auto overflow-x-hidden rounded-lg bg-slate-200 p-4 shadow">
        <div className="flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white lg:text-2xl">
            Compare Launches
          </h3>
          <button
            type="button"
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => setOpen(false)}
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        {data?.length > 0 ? (
          <table className="table-auto">
            <thead className="border-b bg-gray-50">
              <tr>
                <th
                  align="left"
                  className="px-2 py-2 text-sm font-medium text-gray-900"
                >
                  Mission Name
                </th>
                <th
                  align="left"
                  className="px-2 py-2 text-sm font-medium text-gray-900"
                >
                  Rocket Name
                </th>
                <th
                  align="left"
                  className="px-2 py-2 text-sm font-medium text-gray-900"
                >
                  Rocket Type
                </th>
                <th
                  align="left"
                  className="px-2 py-2 text-sm font-medium text-gray-900"
                >
                  Launch Site
                </th>
                <th
                  align="left"
                  className="px-2 py-2 text-sm font-medium text-gray-900"
                >
                  Launch Date
                </th>
                <th
                  align="left"
                  className="px-2 py-2 text-sm font-medium text-gray-900"
                >
                  Ships
                </th>
                <th
                  align="left"
                  className="px-2 py-2 text-sm font-medium text-gray-900"
                >
                  Wikipedia
                </th>
                <th
                  align="left"
                  className="px-2 py-2 text-sm font-medium text-gray-900"
                >
                  Mission Patch Small
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map(
                (
                  res: {
                    mission_name: string;
                    launch_date_utc: string;
                    rocket: {
                      rocket_name: string;
                      rocket_type: string;
                    };
                    launch_site: {
                      site_name_long: string;
                    };
                    ships: {
                      name: string;
                      home_port: string;
                      image: string;
                    }[];
                    links: {
                      mission_patch_small: string;
                      wikipedia: string;
                    };
                  },
                  i: number
                ) => (
                  <tr key={i} className="border-b bg-white">
                    <td className="px-2 py-2 text-sm font-medium text-gray-900">
                      {res?.mission_name}
                    </td>
                    <td className="px-2 py-2 text-sm font-medium text-gray-900">
                      {res?.rocket?.rocket_name}
                    </td>
                    <td className="px-2 py-2 text-sm font-medium text-gray-900">
                      {res?.rocket?.rocket_type}
                    </td>
                    <td className="px-2 py-2 text-sm font-medium text-gray-900">
                      {res?.launch_site?.site_name_long}
                    </td>
                    <td className="px-2 py-2 text-sm font-medium text-gray-900">
                      {`${new Date(res?.launch_date_utc).toLocaleDateString()}`}
                    </td>
                    <td className="text-sm font-medium text-gray-900">
                      {res?.ships?.map((ship, j) => (
                        <div className="border-b px-2 py-2 text-sm font-medium text-gray-900">
                          <div key={j}>Name: {ship?.name}</div>
                          <div key={j}>Home Port: {ship?.home_port}</div>
                          <div key={j}>Image: {ship?.image}</div>
                        </div>
                      ))}
                    </td>

                    <td className="px-2 py-2 text-sm font-medium text-gray-900">
                      <a href={res?.links?.wikipedia}>
                        {res?.links?.wikipedia}
                      </a>
                    </td>

                    <td
                      className={`px-2 py-2 text-sm font-medium text-gray-900`}
                    >
                      <a href={res?.links?.mission_patch_small}>
                        {res?.links?.mission_patch_small}
                      </a>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        ) : (
          <p className="font-generalsans text-base font-bold text-[#525C76]">
            No Launch Selected!
          </p>
        )}
      </div>
    </div>
  ) : null;
};

export default CompareModal;
