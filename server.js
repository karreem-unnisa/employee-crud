const express = require("express");
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.static("public"));

let employees = [];
let idCounter = 1;


app.get("/api/employees", async (req, res) => {
  res.status(200).json(employees);
});


app.get("/api/employees/:id", async (req, res) => {
  const id = Number(req.params.id);
  const employee = employees.find(e => e.id === id);
  res.status(200).json(employee || {});
});


app.post("/api/employees", async (req, res) => {
  const newEmployee = {
    id: idCounter++,
    ...req.body
  };
  employees.push(newEmployee);
  res.status(200).json(newEmployee);
});

app.put("/api/employees/:id", async (req, res) => {
  const id = Number(req.params.id);
  employees = employees.map(emp =>
    emp.id === id ? { ...emp, ...req.body } : emp
  );
  res.status(200).json({ message: "Updated successfully" });
});


app.delete("/api/employees/:id", async (req, res) => {
  const id = Number(req.params.id);
  employees = employees.filter(emp => emp.id !== id);
  res.status(200).json({ message: "Deleted successfully" });
});


app.get("/api/employees/compensation/:id", async (req, res) => {
  const id = Number(req.params.id);
  const emp = employees.find(e => e.id === id);
  if (!emp) return res.status(200).json({});
  res.status(200).json({
    department: emp.department,
    salary: emp.salary
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
