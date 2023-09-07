import React, { useEffect, useState } from "react";
import useAuth from "../../Context/useAuth";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const AddDoctorIndex = () => {
  const { userInfo } = useAuth();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const hospitalNames = [
    "Apollo Hospitals Dhaka",
    "Square Hospitals Ltd.",
    "Ibn Sina Hospital",
    "United Hospital Ltd.",
    "Labaid Hospital",
  ];

  const dissesType = [
    "Cardiology",
    "Orthopedics",
    "Gastroenterology",
    "Neurology",
    "ENT (Ear, Nose, and Throat)",
  ];

  const doctorsNameList = [
    {
      doctorName: "Dr. Farah Rahman",
      expertiseIn: "Cardiology",
      hospital: "Apollo Hospitals Dhaka",
      contact: "01847393054",
      description:
        "Dr. Farah Rahman is a dedicated and compassionate cardiologist with over 15 years of experience in treating patients with heart-related conditions. Her commitment to providing high-quality care and her exceptional diagnostic skills have earned her the respect of both patients and colleagues.",
    },
    {
      doctorName: "Dr. Ahsan Ahmed",
      expertiseIn: "Orthopedics",
      hospital: "Square Hospitals Ltd.",
      contact: "01984837582",
      description:
        "Dr. Ahsan Ahmed is a dedicated and compassionate cardiologist with over 15 years of experience in treating patients with heart-related conditions. Her commitment to providing high-quality care and her exceptional diagnostic skills have earned her the respect of both patients and colleagues.",
    },
    {
      doctorName: "Dr. Saba Khan",
      expertiseIn: "Gastroenterology",
      hospital: "Ibn Sina Hospital",
      contact: "01749583748",
      description:
        "Dr. Saba Khan is a dedicated and compassionate cardiologist with over 15 years of experience in treating patients with heart-related conditions. Her commitment to providing high-quality care and her exceptional diagnostic skills have earned her the respect of both patients and colleagues.",
    },
    {
      doctorName: "Dr. Iqbal Hussain",
      expertiseIn: "Neurology",
      hospital: "United Hospital Ltd.",
      contact: "01639485942",
      description:
        "Dr. Iqbal Hussain is a dedicated and compassionate cardiologist with over 15 years of experience in treating patients with heart-related conditions. Her commitment to providing high-quality care and her exceptional diagnostic skills have earned her the respect of both patients and colleagues.",
    },
    {
      doctorName: "Dr. Nusrat Islam",
      expertiseIn: "ENT (Ear, Nose, and Throat)",
      hospital: "Labaid Hospital",
      contact: "01385948593",
      description:
        "Dr. Nusrat Islam is a dedicated and compassionate cardiologist with over 15 years of experience in treating patients with heart-related conditions. Her commitment to providing high-quality care and her exceptional diagnostic skills have earned her the respect of both patients and colleagues.",
    },
    {
      doctorName: "Dr. Akram Khan",
      expertiseIn: "Cardiology",
      hospital: "Apollo Hospitals Dhaka",
      contact: "01948578395",
      description:
        "Dr. Akram Khan is a dedicated and compassionate cardiologist with over 15 years of experience in treating patients with heart-related conditions. Her commitment to providing high-quality care and her exceptional diagnostic skills have earned her the respect of both patients and colleagues.",
    },
    {
      doctorName: "Dr. Maya Rahman",
      expertiseIn: "Orthopedics",
      hospital: "Square Hospitals Ltd.",
      contact: "01348539483993",
      description:
        "Dr. Maya Rahman is a dedicated and compassionate cardiologist with over 15 years of experience in treating patients with heart-related conditions. Her commitment to providing high-quality care and her exceptional diagnostic skills have earned her the respect of both patients and colleagues.",
    },
    {
      doctorName: "Dr. Zahir Ali",
      expertiseIn: "Gastroenterology",
      hospital: "Ibn Sina Hospital",
      contact: "01812398492",
      description:
        "Dr. Zahir Ali is a dedicated and compassionate cardiologist with over 15 years of experience in treating patients with heart-related conditions. Her commitment to providing high-quality care and her exceptional diagnostic skills have earned her the respect of both patients and colleagues.",
    },
    {
      doctorName: "Dr. Fatima Chowdhury",
      expertiseIn: "Neurology",
      hospital: "United Hospital Ltd.",
      contact: "01847393054",
      description:
        "Dr. Fatima Chowdhury is a dedicated and compassionate cardiologist with over 15 years of experience in treating patients with heart-related conditions. Her commitment to providing high-quality care and her exceptional diagnostic skills have earned her the respect of both patients and colleagues.",
    },
    {
      doctorName: "Dr. Rafiqul Haque",
      expertiseIn: "ENT (Ear, Nose, and Throat)",
      hospital: "Labaid Hospital",
      contact: "01984837582",
      description:
        "Dr. Rafiqul Haque is a dedicated and compassionate cardiologist with over 15 years of experience in treating patients with heart-related conditions. Her commitment to providing high-quality care and her exceptional diagnostic skills have earned her the respect of both patients and colleagues.",
    },
    {
      doctorName: "Dr. Tahmina Akhter",
      expertiseIn: "Cardiology",
      hospital: "Apollo Hospitals Dhaka",
      contact: "01749583748",
      description:
        "Dr. Tahmina Akhter is a dedicated and compassionate cardiologist with over 15 years of experience in treating patients with heart-related conditions. Her commitment to providing high-quality care and her exceptional diagnostic skills have earned her the respect of both patients and colleagues.",
    },
    {
      doctorName: "Dr. Sameer Khan",
      expertiseIn: "Orthopedics",
      hospital: "Square Hospitals Ltd.",
      contact: "01639485942",
      description:
        "Dr. Sameer Khan is a dedicated and compassionate cardiologist with over 15 years of experience in treating patients with heart-related conditions. Her commitment to providing high-quality care and her exceptional diagnostic skills have earned her the respect of both patients and colleagues.",
    },
    {
      doctorName: "Dr. Nadia Ahmed",
      expertiseIn: "Gastroenterology",
      hospital: "Ibn Sina Hospital",
      contact: "01385948593",
      description:
        "Dr. Nadia Ahmed is a dedicated and compassionate cardiologist with over 15 years of experience in treating patients with heart-related conditions. Her commitment to providing high-quality care and her exceptional diagnostic skills have earned her the respect of both patients and colleagues.",
    },
    {
      doctorName: "Dr. Anwar Rahman",
      expertiseIn: "Neurology",
      hospital: "United Hospital Ltd.",
      contact: "01948578395",
      description:
        "Dr. Anwar Rahman is a dedicated and compassionate cardiologist with over 15 years of experience in treating patients with heart-related conditions. Her commitment to providing high-quality care and her exceptional diagnostic skills have earned her the respect of both patients and colleagues.",
    },
    {
      doctorName: "Dr. Naima Khan",
      expertiseIn: "ENT (Ear, Nose, and Throat)",
      hospital: "Labaid Hospital",
      contact: "01348539483993",
      description:
        "Dr. Naima Khan is a dedicated and compassionate cardiologist with over 15 years of experience in treating patients with heart-related conditions. Her commitment to providing high-quality care and her exceptional diagnostic skills have earned her the respect of both patients and colleagues.",
    },
    {
      doctorName: "Dr. Kamal Hasan",
      expertiseIn: "Cardiology",
      hospital: "Apollo Hospitals Dhaka",
      contact: "01812398492",
      description:
        "Dr. Kamal Hasan is a dedicated and compassionate cardiologist with over 15 years of experience in treating patients with heart-related conditions. Her commitment to providing high-quality care and her exceptional diagnostic skills have earned her the respect of both patients and colleagues.",
    },
    {
      doctorName: "Dr. Meera Choudhury",
      expertiseIn: "Orthopedics",
      hospital: "Square Hospitals Ltd.",
      contact: "01385948593",
      description:
        "Dr. Meera Choudhury is a dedicated and compassionate cardiologist with over 15 years of experience in treating patients with heart-related conditions. Her commitment to providing high-quality care and her exceptional diagnostic skills have earned her the respect of both patients and colleagues.",
    },
    {
      doctorName: "Dr. Salman Malik",
      expertiseIn: "Gastroenterology",
      hospital: "Ibn Sina Hospital",
      contact: "01948578395",
      description:
        "Dr. Salman Malik is a dedicated and compassionate cardiologist with over 15 years of experience in treating patients with heart-related conditions. Her commitment to providing high-quality care and her exceptional diagnostic skills have earned her the respect of both patients and colleagues.",
    },
    {
      doctorName: "Dr. Nusrat Chowdhury",
      expertiseIn: "Neurology",
      hospital: "United Hospital Ltd.",
      contact: "01348539483993",
      description:
        "Dr. Nusrat Chowdhury is a dedicated and compassionate cardiologist with over 15 years of experience in treating patients with heart-related conditions. Her commitment to providing high-quality care and her exceptional diagnostic skills have earned her the respect of both patients and colleagues.",
    },
    {
      doctorName: "Dr. Adil Rahman",
      expertiseIn: "ENT (Ear, Nose, and Throat)",
      hospital: "Labaid Hospital",
      contact: "01812398492",
      description:
        "Dr. Adil Rahman is a dedicated and compassionate cardiologist with over 15 years of experience in treating patients with heart-related conditions. Her commitment to providing high-quality care and her exceptional diagnostic skills have earned her the respect of both patients and colleagues.",
    },
  ];
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [hospitalDropdown, setHospitalDropdown] = useState(false);
  const [hospitalName, setHospitalName] = useState("");

  const handleHospitalInputChange = (event) => {
    setHospitalName(event.target.value);
  };

  const handleHospitalSelectName = (name) => {
    setHospitalName(name);
    setHospitalDropdown(false);
  };

  const [dissesDropdown, setDissesDropdown] = useState(false);
  const [dissesName, setDissesName] = useState("");

  const handleDissesInputChange = (event) => {
    setDissesName(event.target.value);
  };

  const handleDissesSelectName = (name) => {
    setDissesName(name);
    setDissesDropdown(false);
  };

  useEffect(() => {
    if (dissesName && hospitalName) {
      let FilterDoctors = doctorsNameList?.filter(
        (item) =>
          item?.expertiseIn === dissesName && item?.hospital === hospitalName
      );
      setFilteredDoctors(FilterDoctors);
    }
  }, [dissesName, hospitalName]);

  const submitHandler = async (info) => {
    // event.preventDefault();
    const rideInfo = {
      ...info,
      expertiseIn: dissesName,
      hospital: hospitalName,
    };
    console.log(rideInfo);
    setIsLoading(true);
    fetch("https://rescue-reach-server.vercel.app/doctor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...rideInfo,
      }),
    }).then(() => {
      swal("Doctor information added!", {
        icon: "success",
      });
      reset();
      setIsLoading(false);
      router?.replace("/dashboard");
    });
  };

  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto border rounded-md shadow-lg bg-[#36393e52] mt-5">
        <h1 className="text-2xl font-bold text-center capitalize text-white">
          Give Doctor Information
        </h1>
        <hr className="w-20 mx-auto mt-1 mb-10 border-t-2 border-yellow-300" />
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-white" htmlFor="doctorName">
                Doctor Name
              </label>
              <input
                name="doctorName"
                {...register("doctorName")}
                placeholder="Doctor Name"
                className="block w-full px-4 py-2 mt-2 rounded-md bg-gray-800 border border-gray-600 dark:bg-gray-700 text-white placeholder-gray-400 focus:border-red-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white" htmlFor="doctorName">
                Contact
              </label>
              <input
                name="contact"
                {...register("contact")}
                placeholder="Contact"
                className="block w-full px-4 py-2 mt-2 rounded-md bg-gray-800 border border-gray-600 dark:bg-gray-700 text-white placeholder-gray-400 focus:border-red-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div className="relative">
              <label className="text-white" htmlFor="dropLocation">
                Select Hospital
              </label>
              <input
                className="block w-full px-4 py-2 mt-2 rounded-md bg-gray-800 border border-gray-600 dark:bg-gray-700 text-white placeholder-gray-400 focus:border-red-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                type="text"
                value={hospitalName}
                onChange={handleHospitalInputChange}
                onFocus={() => setHospitalDropdown(true)}
                onBlur={() => handleHospitalSelectName(hospitalName)}
                placeholder="Hospital"
              />
              {hospitalDropdown && (
                <div className="absolute z-10 bg-gray-800 border border-black mt-1 w-full rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                  {hospitalNames
                    ?.filter((place) =>
                      place
                        ?.toLowerCase()
                        ?.includes(hospitalName?.toLowerCase())
                    )
                    .map((hospital, index) => (
                      <div
                        key={index}
                        className={`${
                          hospital !== hospitalName ? "block" : "hidden"
                        } px-4 py-2 cursor-pointer hover:bg-gray-500`}
                        onMouseDown={() => handleHospitalSelectName(hospital)}
                      >
                        {hospital}
                      </div>
                    ))}
                </div>
              )}
            </div>
            <div className="relative">
              <label className="text-white" htmlFor="dropLocation">
                Select Expertise
              </label>
              <input
                className="block w-full px-4 py-2 mt-2 rounded-md bg-gray-800 border border-gray-600 dark:bg-gray-700 text-white placeholder-gray-400 focus:border-red-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                type="text"
                value={dissesName}
                onChange={handleDissesInputChange}
                onFocus={() => setDissesDropdown(true)}
                onBlur={() => handleDissesSelectName(dissesName)}
                placeholder="Expertise"
              />
              {dissesDropdown && (
                <div className="absolute z-10 bg-gray-800 border border-black mt-1 w-full rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                  {dissesType
                    ?.filter((place) =>
                      place?.toLowerCase()?.includes(dissesName?.toLowerCase())
                    )
                    .map((disses, index) => (
                      <div
                        key={index}
                        className={`${
                          disses !== dissesName ? "block" : "hidden"
                        } px-4 py-2 cursor-pointer hover:bg-gray-500`}
                        onMouseDown={() => handleDissesSelectName(disses)}
                      >
                        {disses}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          <div className="my-4">
            <label className="text-white" htmlFor="description">
              Doctor Description (Optional)
            </label>
            <textarea
              name="description"
              {...register("description")}
              id="description"
              type="textarea"
              //   className="block h-36 w-full px-4 py-2 mt-2 rounded-md bg-white border border-black focus:border-red-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              className="block w-full h-36 px-4 py-2 mt-2 rounded-md bg-gray-800 border border-gray-600 dark:bg-gray-700 text-white placeholder-gray-400 focus:border-red-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            ></textarea>
          </div>
          <p className="text-center mt-2 text-red-500 font-semibold">
            Note: Make Sure You Fill-Up Every Field!
          </p>
          <div className="flex justify-center mt-6">
            <input
              type="submit"
              value="Submit Document"
              className="btn dropShadow btn-neutral outline-red-500 hover:btn-ghost text-white hover:text-red-500 "
            />
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddDoctorIndex;
