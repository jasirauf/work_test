import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import CustomModal from "./CustomModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./customcss.css";
import { signupInput } from "../../../api/api";
import moment from "moment";

function SignupAuth() {
  function range(start, end, step = 1) {
    const result = [];
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
    return result;
  }
  const years = range(1990, new Date().getFullYear() + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const { registerUser } = useContext(AuthContext);

  const { verify_license } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [medicalNumber, setMedicalNumber] = useState("");
  const [dob, setDob] = useState("");
  const [MedicalRegistrationDate, setRegistrationDate] = useState("");
  const [gender, setGender] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [Last_Name, setLastName] = useState("");
  const [First_Name, setFirstName] = useState("");
  const [is_cardio, setIs_cardio] = useState(false);

  const [subspeciality, setSubspeciality] = useState("");
  const [diseasearea, setDiseaseArea] = useState([]);
  const [otherdisease, setOtherdisease] = useState(false);
  const [otherdiseaseValue, setOtherdiseaseValue] = useState("");

  useEffect(() => {
    setOtherdisease(diseasearea.includes("others"));
  }, [diseasearea]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setDiseaseArea([...diseasearea, value]);
    } else {
      setDiseaseArea(diseasearea.filter((item) => item !== value));
    }
  };

  const diseaseArea = diseasearea.join(",");

  const [medicine, setMedicine] = useState([]);
  const [othermedicine, setOthermedicine] = useState(false);
  const [othermedicineValue, setOthermedicineValue] = useState("");

  useEffect(() => {
    setOthermedicine(medicine.includes("others"));
  }, [medicine]);

  const handleCheckboxChangeMedicine = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setMedicine([...medicine, value]);
    } else {
      setMedicine(medicine.filter((item) => item !== value));
    }
  };

  const Medicine = medicine.join(",");

  const [content, setContent] = useState([]);
  const [othercontent, setOthercontent] = useState(false);
  const [othercontentValue, setOthercontentValue] = useState("");

  useEffect(() => {
    setOthercontent(content.includes("others"));
  }, [content]);

  const handleCheckboxChangeContent = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setContent([...content, value]);
    } else {
      setContent(content.filter((item) => item !== value));
    }
  };

  const Content = content.join(",");

  const [message, setMessage] = useState([]);
  const [othermessage, setOthermessage] = useState(false);
  const [othermessageValue, setOthermessageValue] = useState("");

  useEffect(() => {
    setOthermessage(message.includes("others"));
  }, [message]);

  const handleCheckboxChangeMessage = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setMessage([...message, value]);
    } else {
      setMessage(message.filter((item) => item !== value));
    }
  };

  const Message = message.join(",");

  const [institution, setInstitution] = useState("");
  const [treatment, setTreatment] = useState([]);
  const [othertreatment, setOthertreatment] = useState(false);
  const [othertreatmentValue, setOthertreatmentValue] = useState("");

  useEffect(() => {
    setOthertreatment(treatment.includes("others"));
  }, [treatment]);

  const handleCheckboxChangeTreatement = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setTreatment([...treatment, value]);
    } else {
      setTreatment(treatment.filter((item) => item !== value));
    }
  };

  const Treatment = treatment.join(",");

  const handleVerify = () => {
    verify_license();
  };

  const formatSignupData = () => {
    const ageRanges = {
      "20to30": "0",
      "31to40": "0",
      "41to50": "0",
      "51to60": "0",
      "61plus": "0",
    };

    const currentYear = new Date().getFullYear();
    const birthYear = new Date(dob).getFullYear();
    const age = currentYear - birthYear;

    if (age >= 20 && age <= 30) ageRanges["20to30"] = "1";
    else if (age >= 31 && age <= 40) ageRanges["31to40"] = "1";
    else if (age >= 41 && age <= 50) ageRanges["41to50"] = "1";
    else if (age >= 51 && age <= 60) ageRanges["51to60"] = "1";
    else if (age > 60) ageRanges["61plus"] = "1";

    return {
      identifier: email,
      age: ageRanges,
      gender: {
        male: gender === "Male" ? "1" : "0",
        female: gender === "Female" ? "1" : "0",
        others: gender === "Others" ? "1" : "0",
      },
      Prefecture: institution,
      speciality: {
        cardiology: speciality === "Cardiology" ? "1" : "0",
        oncology: speciality === "Oncology" ? "1" : "0",
        dermatology: speciality === "Dermatology" ? "1" : "0",
        others: ["Cardiology", "Oncology", "Dermatology"].includes(speciality)
          ? "0"
          : "1",
      },
      subspecialty: {
        pediatriccardiology:
          subspeciality === "Pediatric Cardiology" ? "1" : "0",
        generalcardiology: subspeciality === "General Cardiology" ? "1" : "0",
        cardiacsurgery: subspeciality === "Cardiac Surgery" ? "1" : "0",
      },
      disease: {
        ischemicheartdisease: diseasearea.includes("Ischemic Heart Disease")
          ? "1"
          : "0",
        arrhythmia: diseasearea.includes("Arrhythmia") ? "1" : "0",
        heartfailure: diseasearea.includes("Heart Failure") ? "1" : "0",
        macrovasculardisease: diseasearea.includes("MacroVascular Disease")
          ? "1"
          : "0",
        others: diseasearea.includes("others") ? "1" : "0",
      },
      work: {
        drugtreatment: treatment.includes("Drug") ? "1" : "0",
        surgicaltreatment: treatment.includes("Surgery") ? "1" : "0",
        catheter: treatment.includes("Catheter") ? "1" : "0",
        ablation: treatment.includes("Ablation") ? "1" : "0",
        others: treatment.includes("others") ? "1" : "0",
      },
      intent: {
        inspection: medicine.includes("Inspection") ? "1" : "0",
        diagnosis: medicine.includes("Diagnosis") ? "1" : "0",
        treatment: medicine.includes("Treatment") ? "1" : "0",
        rehabilitation: medicine.includes("Rehabilitation") ? "1" : "0",
        prevention: medicine.includes("Prevention") ? "1" : "0",
        patienteducation: medicine.includes("Patient Education") ? "1" : "0",
        others: medicine.includes("others") ? "1" : "0",
      },
      content: {
        clinicaltrial: content.includes("Clinical Trial") ? "1" : "0",
        epidemiology: content.includes("Epidemiology") ? "1" : "0",
        basicresearch: content.includes("Basic Research") ? "1" : "0",
        systematicreview: content.includes("Systematic Review") ? "1" : "0",
        casereport: content.includes("Case Report") ? "1" : "0",
        healthtech: content.includes("Health Tech") ? "1" : "0",
        others: content.includes("others") ? "1" : "0",
      },
      message: {
        effectiveness: message.includes("Efficacy") ? "1" : "0",
        safety: message.includes("Safety") ? "1" : "0",
        dosing: message.includes("Dosing") ? "1" : "0",
        mechanismofaction: message.includes("Mechanism Of Action") ? "1" : "0",
        adverseevents: message.includes("Adverse Events") ? "1" : "0",
        adherence: message.includes("Adherence") ? "1" : "0",
        druginteraction: message.includes("Drug Interaction") ? "1" : "0",
        others: message.includes("others") ? "1" : "0",
      },
      timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
  };

  const handleRegister = async () => {
    const signupData = formatSignupData();
    await signupInput(signupData);
    registerUser(
      email,
      password,
      password2,
      profession,
      medicalNumber,
      dob,
      MedicalRegistrationDate,
      gender,
      speciality,
      First_Name,
      Last_Name,
      subspeciality,
      Medicine,
      Content,
      Message,
      diseaseArea,
      Treatment,
      institution,
      othercontentValue,
      othertreatmentValue,
      othermedicineValue,
      othermessageValue,
      otherdiseaseValue
    );
  };

  const handleTerms = () => {
    setOpen(true);
  };

  const handleTermsOff = () => {
    setOpen(false);
  };

  const SpecOption = [
    { label: "Oncology", value: "Oncology" },
    { label: "Cardiology", value: "Cardiology" },
    { label: "Dermatology", value: "Dermatology" },
  ];

  useEffect(() => {
    setIs_cardio(speciality === "Cardiology");
  }, [speciality]);

  return (
    <div className="h-full overflow-x-hidden overflow-y-scroll flex justify-center flex-wrap sm:px-2 fixed ml-[150px] no-scrollbar">
      <div className="flex flex-col gap-5 w-[500px] justify-center items-center relative bottom-10 mt-[170px] ml-[50px]">
        <div className="gap-5">
          <div className="px-8 mb-5 mr-8">
            <div className="text-3xl font-custom text-center dark:text-white text-white">
              Create An Account
            </div>
            <div className="dark:text-white text-white flex flex-row items-center justify-center">
              <h2 className="text-center font-custom">
                Already Have An Account{" "}
                <Link to={"/login"}>
                  <span className="underline font-custom">Login</span>
                </Link>
              </h2>
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <h3 className="opacity-80 mt-2 font-custom text-white">
              We will use your medical license information to verify in the
              below MHLW’s website. Please make sure to input in the same format
              as you registered:​
            </h3>
            <a
              className=" text-blue-300 cursor-pointer"
              href="https://licenseif.mhlw.go.jp/search_isei/ssl/isekikakuninTop.jsp"
            >
              https://licenseif.mhlw.go.jp/search_isei/ssl/isekikakuninTop.jsp
            </a>
          </div>
          <div>
            <div>
              <label className="font-custom flex mb-1 mt-3 text-sm dark:text-white text-white opacity-60">
                Last Name
              </label>
              <input
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                type="text"
                className="font-custom block w-full p-3 bg-transparent opacity-90 dark:text-white text-white border border-black-300 rounded-lg text-base focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="flex mb-1 mt-3 text-sm font-custom dark:text-white text-white opacity-60">
                First Name
              </label>
              <input
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                type="text"
                className="block w-full p-3 bg-transparent opacity-90 dark:text-white text-white border border-black-300 rounded-lg text-base focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="flex mb-1 mt-3 text-sm font-custom dark:text-white text-white opacity-60">
                Gender
              </label>
              <div
                className="flex gap-5"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <label className="text-white opacity-75">
                  <input type="radio" value="Male" name="gender" /> Male
                </label>
                <label className="text-white opacity-75">
                  <input type="radio" value="Female" name="gender" /> Female
                </label>
              </div>
            </div>

            <div>
              <label className="flex mb-1 mt-2 text-sm font-custom dark:text-white text-white opacity-60">
                Email
              </label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                className="block w-full bg-transparent opacity-90 p-3 dark:text-white text-white border border-black-300 rounded-lg text-base focus:ring-purple-500 focus:border-purple-500"
              />
              <div className="dark:text-white text-white flex flex-row items-center justify-start mt-2 opacity-80">
                <h2 className="text-center">
                  Email Not Verified{" "}
                  <Link to={"/emailverification"}>
                    <span className="underline">Verify</span>
                  </Link>
                </h2>
              </div>
            </div>
            <div className="mb-3 mt-3">
              <label className="flex mb-1 mt-2 text-sm font-custom dark:text-white text-white opacity-60">
                DOB
              </label>
              <DatePicker
                className="bg-transparent text-white border border-gray-200 rounded-md px-[160px] py-3 flex justify-start"
                selected={dob}
                onChange={(date) => setDob(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                dateFormat="yyyy/MM/dd"
                placeholderText="YYYY/MM/DD"
              />
            </div>
            <div className="mb-4">
              <label className="flex mb-1 mt-2 text-sm font-custom dark:text-white text-white opacity-60">
                Profession
              </label>
              <div
                className="flex gap-5"
                onChange={(e) => {
                  setProfession(e.target.value);
                }}
              >
                <label className="text-white opacity-75">
                  <input
                    type="radio"
                    value="Medical doctor"
                    name="Profession"
                  />{" "}
                  Medical doctor
                </label>
                <label className="text-white opacity-75">
                  <input type="radio" value="Dentist" name="Profession" />{" "}
                  Dentist
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="flex mb-1 mt-2 text-sm font-custom dark:text-white text-white opacity-60">
                Institution Type
              </label>
              <div
                className="flex flex-col"
                onChange={(e) => {
                  setInstitution(e.target.value);
                }}
              >
                <div className="flex gap-4 mb-4">
                  <label className="text-white opacity-75">
                    {" "}
                    <input
                      type="radio"
                      value="Hospital"
                      name="institution"
                    />{" "}
                    Hospital
                  </label>
                  <label className="text-white opacity-75">
                    <input type="radio" value="Clinic" name="institution" />{" "}
                    Clinic
                  </label>
                  <label className="text-white opacity-75">
                    <input
                      type="radio"
                      value="Others"
                      name="institution"
                      unselectable="on"
                    />
                    Others
                  </label>
                </div>
                <div>
                  <input
                    onChange={(e) => {
                      setInstitution(e.target.value);
                    }}
                    type="email"
                    placeholder="Others"
                    className="block w-full bg-transparent opacity-90 p-3 dark:text-white text-white border border-black-300 rounded-lg text-base focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="flex mb-1 mt-2 text-sm font-custom dark:text-white text-white opacity-60">
                Medical License Number
              </label>
              <input
                onChange={(e) => {
                  setMedicalNumber(e.target.value);
                }}
                type="email"
                className="block w-full bg-transparent opacity-90 p-3 dark:text-white text-white border border-black-300 rounded-lg text-base focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div className="mb-4">
              <label className="flex mb-1 mt-2 text-sm font-custom dark:text-white text-white opacity-60">
                Medical License Registration Date
              </label>
              <DatePicker
                className="bg-transparent border border-gray-200 rounded-md px-[160px] text-white py-3 flex justify-start"
                selected={MedicalRegistrationDate}
                onChange={(date) => setRegistrationDate(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                dateFormat="yyyy/MM/dd"
                placeholderText="YYYY/MM/DD"
              />
            </div>
            <div>
              <label className="flex mb-1 mt-2 text-sm font-custom text-white opacity-60">
                Speciality
              </label>
              <select
                onChange={(e) => {
                  setSpeciality(e.target.value);
                  e.target.classList.add("text-white");
                }}
                className="form-select bg-transparent border text-white border-gray-200 rounded-md w-full p-3"
              >
                {SpecOption.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            {is_cardio ? (
              <>
                <div>
                  <label className="flex mb-1 mt-2 text-sm font-custom dark:text-white text-white opacity-60">
                    Disease Area focus
                  </label>
                  <div className="flex flex-col">
                    <div className="flex flex-wrap gap-[22px] mb-4 items-center">
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          value="Ischemic Heart Disease"
                          name="DiseaseArea"
                          onChange={handleCheckboxChange}
                        />{" "}
                        Ischemic Heart Disease
                      </label>
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          value="Arrhythmia"
                          name="DiseaseArea"
                          onChange={handleCheckboxChange}
                        />{" "}
                        Arrhythmia
                      </label>
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          value="Heart Failure"
                          name="DiseaseArea"
                          onChange={handleCheckboxChange}
                        />{" "}
                        Heart Failure
                      </label>
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          value="MacroVascular Disease"
                          name="DiseaseArea"
                          onChange={handleCheckboxChange}
                        />{" "}
                        MacroVascular Disease
                      </label>
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          value="others"
                          name="DiseaseArea"
                          onChange={handleCheckboxChange}
                        />{" "}
                        Others
                      </label>
                      {otherdisease ? (
                        <input
                          onChange={(e) => {
                            setOtherdiseaseValue(e.target.value);
                          }}
                          type="email"
                          placeholder="Others"
                          className="block w-full bg-transparent opacity-90 p-3 dark:text-white text-white border border-black-300 rounded-lg text-base focus:ring-purple-500 focus:border-purple-500"
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="flex mb-1 mt-2 text-sm font-custom dark:text-white text-white opacity-60">
                    Treatment
                  </label>
                  <div className="flex flex-col">
                    <div className="flex flex-wrap gap-[10px] mb-4 items-center">
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          value="Drug"
                          name="Treatment"
                          onChange={handleCheckboxChangeTreatement}
                        />{" "}
                        Drug
                      </label>
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          value="Surgery"
                          name="Treatment"
                          onChange={handleCheckboxChangeTreatement}
                        />{" "}
                        Surgery
                      </label>
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          value="Catheter"
                          name="Treatment"
                          onChange={handleCheckboxChangeTreatement}
                        />{" "}
                        Catheter
                      </label>
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          value="Ablation"
                          name="Treatment"
                          onChange={handleCheckboxChangeTreatement}
                        />{" "}
                        Ablation
                      </label>
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          name="Content"
                          value="others"
                          onChange={handleCheckboxChangeTreatement}
                        />{" "}
                        Others
                      </label>
                      {othertreatment ? (
                        <input
                          onChange={(e) => {
                            setOthertreatmentValue(e.target.value);
                          }}
                          type="email"
                          placeholder="Others"
                          className="block w-full bg-transparent opacity-90 p-3 dark:text-white text-white border border-black-300 rounded-lg text-base focus:ring-purple-500 focus:border-purple-500"
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="flex mb-1 mt-2 text-sm font-custom dark:text-white text-white opacity-60">
                    Focus Area Of Medicine
                  </label>
                  <div className="flex flex-col">
                    <div className="flex gap-5 mb-4 flex-wrap">
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          value="Inspection"
                          name="Medicine"
                          onChange={handleCheckboxChangeMedicine}
                        />{" "}
                        Inspection
                      </label>
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          value="Diagnosis"
                          name="Medicine"
                          onChange={handleCheckboxChangeMedicine}
                        />{" "}
                        Diagnosis
                      </label>
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          value="Treatment"
                          name="Medicine"
                          onChange={handleCheckboxChangeMedicine}
                        />{" "}
                        Treatment
                      </label>
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          value="Rehabilation"
                          name="Medicine"
                          onChange={handleCheckboxChangeMedicine}
                        />{" "}
                        Rehabilation
                      </label>
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          value="Prevention"
                          name="Medicine"
                          onChange={handleCheckboxChangeMedicine}
                        />{" "}
                        Prevention
                      </label>
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          value="Patient Education"
                          name="Medicine"
                          onChange={handleCheckboxChangeMedicine}
                        />{" "}
                        Patient Education
                      </label>
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          value="others"
                          name="Content"
                          onChange={handleCheckboxChangeMedicine}
                        />{" "}
                        Others
                      </label>
                      {othermedicine ? (
                        <input
                          onChange={(e) => {
                            setOthermedicineValue(e.target.value);
                          }}
                          type="email"
                          placeholder="Others"
                          className="block w-full bg-transparent opacity-90 p-3 dark:text-white text-white border border-black-300 rounded-lg text-base focus:ring-purple-500 focus:border-purple-500"
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="flex mb-1 mt-2 text-sm font-custom dark:text-white text-white opacity-60">
                    Content Prefernce
                  </label>
                  <div className="flex flex-col">
                    <div className="flex gap-[30px] mb-3 flex-wrap">
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          value="Epidemiology"
                          name="Content"
                          unselectable={"on"}
                          onChange={handleCheckboxChangeContent}
                        />{" "}
                        Epidemiology
                      </label>
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          value="Clinical Trial"
                          name="Content"
                          onChange={handleCheckboxChangeContent}
                        />{" "}
                        Clinical Trial
                      </label>
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          value="Basic Research"
                          name="Content"
                          onChange={handleCheckboxChangeContent}
                        />{" "}
                        Basic Research
                      </label>
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          value="Systematic Review"
                          name="Content"
                          onChange={handleCheckboxChangeContent}
                        />{" "}
                        Systematic Review
                      </label>
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          value="Case Report"
                          name="Content"
                          onChange={handleCheckboxChangeContent}
                        />{" "}
                        Case Report
                      </label>
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          value="Health Tech"
                          name="Content"
                          onChange={handleCheckboxChangeContent}
                        />{" "}
                        Health Tech
                      </label>
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          name="Content"
                          value="others"
                          onChange={handleCheckboxChangeContent}
                        />{" "}
                        Others
                      </label>
                      {othercontent ? (
                        <input
                          onChange={(e) => {
                            setOthercontentValue(e.target.value);
                          }}
                          type="email"
                          placeholder="Others"
                          className="block w-full bg-transparent opacity-90 p-3 dark:text-white text-white border border-black-300 rounded-lg text-base focus:ring-purple-500 focus:border-purple-500"
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="flex mb-1 mt-2 text-sm font-custom dark:text-white text-white opacity-60">
                    Message Preference
                  </label>
                  <div className="flex flex-col">
                    <div className="flex gap-[38px] mb-3 flex-wrap">
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          value="Efficacy"
                          name="Message"
                          unselectable={"on"}
                          onChange={handleCheckboxChangeMessage}
                        />{" "}
                        Efficacy
                      </label>
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          value="Dosing"
                          name="Message"
                          onChange={handleCheckboxChangeMessage}
                        />{" "}
                        Dosing
                      </label>
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          value="Mechanism Of Action"
                          name="Message"
                          onChange={handleCheckboxChangeMessage}
                        />{" "}
                        Mechanism Of Action
                      </label>
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          value="Safety"
                          name="Message"
                          onChange={handleCheckboxChangeMessage}
                        />{" "}
                        Safety
                      </label>
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          value="Adverse Events"
                          name="Message"
                          onChange={handleCheckboxChangeMessage}
                        />{" "}
                        Adverse Events
                      </label>
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          value="Adherence"
                          name="Message"
                          onChange={handleCheckboxChangeMessage}
                        />{" "}
                        Adherence
                      </label>
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          value="Drug Interaction"
                          name="Message"
                          onChange={handleCheckboxChangeMessage}
                        />{" "}
                        Drug Interaction
                      </label>
                      <label className="text-white opacity-75">
                        <input
                          type="checkbox"
                          name="Message"
                          value="others"
                          onChange={handleCheckboxChangeMessage}
                        />{" "}
                        Others
                      </label>
                      {othermessage ? (
                        <input
                          onChange={(e) => {
                            setOthermessageValue(e.target.value);
                          }}
                          type="email"
                          placeholder="Others"
                          className="block w-full bg-transparent opacity-90 p-3 dark:text-white text-white border border-black-300 rounded-lg text-base focus:ring-purple-500 focus:border-purple-500"
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </>
            ) : null}

            <div>
              <label className="flex mb-1 mt-2  text-sm font-custom dark:text-white text-white opacity-60">
                Password
              </label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="**********"
                className="block w-full bg-transparent opacity-90 p-3 dark:text-white text-white border border-black-300 rounded-lg  text-base focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="flex mb-1 mt-2  text-sm font-custom dark:text-white text-white opacity-60">
                Confirmed Password
              </label>
              <input
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}
                type="password"
                placeholder="**********"
                className="block w-full bg-transparent opacity-90 p-3 dark:text-white text-white border border-black-300 rounded-lg  text-base focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div class="flex items-center  mt-4 mb-4">
              <input
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600  bg-gray-100 border-gray-300 rounded"
              />
              <label
                for="link-checkbox"
                class="ms-2 text-sm font-custom dark:text-white text-white opacity-60"
              >
                I agree with the{" "}
                <a
                  onClick={handleTerms}
                  href="#"
                  class="dark:text-blue-600 text-blue-950 hover:underline"
                >
                  terms and conditions and privacy policy
                </a>
                <CustomModal isOpen={open} onClose={handleTermsOff}>
                  <h2 className="text-xl font-semibold">
                    Terms And Conditions
                  </h2>
                  <p></p>
                </CustomModal>
              </label>
            </div>

            <button
              onClick={handleRegister}
              type="submit"
              className="transition dark:text-white text-white rounded-lg w-full mt-2 bg-blue-600 hover:bg-blue-300 hover:dark:text-white font-custom text-sm px-5 py-2.5 me-2 mb-2"
            >
              {"Register"}
            </button>
            <button
              onClick={handleVerify}
              type="submit"
              className="transition dark:text-white rounded-lg w-full mt-2 bg-blue-600 hover:bg-blue-300 hover:dark:text-white text-white font-custom text-sm px-5 py-2.5 me-2 mb-2"
            >
              {"Verify_license"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupAuth;
