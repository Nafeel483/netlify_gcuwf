const router = require("express").Router();
const videosController = require("../controllers/videosController");

router.route("/").post(videosController.postVideo);
router.route("/").get(videosController.getAllVideos);
router.route("/").patch(videosController.updateVideo);
router.route("/").delete(videosController.deleteVideo);
router.route("/email").post(videosController.emailVideo);
router.route("/user").get(videosController.getUserVideos);
router.route("/single").get(videosController.getSingleVideo);
router.route("/multiple/email").post(videosController.sendMultipleEmail);

module.exports = router;
