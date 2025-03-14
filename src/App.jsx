import React, { useState, useEffect } from 'react';
import './App.css';

const questions = [
  {
    question: "What is Amazon EC2?",
    options: ["Compute Service", "Storage Service", "Networking Service", "Database Service"],
    answer: "Compute Service"
  },
  {
    question: "Which AWS service is used for object storage?",
    options: ["Amazon S3", "Amazon RDS", "Amazon EC2", "Amazon DynamoDB"],
    answer: "Amazon S3"
  },
  {
    question: "Which service is used to manage AWS infrastructure as code?",
    options: ["AWS CloudFormation", "AWS IAM", "AWS Lambda", "Amazon EC2"],
    answer: "AWS CloudFormation"
  },
  {
    question: "What is AWS IAM used for?",
    options: ["Identity and Access Management", "Cloud Storage", "Database Management", "Compute"],
    answer: "Identity and Access Management"
  },
  {
    question: "What does VPC stand for?",
    options: ["Virtual Private Cloud", "Virtual Public Cloud", "Virtual Protected Cloud", "Virtual Private Console"],
    answer: "Virtual Private Cloud"
  },
  {
    question: "Which AWS service provides managed NoSQL database?",
    options: ["Amazon DynamoDB", "Amazon RDS", "Amazon Aurora", "Amazon EC2"],
    answer: "Amazon DynamoDB"
  },
  {
    question: "Which AWS service is used for serverless computing?",
    options: ["AWS Lambda", "Amazon EC2", "Amazon RDS", "AWS CloudFormation"],
    answer: "AWS Lambda"
  },
  {
    question: "What is the main benefit of using AWS CloudFront?",
    options: ["Content Delivery", "Compute Power", "Database Services", "Data Storage"],
    answer: "Content Delivery"
  },
  {
    question: "Which service is responsible for automating infrastructure deployment?",
    options: ["AWS CloudFormation", "AWS EC2", "AWS Lambda", "AWS CodeDeploy"],
    answer: "AWS CloudFormation"
  },
  {
    question: "Which AWS service helps with monitoring and alerting?",
    options: ["Amazon CloudWatch", "AWS CloudTrail", "Amazon S3", "AWS EC2"],
    answer: "Amazon CloudWatch"
  },
  {
    question: "What is Amazon RDS used for?",
    options: ["Relational Database Management", "Cloud Storage", "Serverless Computing", "Compute Power"],
    answer: "Relational Database Management"
  },
  {
    question: "What is Amazon S3 used for?",
    options: ["Object Storage", "Database Storage", "Compute Services", "Networking Services"],
    answer: "Object Storage"
  },
  {
    question: "Which AWS service is used for messaging between applications?",
    options: ["Amazon SQS", "Amazon EC2", "Amazon S3", "AWS Lambda"],
    answer: "Amazon SQS"
  },
  {
    question: "Which service is used to deploy machine learning models in AWS?",
    options: ["Amazon SageMaker", "AWS Lambda", "AWS EC2", "Amazon RDS"],
    answer: "Amazon SageMaker"
  },
  {
    question: "What is Amazon Route 53 used for?",
    options: ["DNS Service", "Compute", "Database", "Load Balancer"],
    answer: "DNS Service"
  },
  {
    question: "What is the function of Amazon CloudTrail?",
    options: ["Track User Activity", "Compute Services", "Cloud Storage", "Network Services"],
    answer: "Track User Activity"
  },
  {
    question: "What is AWS Elastic Load Balancing used for?",
    options: ["Distribute Incoming Traffic", "Serverless Computing", "Object Storage", "Database Management"],
    answer: "Distribute Incoming Traffic"
  },
  {
    question: "Which service is used to manage containers on AWS?",
    options: ["Amazon ECS", "Amazon EC2", "AWS Lambda", "Amazon RDS"],
    answer: "Amazon ECS"
  },
  {
    question: "What is Amazon DynamoDB?",
    options: ["Managed NoSQL Database", "Compute Service", "Object Storage", "Messaging Service"],
    answer: "Managed NoSQL Database"
  },
  {
    question: "Which AWS service is used for automated backups?",
    options: ["AWS Backup", "Amazon S3", "AWS EC2", "Amazon RDS"],
    answer: "AWS Backup"
  },
  {
    question: "Which service does AWS provide to create a managed Kubernetes environment?",
    options: ["Amazon EKS", "Amazon EC2", "Amazon RDS", "AWS Lambda"],
    answer: "Amazon EKS"
  },
  {
    question: "What does AWS Lambda do?",
    options: ["Run code without provisioning servers", "Manage databases", "Manage virtual machines", "Configure networking"],
    answer: "Run code without provisioning servers"
  },
  {
    question: "Which AWS service provides content delivery?",
    options: ["Amazon CloudFront", "Amazon S3", "Amazon RDS", "Amazon EC2"],
    answer: "Amazon CloudFront"
  },
  {
    question: "Which AWS service enables high-performance block storage?",
    options: ["Amazon EBS", "Amazon EC2", "Amazon S3", "Amazon RDS"],
    answer: "Amazon EBS"
  },
  {
    question: "What is AWS Elastic Beanstalk used for?",
    options: ["Application Deployment", "Database Management", "File Storage", "Content Delivery"],
    answer: "Application Deployment"
  },
  {
    question: "Which service allows you to connect your on-premises data center to AWS?",
    options: ["AWS Direct Connect", "Amazon S3", "Amazon EC2", "AWS Lambda"],
    answer: "AWS Direct Connect"
  },
  {
    question: "Which AWS service enables a fully managed file system?",
    options: ["Amazon EFS", "Amazon EC2", "Amazon RDS", "Amazon S3"],
    answer: "Amazon EFS"
  },
  {
    question: "What does AWS WAF stand for?",
    options: ["Web Application Firewall", "Web Automation Framework", "Web Access Firewall", "Web Application Feature"],
    answer: "Web Application Firewall"
  },
  {
    question: "Which AWS service provides serverless data processing?",
    options: ["AWS Lambda", "Amazon EC2", "Amazon RDS", "Amazon S3"],
    answer: "AWS Lambda"
  },
  {
    question: "What is the purpose of AWS Support Plans?",
    options: ["Technical Support", "Free Storage", "Compute Capacity", "Compute Services"],
    answer: "Technical Support"
  },
  {
    question: "Which AWS service allows you to run Windows applications in the cloud?",
    options: ["Amazon WorkSpaces", "Amazon EC2", "AWS Lambda", "Amazon S3"],
    answer: "Amazon WorkSpaces"
  }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [timer, setTimer] = useState(null);
  const [endTimeReached, setEndTimeReached] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    if (started && timeLeft > 0) {
      const timerInterval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      setTimer(timerInterval);
      return () => clearInterval(timerInterval); // Cleanup interval on unmount or time end
    } else if (timeLeft === 0) {
      setSubmitted(true); // Submit the assessment when the timer reaches zero
      alert('Time is up! Submitting your answers.');
    }
  }, [started, timeLeft]);

  // Handle auto-close tab after 5 minutes
  useEffect(() => {
    if (endTimeReached) {
      setTimeout(() => {
        window.close(); // Close the tab after 5 minutes of completion
      }, 5 * 60 * 1000); // 5 minutes in milliseconds
    }
  }, [endTimeReached]);

  const handleOptionChange = (event) => {
    setAnswers({
      ...answers,
      [currentQuestion]: event.target.value,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    clearInterval(timer); // Stop timer on submit
    setEndTimeReached(true); // Set flag to trigger tab close
  };

  const handleStart = () => {
    setStarted(true);
    setTimeLeft(3600); // Reset timer to 1 hour
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        score++;
      }
    });
    return score;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="app">
      <h1>AWS Assessment</h1>

      {!started && (
        <div className="start-button">
          <button onClick={handleStart}>Start Assessment</button>
        </div>
      )}

      {started && !submitted && (
        <div>
          <div className="timer">
            <h3>Time Left: {formatTime(timeLeft)}</h3>
          </div>

          <div className="question-container">
            <h2>{questions[currentQuestion].question}</h2>
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`question-${currentQuestion}-option-${index}`}
                  name={`question-${currentQuestion}`}
                  value={option}
                  onChange={handleOptionChange}
                  checked={answers[currentQuestion] === option}
                  disabled={submitted}
                />
                <label htmlFor={`question-${currentQuestion}-option-${index}`}>{option}</label>
              </div>
            ))}
          </div>

          <div className="navigation">
            <button onClick={handlePrevQuestion} disabled={currentQuestion === 0}>
              Previous
            </button>
            <button onClick={handleNextQuestion} disabled={currentQuestion === questions.length - 1}>
              Next
            </button>
          </div>

          <div className="submit-button">
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      )}

      {submitted && (
        <div className="results">
          <h2>Thank you for completing the assessment!</h2>
          <h3>Your Score: {calculateScore()} out of {questions.length}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
