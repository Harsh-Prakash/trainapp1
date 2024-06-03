"use client";
import React, { useState } from "react";
import sample_output from "../sample_output.json";
import sample2 from "../sample2.json";
import sample3 from "../sample3.json";
import { parse } from "path";

const Home = () => {
  const [pnr, setPnr] = useState("");
  const [trainNo, setTrainNo] = useState("");
  const [trainName, setTrainName] = useState("");
  const [sorce, setSorce] = useState("");
  const [dest, setDest] = useState("");
  const [tno, setTno] = useState("");
  const [startDay, setStartDay] = useState("");
  const [tname, setTname] = useState("");
  const [progress, setProgress] = useState(false);
  const [progress2, setProgress2] = useState(false);

  const fetchPNR = async (e) => {
    e.preventDefault();
    console.log("start");
    const url = `https://pnr-status-indian-railway.p.rapidapi.com/pnr-check/${pnr}`;
    const headers = {
      "X-RapidAPI-Key": "ec016d9e6bmshf0eadc2c2d86a61p116a62jsn5eae9e430c31",
      "X-RapidAPI-Host": "pnr-status-indian-railway.p.rapidapi.com",
    };
    let data = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    let parsedData = await data.json();
    setProgress(true);
    setTrainNo(parsedData.data.trainInfo.trainNo);
    setTrainName(parsedData.data.trainInfo.name);
    console.log(parsedData);
  };

  const runningStatus = async (e) => {
    e.preventDefault();
    console.log("start");
    const url = `https://irctc1.p.rapidapi.com/api/v1/liveTrainStatus?trainNo=${tno}&startDay=${startDay}`;
    const headers = {
      "X-RapidAPI-Key": "ec016d9e6bmshf0eadc2c2d86a61p116a62jsn5eae9e430c31",
      "X-RapidAPI-Host": "irctc1.p.rapidapi.com",
    };
    let data = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    let parsedData1 = await data.json();
    setProgress2(true);
    setTno(parsedData1.data.train_number);
    setTname(parsedData1.data.train_name);
    console.log(parsedData1);
  };

  return (
    <div className="flex justify-between items-center mx-20 mt-20 ">
      <div className="flex flex-col items-center border-2 w-[700px] h-[500px] bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 rounded-[25px] ">
        <div className="font-bold text-4xl mt-5">Running Status</div>
        <div>
          <form onSubmit={fetchPNR} className="mt-10">
            <div className="flex">
              <div className="mx-5">
                <label
                  htmlFor="pnr"
                  className="text-black flex justify-center items-center font-bold"
                >
                  Train Number
                </label>
                <input
                  type="number"
                  id="train_no"
                  value={tno}
                  onChange={(e) => setTno(e.target.value)}
                  className="block flex justify-center items-center py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
              <div className="mx-5">
                <label
                  htmlFor="doj"
                  className="text-black flex justify-center items-center font-bold"
                >
                  Day of Journey
                </label>
                <input
                  type="number"
                  id="date_of_start"
                  value={startDay}
                  onChange={(e) => setStartDay(e.target.value)}
                  className="block flex justify-center items-center py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
            </div>
            <div className="text-center mt-5">
              <button
                type="submit"
                className="text-white z-40 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 cursor-pointer text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        {true && (
          <div className="mt-5 flex flex-col mt-5 font-bold">
            <div className="flex">
              <div className="mx-3">
                Train No.
                <div>{sample3.data.train_number}</div>
              </div>
              <div className="mx-3">
                Train Name
                <div>{sample3.data.train_name}</div>
              </div>
              <div className="mx-3">
                Source
                <div>{sample3.data.source}</div>
              </div>
              <div className="mx-3">
                Destination
                <div>{sample3.data.destination}</div>
              </div>
              <div className="mx-3">
                DOS
                <div>{sample3.data.train_start_date}</div>
              </div>
            </div>
            <div className=" flex mt-10 ">
              <div className="mx-2">
                Current Station
                <div>{sample3.data.current_location_info[0].message}</div>
              </div>
              <div className="mx-2">
                Upcoming Halt
                <div>{sample3.data.upcoming_stations[1].station_name}</div>
              </div>
              <div className="mx-2 ">
                Actual Arrival
                <div>{sample3.data.upcoming_stations[1].sta}</div>
              </div>
              <div className="mx-2">
                Estimated Arrival
                <div>{sample3.data.upcoming_stations[1].eta}</div>
              </div>
            </div>
            <div className="flex mt-10">
              <div className="mx-3">
                Delay
                <div>{sample3.data.upcoming_stations[1].arrival_delay} mins</div>
              </div>
              <div className="mx-3">
                Distance to Halt
                <div>{sample3.data.upcoming_stations[1].distance_from_current_station} Kms</div>
              </div>
              <div className="mx-3 ">
                Distance to Destination
                <div>{sample3.data.upcoming_stations[sample3.data.upcoming_stations.length-1].distance_from_current_station} Kms</div>
              </div>
              <div className="mx-3 ">
                ETA at Destination
                <div>{sample3.data.upcoming_stations[sample3.data.upcoming_stations.length-1].eta} hrs</div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center border-2 w-[600px] h-[500px] bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 rounded-[25px] ">
        <div className="font-bold text-4xl mt-5">PNR Status</div>
        <div>
          <form onSubmit={fetchPNR} className="mt-10">
            <div>
              <label
                htmlFor="pnr"
                className="text-black flex justify-center items-center font-bold"
              >
                PNR Number
              </label>
              <input
                type="number"
                id="pnr"
                value={pnr}
                onChange={(e) => setPnr(e.target.value)}
                className="block flex justify-center items-center py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
            </div>
            <div className="text-center mt-5">
              <button
                type="submit"
                className="text-white z-40 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 cursor-pointer text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        {true && (
          <div className="mt-5 flex flex-col font-bold">
            <div className="flex">
              <div className="mx-3">
                Train No.
                <div>{sample2.data.trainInfo.trainNo}</div>
              </div>
              <div className="mx-3">
                Train Name
                <div>{sample2.data.trainInfo.name}</div>
              </div>
              <div className="mx-3">
                Boarding
                <div>{sample2.data.trainInfo.boarding}</div>
              </div>
              <div className="mx-3">
                Destination
                <div>{sample2.data.trainInfo.destination}</div>
              </div>
              <div className="mx-3">
                DOJ
                <div>{sample2.data.trainInfo.dt}</div>
              </div>
            </div>
            <div className="flex mt-12">
              <div className="mx-3">
                Coach
                <div>{sample2.data.seatInfo.coach}</div>
              </div>
              <div className="mx-3">
                Seat
                <div>{sample2.data.seatInfo.berth}</div>
              </div>
              <div className="mx-3">
                Boarding Time
                <div>{sample2.data.boardingInfo.departureTime}</div>
              </div>
              <div className="mx-3">
                Arrival Time
                <div>{sample2.data.destinationInfo.arrivalTime}</div>
              </div>
              {sample2.data.seatInfo.berth != "0" && (
                <div className="mx-3">
                  Status
                  <div>CNF</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
