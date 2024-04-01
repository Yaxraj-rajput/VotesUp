import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import db from "../../firebase";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AnalyticsSection = (props) => {
  const [poll, setPoll] = useState(null);
  const pollId = props.pollid; // Get the poll ID from props

  useEffect(() => {
    const fetchPoll = async () => {
      const docRef = doc(db, "polls", pollId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPoll({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such document!");
      }
    };

    fetchPoll();
  }, []);

  const data = poll
    ? Object.values(poll.options).map((option, i) => ({
        name: option.text,
        votes: option.votes,
        percentage: ((option.votes / poll.total_votes) * 100).toFixed(2),
      }))
    : [];

  return (
    <div className="analytics_main">
      {poll && (
        <div className="graph">
          <h2>Analytics For: {poll.title}</h2>
          <p>Total votes: {poll.total_votes}</p>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <Line
                type="monotone"
                dataKey="votes"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8 }}
              />
              <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default AnalyticsSection;
