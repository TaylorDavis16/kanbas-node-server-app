import db from "../Database/index.js";
function AssignmentRoutes(app) {
  app.get("/api/courses/:cid/Assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = db.assignments.filter((a) => a.course === cid);
    res.send(assignments);
  });

  app.post("/api/courses/:cid/Assignments", (req, res) => {
    const { cid } = req.params;
    if (db.courses.find((c) => c._id === cid) === undefined) {
      return res.status(404).send("Course not found");
    }
    const newAssignment = {
      ...req.body,
    };
    db.assignments.push(newAssignment);
    res.send(newAssignment);
  });

  app.put("/api/courses/:cid/Assignments/:aid", (req, res) => {
    const { cid, aid } = req.params;
    if (db.courses.find((c) => c._id === cid) === undefined) {
      return res.status(404).send("Course not found");
    }
    const assignment = req.body;
    db.assignments = db.assignments.map((a) =>
      a.course === cid && a._id === aid ? { a, ...assignment } : a
    );
    res.send(assignment);
  });

  app.delete("/api/courses/:cid/Assignments/:aid", (req, res) => {
    const { cid, aid } = req.params;
    if (db.courses.find((c) => c._id === cid) === undefined) {
      return res.status(404).send("Course not found");
    }
    db.assignments = db.assignments.filter(
      (a) => a.course !== cid || a._id !== aid
    );
    res.sendStatus(200);
  });
}
export default AssignmentRoutes;
