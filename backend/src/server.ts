import "./config/dotenv";
import { app } from "./app";

const PORT = process.env.PORT || 8787;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
