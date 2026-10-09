const { spawn } = require("child_process");
const path = require("path");

const backendDir = path.resolve(__dirname, "../../backend");
console.log("Seeding Firestore marketplace database from backend:", backendDir);

const py = spawn("python", ["-m", "app.firebase.setup_schema"], {
  cwd: backendDir,
  stdio: "inherit",
  shell: true,
});

py.on("close", (code) => {
  if (code === 0) {
    console.log("✅ Seed completed successfully!");
  } else {
    console.error("❌ Seed failed with exit code:", code);
    process.exit(code || 1);
  }
});
