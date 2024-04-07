import React, { useEffect, useState } from "react";

const WakaTimeLang = ({ type, api }) => {
  const threshold = 1;
  const [containerWidth, setContainerWidth] = useState(0);
  const [blockWidth, setBlockWidth] = useState(0);
  const [data, setData] = useState([]);
  const [maxTime, setMaxTime] = useState(0);

  // Fetch data from API on component mount
  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [api]);

  // Calculate blockWidth when component mounts
  useEffect(() => {
    const measure = document.createElement("span");
    measure.style.visibility = "hidden";
    measure.style.fontSize = "0.8rem";
    measure.style.fontFamily = "'Roboto Mono', monospace";
    measure.textContent = "░";
    document.body.appendChild(measure);

    const measureWidth = measure.getBoundingClientRect().width;
    const initialBlockWidth = Math.floor((containerWidth - 10) / measureWidth);
    if (initialBlockWidth > 0) {
      setBlockWidth(initialBlockWidth);
    }

    document.body.removeChild(measure);
  }, [containerWidth]);

  // Callback to set containerWidth when ref is available
  const handleContainerRef = (element) => {
    if (element) {
      setContainerWidth(element.offsetWidth);
    }
  };

  // Function to create plot based on percentage
  function createPlot(percentage) {
    const totalLength = blockWidth;
    const hashLength = Math.floor(totalLength * (percentage / 100));
    const dashLength = totalLength - hashLength;

    if (hashLength === 0) return "░".repeat(totalLength);
    else if (dashLength === 0) return "█".repeat(totalLength);

    return "█".repeat(hashLength - 1) + "▓" + "░".repeat(dashLength);
  }

  function wakaMaxTime() {
    const maxTotalSeconds = data.data?.reduce(
      (max, current) => Math.max(max, current.grand_total.total_seconds),
      0
    );
    setMaxTime(maxTotalSeconds);
  }

  function formatDate(dateString) {
    // Split the dateString into year, month, and day
    const [year, month, day] = dateString.split("-");

    // Convert month number to abbreviated month name
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthName = monthNames[parseInt(month) - 1]; // Subtract 1 since JavaScript months are zero-based

    // Format the date as "DD MMM"
    const formattedDate = `${parseInt(day)} ${monthName}`;

    return formattedDate;
  }

  function convertToDecimalTime(timeString) {
    const timeParts = timeString.split(" ");
    let hours = 0,
      minutes = 0,
      seconds = 0;

    for (let i = 0; i < timeParts.length; i += 2) {
      switch (timeParts[i + 1]) {
        case "hrs":
          hours = parseInt(timeParts[i]);
          break;
        case "mins":
          minutes = parseInt(timeParts[i]);
          break;
        case "secs":
          seconds = parseInt(timeParts[i]);
          break;
      }
    }

    const decimalTime = hours + minutes / 60 + seconds / 3600;
    return decimalTime.toFixed(2);
  }
  useEffect(() => {
    if (data && type === "time") {
      wakaMaxTime();
    }
  }, [data]);

  if (type === "time") {
    return (
      <div className="wakaTime">
        <h2>Time breakdown</h2>
        <table className="w-100">
          <tbody>
            {data.data?.map((data, index) => {
              if (data.percent <= threshold) return null;
              return (
                <tr key={index}>
                  <td className="date">{formatDate(data.range.date)}</td>
                  <td className="w-100 plot-text" ref={handleContainerRef}>
                    {createPlot(
                      (data.grand_total.total_seconds / maxTime) * 100
                    )}
                  </td>
                  <td className="date">
                    {convertToDecimalTime(data.grand_total.text)} hrs
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else if (type === "lang") {
    return (
      <div className="wakaTime">
        <h2>Language breakdown</h2>
        <table className="w-100">
          <tbody>
            {data.data?.map((data, index) => {
              if (data.percent <= threshold) return null;
              return (
                <tr key={index}>
                  <td className="lang-name">{data.name}</td>
                  <td className="w-100 plot-text" ref={handleContainerRef}>
                    {createPlot(data.percent)}
                  </td>
                  <td>{data.percent}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default WakaTimeLang;
