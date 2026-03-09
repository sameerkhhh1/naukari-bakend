const AppliedJob = require("../Models/apply");
const router = require("express").Router();
const adminModel = require("../Models/admin");

router.post("/apply/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Find job from Jobs collection
    const job = await adminModel.findById(id);
    if (!job) {
      return res.status(404).send({ message: "Job not found" });
    }
    const jobData = job.toObject();
    delete jobData._id;
    // 2️⃣ Save same job in AppliedJobs collection
    await AppliedJob.create(jobData);

    // 3️⃣ Delete from Jobs collection
    await adminModel.findByIdAndDelete(id);

    res.status(200).send({ message: "Applied Successfully" });
  } catch (error) {
    res.status(400).send({ message: "Error applying job" });
  }
});

router.get("/applied", async (req, res) => {
  const jobs = await AppliedJob.find();
  res.status(200).send(jobs);
});
router.get("/detail/:id", async (req, res) => {
  const { id } = req.params;

  const job = await adminModel.findById(id);
  console.log(job);
  res.status(200).send(job);
});

module.exports = router;
