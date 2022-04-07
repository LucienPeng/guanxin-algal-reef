import { useState, useEffect } from "react";
import dayjs from "dayjs";

const TideForecastComponent = () => {
  let [counter, setCounter] = useState(0);
  let [date, setDate] = useState("");
  let [lunarDate, setLunarDate] = useState("");
  let [tideDifference, setTideDifference] = useState("");

  let [time1, setTime1] = useState("");
  let [time2, setTime2] = useState("");
  let [time3, setTime3] = useState("");
  let [time4, setTime4] = useState("");

  let [tide1, setTide1] = useState("");
  let [tide2, setTide2] = useState("");
  let [tide3, setTide3] = useState("");
  let [tide4, setTide4] = useState("");

  let [tideHeight1, setTideHeight1] = useState("");
  let [tideHeight2, setTideHeight2] = useState("");
  let [tideHeight3, setTideHeight3] = useState("");
  let [tideHeight4, setTideHeight4] = useState("");

  const nextTideForecastHandle = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    fetch(
      "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-A0021-001?Authorization=CWB-030D5CFD-3027-4E9D-B27E-59A1E6E3386A&format=JSON&locationName=%E6%A1%83%E5%9C%92%E5%B8%82%E6%96%B0%E5%B1%8B%E5%8D%80&sort=validTime"
    )
      .then((res) => {
        return res.json();
      })
      .then((originData) => {
        const finalResult = originData.records.location[0].validTime;
        setDate(finalResult[0 + counter].startTime.slice(0, 10));
        setLunarDate(finalResult[0 + counter].weatherElement[0].elementValue);
        setTideDifference(
          finalResult[0 + counter].weatherElement[1].elementValue
        );

        const tempRR = finalResult.map((item) => {
          const timeLength = item.weatherElement[2].time.length;
          const tempDateArray = [];
          for (let i = 0; i < timeLength; i++) {
            tempDateArray.push(item.weatherElement[2].time[i].dataTime);
          }
          const orderDateArray = tempDateArray.sort((a, b) =>
            dayjs(a).isAfter(dayjs(b)) ? 1 : -1
          );
          const temp = [];
          item.weatherElement[2].time.forEach((date) => {
            const isLargeNumber = (element) => element === date.dataTime;
            const order = orderDateArray.findIndex(isLargeNumber);
            temp[order] = date;
          });
          return temp;
        });
        setTime1(tempRR[0 + counter][0].dataTime.slice(11, 16));
        setTime2(tempRR[0 + counter][1].dataTime.slice(11, 16));
        setTime3(tempRR[0 + counter][2].dataTime.slice(11, 16));
        setTime4(tempRR[0 + counter][3].dataTime.slice(11, 16));
        setTide1(tempRR[0 + counter][0].parameter[0].parameterValue);
        setTide2(tempRR[0 + counter][1].parameter[0].parameterValue);
        setTide3(tempRR[0 + counter][2].parameter[0].parameterValue);
        setTide4(tempRR[0 + counter][3].parameter[0].parameterValue);
        setTideHeight1(tempRR[0 + counter][0].parameter[2].parameterValue);
        setTideHeight2(tempRR[0 + counter][1].parameter[2].parameterValue);
        setTideHeight3(tempRR[0 + counter][2].parameter[2].parameterValue);
        setTideHeight4(tempRR[0 + counter][3].parameter[2].parameterValue);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [counter]);
  return (
    <div className="mt-10 mb-10 flex	w-full flex-col items-center justify-center rounded-lg  shadow-md">
      <table className="w-full table-fixed text-center text-sm text-gray-500  dark:text-gray-400 sm:table-auto">
        <thead className="rounded-lg bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="text-lg" colSpan="5" scope="col">
              {`${date} 當日潮汐表`}
            </th>
          </tr>
          <tr>
            <th scope="col" className="px-6 py-3">
              農曆
            </th>
            <th scope="col" className="px-6 py-3">
              {lunarDate}
            </th>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3">
              潮差
            </th>
            <th scope="col" className="px-6 py-3">
              {tideDifference}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
            <th
              scope="row"
              className=" whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              時間
            </th>
            <td className="px-6 py-4">{time1}</td>
            <td className="px-6 py-4">{time2}</td>
            <td className="px-6 py-4">{time3}</td>
            <td className="px-6 py-4">{time4}</td>
          </tr>
          <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
            <th
              scope="row"
              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              潮汐
            </th>
            <td className="px-6 py-4">{tide1}</td>
            <td className="px-6 py-4">{tide2}</td>
            <td className="px-6 py-4">{tide3}</td>
            <td className="px-6 py-4">{tide4}</td>
          </tr>
          <tr className="bg-white dark:bg-gray-800">
            <th
              scope="row"
              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              相對海平面
              <br />
              潮高(cm)
            </th>
            <td className="px-6 py-4">{tideHeight1}</td>
            <td className="px-6 py-4">{tideHeight2}</td>
            <td className="px-6 py-4">{tideHeight3}</td>
            <td className="px-6 py-4">{tideHeight4}</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-5 flex items-center justify-center">
        <button
          onClick={nextTideForecastHandle}
          type="button"
          className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800"
        >
          下一日潮汐預報
        </button>
        <button
          type="button"
          className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800"
        >
          30日潮汐預報表
        </button>
      </div>
    </div>
  );
};

export default TideForecastComponent;
