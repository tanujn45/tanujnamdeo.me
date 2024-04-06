import React, { useRef, useEffect, useState } from "react";
import jsonApi from "../json/Waka.json";
import jsonData from "../json/WakaCoding.json";
import ProgressBar from "./ProgressBar";

const WakaTime = ({ langApi }) => {
    const threshold = 1;
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [langData, setLangData] = useState([]);


    useEffect(() => {
        fetch(langApi)
            .then(response => response.json())
            .then(data => setLangData(data));
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth);
        }
    }, []);

    function createPlot(percentage) {
        if (!containerRef.current) return;
        const measure = document.createElement('span');
        measure.style.visibility = 'hidden';
        measure.textContent = '░';
        document.body.appendChild(measure);

        const containerWidth = containerRef.current.offsetWidth;
        const blockWidth = measure.getBoundingClientRect().width - 1.5;

        const totalLength = Math.floor((containerWidth) / blockWidth);
        const hashLength = Math.floor(totalLength * (percentage / 100));
        const dashLength = totalLength - hashLength;

        if (hashLength === 0) return "░".repeat(totalLength);
        else if (dashLength === 0) return "█".repeat(totalLength);
        const plot = "█".repeat(hashLength - 1) + "▓" + "░".repeat(dashLength);
        return plot;
    }


    function wakaMetaTime(jsonData) {
        jsonData.data.sort(
            (a, b) => new Date(a.range.start) - new Date(b.range.start)
        );

        const firstDate = jsonData.data[0].range.text;
        const lastDate = jsonData.data[jsonData.data.length - 1].range.text;

        const totalSeconds = jsonData.data.reduce(
            (total, current) => total + current.grand_total.total_seconds,
            0
        );

        const totalSecondsInDay = 24 * 60 * 60;
        const totalSecondsInHour = 60 * 60;
        const totalSecondsInMinute = 60;

        const days = Math.floor(totalSeconds / totalSecondsInDay);
        const hours = Math.floor((totalSeconds % totalSecondsInDay) / totalSecondsInHour);
        const minutes = Math.floor((totalSeconds % totalSecondsInHour) / totalSecondsInMinute);
        const seconds = Math.floor(totalSeconds % totalSecondsInMinute);

        const formattedTime = `${days ? `${days} days ` : ''}${hours ? `${hours} hrs ` : ''}${minutes ? `${minutes} mins ` : ''}${seconds ? `${seconds} secs` : ''}`.trim().replace(/,$/, '');

        return { firstDate, lastDate, formattedTime };
    }

    const { firstDate, lastDate, formattedTime } = wakaMetaTime(jsonData);


    return (
        <div className="wakaTime">
            <h1>Weekly development breakdown</h1>
            <div>
                <p>From: {firstDate} - To: {lastDate}</p>
                <p>Total time: {formattedTime}</p>
            </div>
            <table className="w-100" >
                <tbody >
                    {langData.data?.map((data, index) => {
                        if (data.percent <= threshold) return null;
                        return (
                            <tr key={index}>
                                <td>{data.name}</td>
                                <td className="w-100" ref={containerRef}>{createPlot(data.percent)}</td>
                                <td>{data.percent}%</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {/* <div>
                {jsonApi.data.map((data, index) => {
                    if (data.percent <= threshold) return null;
                    return (
                        <ProgressBar
                            key={index}
                            label={data.name}
                            percentage={data.percent}
                            maxWidth={containerWidth}
                        />
                    );
                })}
            </div> */}
        </div>
    );
};

export default WakaTime;
