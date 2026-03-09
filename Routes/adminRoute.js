const router = require("express").Router();

const adminModel = require("../Models/admin");

router.post("/create", async (req, res) => {
  const newJob = new adminModel(req.body);
  await newJob.save();
  res.status(201).send({ success: true });
});

router.get("/all", async (req, res) => {
  const { exp, sort, location, type, search, salary } = req.query;
  console.log(salary);
  console.log(type);

  let filter = {};
  if (salary) {
    filter.salary = { $lte: Number(salary) };
  }
  if (exp) {
    filter.exp = exp;
  }

  if (location) {
    const locationsArray = location.split(",");
    filter.location = { $in: locationsArray };
  }
  if (type) {
    const typeArray = type.split(",");
    filter.jobType = { $in: typeArray };
  }
  if (search) {
    filter.jobName = { $regex: search, $options: "i" };
  }
  let query = adminModel.find(filter);

  if (sort === "HTL") {
    query = query.sort({ salary: -1 });
  }
  if (sort === "LTH") {
    query = query.sort({ salary: 1 });
  }
  const jobs = await query;
  res.status(200).send(jobs);
});

module.exports = router;
