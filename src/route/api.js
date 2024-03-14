const express=require('express');
const ProfileController=require("../controllers/ProfileController");
const ToDoListController=require("../controllers/ToDoListController");
const AuthVerifyMiddleware=require("../middleware/AuthVerifyMiddleware");
const router=express.Router();

router.post("/CreateProfile",ProfileController.CreateProfile);
router.post("/UserLogin",ProfileController.UserLogin);


router.get("/SelectProfile",AuthVerifyMiddleware,ProfileController.SelectProfile);
router.put("/UpdateProfile",AuthVerifyMiddleware,ProfileController.UpdateProfile);

router.post("/CreateToDo",AuthVerifyMiddleware,ToDoListController.CreateToDo);
router.get("/SelectToDo",AuthVerifyMiddleware,ToDoListController.SelectToDo);
router.put("/UpdateToDo",AuthVerifyMiddleware,ToDoListController.UpdateToDo);
router.delete("/DeleteToDo",AuthVerifyMiddleware,ToDoListController.DeleteToDo);

module.exports=router;