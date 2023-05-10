import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function QuizPage() {
  const [timeRemaining, setTimeRemaining] = useState(60);
  const history = useHistory();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(prevTime => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) {
      // Redirect to another page when time is up
      history.push("/result");
    }
  }, [timeRemaining, history]);

  return (
    <div>
      <p>Time remaining: {timeRemaining}</p>
      {/* Quiz questions and answers */}
    </div>
  );
}
