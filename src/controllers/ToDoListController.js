const ToDoListModel=require("../models/ToDoListModel");

exports.CreateToDo=async (req,res)=>{
    try{
        let reqBody=req.body;
        let ToDoSubject=reqBody['TodoSubject']
        let ToDoDescription=reqBody['TodoDescription']
        let UserName=req.headers['username']
        let ToDoStatus=req.headers['New']
        let TodoCreateDate=Date.now()
        let PostBody={
            UserName:UserName,
            ToDoSubject:ToDoSubject,
            ToDoDescription:ToDoDescription,
            ToDoStatus:ToDoStatus,
            TodoCreateDate:TodoCreateDate
        }
        let result = await ToDoListModel.create(PostBody);

        res.status(201).json({ status: "success", data: result });
    }catch(err){
        res.json({status:"fail",message:err.message});
    }
}

exports.SelectToDo = async (req, res) => {
    try {
        let UserName = req.headers['username'];
        let data = await ToDoListModel.find({ UserName: UserName });
        res.status(200).json({ status: "success", data: data });
    } catch (err) {
        res.json({ status: "fail", message: err.message });
    }
}

exports.UpdateToDo = async (req, res) => {
    try {
        const { TodoSubject, TodoDescription, _id } = req.body;

        const result = await ToDoListModel.updateOne({ _id }, { $set: { TodoSubject, TodoDescription } });

        if (result.n === 0) {
            return res.status(404).json({ status: "fail", message: "No ToDo item found with the provided ID" });
        }

        res.status(200).json({ status: "success", data: result });
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message });
    }
}

exports.DeleteToDo = async (req, res) => {
    try {
        const result = await ToDoListModel.deleteOne({ _id: req.body._id });

        res.status(result.deletedCount === 0 ? 404 : 200).json({
            status: result.deletedCount === 0 ? "fail" : "success",
            message: result.deletedCount === 0 ? "No ToDo item found with the provided _id" : "ToDo item deleted successfully"
        });
    } catch (err) {
        res.status(500).json({ status: "fail", message: err.message });
    }
}
