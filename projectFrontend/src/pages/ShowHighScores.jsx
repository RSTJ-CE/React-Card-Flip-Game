import React, { useEffect, useState, useRef } from 'react';
import Header from "../components/Header";

import axios from 'axios';

import './ShowHighScores.css';

function ShowHighScores() {
    const [scores, setScores] = useState([]);
    const lowestTime = useRef(null);

    useEffect(() => {
        axios.get("http://localhost:8000/getScores").then(res => setScores(res.data.scores)).catch(err => console.error(err));
    },[]);

    useEffect(() => {
        for (const score of scores) {
            if (lowestTime.current == null || score.time < lowestTime.current) {
                lowestTime.current = score.time;
            }
        }
    }, [scores]);

    return (
        <div>
            <Header />
            <table>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>Time taken</td>
                    </tr>
                    {scores.map((score) => {
                        if (score.time == lowestTime.current) {
                            return (
                                <tr key={score._id} style={{ color: "red" }}>
                                    <td>{score.user}</td>
                                    <td>{score.time}</td>
                                </tr>
                            );
                        }
                        else {
                            return (
                                <tr key={score._id}>
                                    <td>{score.user}</td>
                                    <td>{score.time}</td>
                                </tr>
                            );
                        }
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ShowHighScores