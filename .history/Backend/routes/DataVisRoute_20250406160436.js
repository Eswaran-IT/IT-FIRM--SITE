
import { getUserAnalytics } from "../controllers/DataVisController.js";

const router = express.Router();

// Route to fetch user analytics
router.get("/analytics", getUserAnalytics);

export default router;
