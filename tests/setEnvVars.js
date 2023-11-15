if (process.env.NODE_ENV === 'dev') {
  process.env.REACT_APP_QUESTIONS_SERVICE_HOST = "http://localhost:3001";
  process.env.REACT_APP_USERS_SERVICE_HOST = "http://localhost:3002";
  process.env.REACT_APP_MATCHMAKING_SERVICE_HOST = "http://localhost:3003";
  process.env.REACT_APP_COLLABORATION_SERVICE_HOST = "http://localhost:3004";
} else {
  process.env.REACT_APP_QUESTIONS_SERVICE_HOST = "https://peerpreptest.bryanlohxz.com/api/questions-service";
  process.env.REACT_APP_USERS_SERVICE_HOST = "https://peerpreptest.bryanlohxz.com/api/users-service";
  process.env.REACT_APP_MATCHMAKING_SERVICE_HOST = "https://peerpreptest.bryanlohxz.com/api/matchmaking-service";
  process.env.REACT_APP_COLLABORATION_SERVICE_HOST = "https://peerpreptest.bryanlohxz.com/api/collaboration-service";
}
