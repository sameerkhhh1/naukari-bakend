const router = require("express").Router();

const adminModel = require("../Models/admin");
const adminAuth = require("../middleware/adminAuth");
router.post("/create", adminAuth, async (req, res) => {
  const newJob = new adminModel(req.body);
  await newJob.save();
  res.status(201).send({ success: true });
});

router.get("/locations", async (req, res) => {
  try {
    const famousCities = ["delhi", "noida", "gurgaon", "hyderabad", "mumbai"];

    const jobs = await adminModel.find();

    const countMap = {
      Delhi: 0,
      Noida: 0,
      Gurgaon: 0,
      Hyderabad: 0,
      Mumbai: 0,
    };

    jobs.forEach((job) => {
      const loc = job.location.toLowerCase();

      if (loc === "delhi") countMap.Delhi++;
      if (loc === "noida") countMap.Noida++;
      if (loc === "gurgaon") countMap.Gurgaon++;
      if (loc === "hyderabad") countMap.Hyderabad++;
      if (loc === "mumbai") countMap.Mumbai++;
    });

    const result = Object.keys(countMap).map((city) => ({
      location: city,
      count: countMap[city],
    }));

    res.send(result);
  } catch (err) {
    res.status(500).send("Error fetching locations");
  }
});

router.get("/all", async (req, res) => {
  const { exp, sort, location, type, search, salary } = req.query;
  // console.log(salary);
  // console.log(type);

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
