import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../_components/Loading";
import { useNavigate } from "react-router-dom";

function StudentCreate() {

    const [inputErrorList, setinputErrorList] = useState({})
    const [loading,setloading] =useState(false);
    const navigate = useNavigate();
    // khai báo 1 state student và hàm thay đổi giá trị setstudent
    // giá trị ban đầu là 1 object có thuộc tính. và là chuỗi rỗng
    const [student, setStudent] = useState({ 
        name:'',
        date:'',
        gtinh:'',
        address:'',
        classId:''
    });


    const handleInput =(e)=>{
        e.persist(); //e.persist(): gọi pt persist của đt e để ngăn chặn việc ReactJs tái sử dụng lại đối tượng e. giúp cho việc truy cập các thuộc tính của e sau khi sự kiện xảy ra không bị lỗi.
        setStudent({...student,[e.target.name]: e.target.value}); // dùng để cập nhật giá trị student, nhận vào 1 object mới từ sao chép giá trị object cũ
    }

    const saveStudent =(e)=>{
        e.preventDefault(); //ngăn chặn hành vi của sự kiện submit form gửi dữ liệu lên server và làm mới trang web
        setloading(true)
        const data ={
            name: student.name,
            date: student.date,
            gtinh: student.gtinh,
            address: student.address,
            classId: student.classId
        }
        axios.post(`https://localhost:7024/Students`, data)
            .then((res) => {
                alert("thêm thành công");    
                navigate('/students')        
                setloading(false)
            })
            .catch(function (err) {           
                 if(err.response){
                    if(err.response.status === 400){
                        setinputErrorList(err.response.data.errors)
                        setloading(false)
                    }
                    if(err.response.status === 500){
                        alert(err.response.data)
                        setloading(false)
                    }
                 }
            });
    }
    if(loading){
        return(
            <Loading/>
        )
    }
    return(
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Add Student
                                    <Link to="/students" className="btn btn-danger float-end">
                                        Back
                                    </Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit ={saveStudent}>
                                        <div className="mb-3">
                                            <label>Name</label>
                                            <input type="text" name="name" value={student.name} onChange={handleInput} className="form-control"/>
                                            <span className="text-danger">{inputErrorList.name}</span>
                                        </div>
                                        <div className="mb-3">
                                            <label>Date</label>
                                            <input type="date" name="date" value={student.date} onChange={handleInput} className="form-control"/>
                                            <span className="text-danger">{inputErrorList.date}</span>
                                        </div>
                                        <div className="mb-3">
                                            <label>Sex</label>
                                            <input type="text" name="gtinh" value={student.gtinh} onChange={handleInput} className="form-control"/>
                                            <span className="text-danger">{inputErrorList.gtinh}</span>
                                        </div>
                                        <div className="mb-3">
                                            <label>Address</label>
                                            <input type="text" name="address" value={student.address} onChange={handleInput} className="form-control"/>
                                            <span className="text-danger">{inputErrorList.address}</span>
                                        </div>
                                        <div className="mb-3">
                                            <label>Class Id</label>
                                            <input type="text" name="classId" value={student.classId} onChange={handleInput} className="form-control"/>
                                            <span className="text-danger">{inputErrorList.classId}</span>
                                        </div>
                                        <div className="mb-3">
                                            <button type="submit"  className="btn btn-primary">Save Student</button>
                                        </div>
                                </form>                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default StudentCreate;