import React, { useState, useMemo, useCallback } from 'react';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Section from './Section';
import Notification from './Notification';

export const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleFeedback = useCallback(type => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [type]: prevFeedback[type] + 1,
    }));
  }, []);

  const countTotalFeedback = useMemo(() => {
    return feedback.good + feedback.neutral + feedback.bad;
  }, [feedback]);

  const countPositiveFeedbackPercentage = useMemo(() => {
    return countTotalFeedback
      ? Math.round((feedback.good / countTotalFeedback) * 100)
      : 0;
  }, [countTotalFeedback, feedback.good]);

  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={handleFeedback}
        />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback > 0 ? (
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={countTotalFeedback}
            positivePercentage={countPositiveFeedbackPercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};

export default App;
