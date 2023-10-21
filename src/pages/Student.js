import { useEffect, useState } from "react";
import axios from 'axios';
import Pagination from '../Pagination/Pagination'
import { useRef } from "react";

const { Link } = require("react-router-dom");

function Student() {
    const [student, setStudent] = useState([]);
    const [loading, setloading] = useState(true);
    const [inputErrorList, setinputErrorList] = useState({})
    
    const [pages,setPages] = useState(8);
    const [currentPage,setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(pages);
    const [search,setSearch] = useState("");
    // Tạo một biến ref để lưu lại id của hàm setTimeout
    const timerId = useRef(null);
    useEffect(()=>{
        axios.get(`https://localhost:7024/Students`).then(res =>{   
            setStudent(res.data);
            setloading(false);
            console.log(">>>res",res)
        });
    },[])
     /* delete */

    const deleteStudent = (e, id) =>{
        e.preventDefault();
        const thisClick  = e.currentTarget;
        thisClick.innerText ="Delete .....";

        axios.delete(`https://localhost:7024/Students/${id}`)
            .then(res =>{  
                //debugger
                alert("xóa thành công");
                thisClick.closest("tr").remove();
            })
            .catch(function (err) {
                if(err.response){
                   if(err.response.status === 400){
                       setinputErrorList(err.response.data.errors)
                      thisClick.innerText ="Delete";
                   }
                   if(err.response.status === 500){
                       alert(err.response.data)
                       setloading(false)
                   }
                }
           });
    }

    /* delete */
    if(loading){
        return(
            <div>
                Loading....
            </div>
        )
    }
    
    var StudentDetails = "";
    StudentDetails =
                student.filter((item)=>{
                    return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search)
                }).map((item,index)=>{
        return(
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.date}</td>
                <td>{item.gtinh}</td>
                <td>{item.address}</td>
                <td>{item.classId}</td>
                <td>
                    <Link to={`/students/${item.id}`} className="btn btn-success">Edit</Link>
                </td>
                <td>
                    <button type="button" onClick={(e) => deleteStudent(e, item.id)} className="btn btn-danger">Delete</button>
                </td>
            </tr>
        )    
    })
    
    //tạo phân trang
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPosts = StudentDetails.slice(firstPostIndex, lastPostIndex);
    // lấy theo số pages   
    const handlePages = (event)=>{
        const value = event.target.value
        // kiểm tra điều kiện
        const isvalue = !isNaN(value) && value > 0 && value < 50;
        if(isvalue){
            // Nếu có hàm setTimeout trước đó, hủy bỏ nó
            if(timerId.current){
                clearTimeout(timerId.current);
            }
            // Tạo một hàm setTimeout mới, và lưu lại id của nó
            //debugger
            timerId.current = setTimeout(() => {
                setPostPerPage(parseInt(value)) 
            }, 1600);      
        }else{
            //alert("bạn hãy nhập lại số hợp lệ!!!");
            window.location.reload()
        }
    }
    // seach by product
    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Student List 
                                <Link to="/students/create" className="btn btn-primary float-end">Add Student</Link>
                                <div className="col-search">
                                        <input type="text" id="inputPassword8" 
                                            placeholder='Search for product information' 
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="form-control" 
                                        />
                                </div>   
                            </h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Date</th>
                                        <th>Sex</th>
                                        <th>Address</th>
                                        <th>Class_ID</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentPosts} 
                                </tbody>
                            </table>       
                            <div className="pagin-header">      
                                    <Pagination 
                                        totalPosts = {StudentDetails.length}
                                        postsPerPage = {postPerPage}
                                        setCurrentPage = {setCurrentPage}
                                        currentPage ={currentPage}
                                    />
                                    <div className="col-auto">
                                        <input type="text" id="inputPassword6" 
                                            placeholder='Enter the number of pages' 
                                            className="form-control" 
                                            aria-describedby="passwordHelpInline"
                                            onChange={handlePages}
                                            />
                                    </div>                 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    
    )    
}


export default Student;