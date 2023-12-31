import Database from "../Database/index.js";
function CourseRoutes(app) {
  app.get("/api/courses", (req, res) => {
    const courses = Database.courses;
    res.send(courses);
  });

  app.post("/api/courses", (req, res) => {
    const course = { ...req.body, _id: new Date().getTime().toString() };
    Database.courses.push(course);
    res.send(course);
  });

  app.delete("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    Database.courses = Database.courses.filter((c) => c._id !== id);
    res.sendStatus(204);
  });

  app.put("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = req.body;
    Database.courses = Database.courses.map((c) =>
      c._id === id ? { c, ...course } : c
    );
    res.send(course);
  });

  app.get("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    if (id === "undefined") return res.send(Database.courses[0]);
    const course = Database.courses.find((c) => c._id === id);
    if (!course) return res.status(404).send("Course not found");
    res.send(course);
  });
}
export default CourseRoutes;
