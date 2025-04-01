function createEmployeeRecord(employeeArray) {
    return {
      firstName: employeeArray[0],
      familyName: employeeArray[1],
      title: employeeArray[2],
      payPerHour: employeeArray[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(employeesArray) {
    return employeesArray.map(employee => createEmployeeRecord(employee));
  }
  function createTimeInEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(' ');
    employee.timeInEvents.push({
      type: "TimeIn",
      date,
      hour: parseInt(hour, 10)
    });
    return employee;
  }
  
  function createTimeOutEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(' ');
    employee.timeOutEvents.push({
      type: "TimeOut",
      date,
      hour: parseInt(hour, 10)
    });
    return employee;
  }
  function hoursWorkedOnDate(employee, date) {
    let timeInEvent = employee.timeInEvents.find(event => event.date === date);
    let timeOutEvent = employee.timeOutEvents.find(event => event.date === date);
    
    if (timeInEvent && timeOutEvent) {
      return (timeOutEvent.hour - timeInEvent.hour) / 100; 
    } else {
      return 0;  
    }
  }
  
  function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
  }
  function allWagesFor(employee) {
    return employee.timeInEvents.reduce((totalWages, timeInEvent) => {
      let date = timeInEvent.date;
      return totalWages + wagesEarnedOnDate(employee, date);
    }, 0);
  }
  
  function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find(employee => employee.firstName === firstNameString);
  }
  
  function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
  }

  const employees = [
    ['Loki', 'God of Mischief', 'Villain', 50],
    ['Natalia', 'Romanova', 'Assassin', 60]
  ];
  
  const employeeRecords = createEmployeeRecords(employees);
  
  createTimeInEvent(employeeRecords[0], '2025-04-01 0800');
  createTimeOutEvent(employeeRecords[0], '2025-04-01 1600');
  
  createTimeInEvent(employeeRecords[1], '2025-04-01 0900');
  createTimeOutEvent(employeeRecords[1], '2025-04-01 1700');
  
  console.log(calculatePayroll(employeeRecords));  
  
  