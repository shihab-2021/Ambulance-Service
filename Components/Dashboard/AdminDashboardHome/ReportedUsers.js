import Link from "next/link";
import React from "react";

const ReportedUsers = ({ reportedUsers }) => {
  return (
    <>
      <div className=" bg-[#36393e52] shadow-lg rounded-lg p-4 sm:p-6 xl:p-8 ">
        <h3 className="text-xl leading-none font-bold text-white mb-10">
          Reported Users
        </h3>
        <div className="block w-full h-[17rem] overflow-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-4 bg-[#36393e72] text-gray-50 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                  Reported To
                </th>
                <th className="px-4 bg-[#36393e72] text-gray-50 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                  Reported By
                </th>
                <th className="px-4 bg-[#36393e72] text-gray-50 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px">
                  Reason
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reportedUsers?.map((report, i) => (
                <tr key={report?._id} className="text-gray-50">
                  <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                    <Link href={`/dashboard/reported/${report?._id}`}>
                      <p className="hover:underline text-white">
                        {report?.reportedTo?.displayName}
                      </p>
                    </Link>
                  </th>
                  <td className="border-t-0 px-4 align-middle text-xs lg:text-base font-medium text-gray-90 whitespace-nowrap p-4">
                    {report?.reportedBy?.displayName}
                  </td>
                  <td className="border-t-0 px-4 align-middle text-xs lg:text-base whitespace-nowrap p-4">
                    {report?.reportReason}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ReportedUsers;
