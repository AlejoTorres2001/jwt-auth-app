const data = {
  employees: require("../models/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const createNewEmployee = (req, res) => {
  const newEmployee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res.status(400).send("you must provide a firstname and lastname");
  }
  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees);
};
const updateEmployee = (req, res) => {
  if (!req.body.id) {
    return res.status(404).send("you must provide an id");
  }
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  const unsortedArray = [...filteredArray, employee];
  const sortedArray = unsortedArray.sort((a, b) => a.id - b.id);
  data.setEmployees(sortedArray);
  res.status(200).json(data.employees);
};
const deleteEmployee = (req, res) => {
  if (!req.body.id) {
    return res.status(400).send("you must provide an id");
  }
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee)
    return res.status(404).send(`employee ${req.body.id} not found`);
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  sortedArray = filteredArray.sort((a, b) => a.id - b.id);
  data.setEmployees(sortedArray);
  res.status(202).json(data.employees);
};
const getEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  );
  res.status(200).json(employee);
};
module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
