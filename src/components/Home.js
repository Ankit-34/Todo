import React, { useEffect, useState } from 'react'
import { Button, Input, Modal, Table, DatePicker, Tooltip } from 'antd'
import moment from 'moment';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import '../Style/Home.css'
// import ColumnGroup from 'antd/es/table/ColumnGroup';

const Home = () => {
    
    var data = []   

    const columns = [
        {
            key:'1',
            title:"Task",
            dataIndex: 'task',
        },
        {
            key:'2',
            title:"Date",
            dataIndex: 'date',
            sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
            sortDirections: ['ascend']
        },
        {
            key:'3',
            title:"Options",
            render: (record) => {
                return (
                    <>
                        <Tooltip title="Edit Task">
                            <EditOutlined onClick={()=>{
                                onEditStudent(record);
                            }}
                            style={{
                                margin: "5px",
                                color: "black",
                                fontSize: "18px"
                                }}
                            />
                        </Tooltip>

                        <Tooltip title="Delete Task">
                            <DeleteOutlined 
                                onClick={()=>{
                                    onDeleteStudent(record);
                                }}
                                style={{
                                    margin: "5px",
                                    color: "red",
                                    fontSize: "17px",
                                }}
                            />
                        </Tooltip>
                    </>
                );
            },
        }
    ];

    const date = new Date().toJSON().slice(0, 10);

    const [dataSource, setDataSource] = useState(data); 
    const [totalTask, setTotalTask] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const [key, setKey] = useState(1);
    const [isEditing, setIsEditing] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [isNewStudent, setIsNewStudent] = useState(false);
    const [newStudent, setNewStudent] = useState({key : key, task : String, date : String});
                

    const handleAddStudent = () => {
        setIsNewStudent(true);
    }

    const onEditStudent = (record) => {
        setIsEditing(true);
        setEditingStudent({...record});
    }

    const onDeleteStudent = (record) => {
        Modal.confirm({
            title: "Are you sure ?",
            okText: "Delete",
            onOk: () => {
                setTotalTask(totalTask-1);
                setDataSource((prev)=>{
                    return prev.filter(student => student.key !== record.key);
                });
            },
        });
    };

    const resetEditing = () => {
        setIsEditing(false);
        setEditingStudent(false);
    }

    const [filteredData, setFilteredData] = useState([]);

    const handleDateChange = (dates) => {
        // console.log("dates : ",)
        if (dates && dates.length === 2) {
        const startDate = dates[0];
        const endDate = dates[1];
        // console.log("data here : ",dataSource);
        const filtered = dataSource.filter((item) => {
            console.log("item", item);
            const itemDate = moment(item.date);
            return itemDate.isSameOrAfter(startDate) && itemDate.isSameOrBefore(endDate);
        });
        setFilteredData([...filtered]);
        console.log("Filtered : ", filtered);
        } else {
      setFilteredData([]);
    }
  };


  return (
    <div className='container'>
        <DatePicker.RangePicker 
         className='datepicker'
         onChange={handleDateChange} 
        />

        <Button className='add-btn' onClick={handleAddStudent}>
            Add Task
        </Button>

        <Table
        className='table'
            columns={columns}
            // dataSource={dataSource} 
            dataSource={filteredData.length > 0 ? filteredData : dataSource} 
            pagination={{ total:totalTask, defaultPageSize: 3, onChange: (page)=>{
                setCurrPage(page); 
                console.log("Page changed data : ", dataSource.slice((page*3)-3,page*3));
            }}}
            rowClassName={(record) => date>record?.date ? 'invalid' :  'valid'}
        >
        </Table>            
        <Modal
            style={{
                    width: "50%"
                }}
            title="Edit Student"
            open={isEditing}
            onCancel={()=>{
                resetEditing();
            }}
            onOk={()=>{

                setDataSource((prev)=>{
                    return prev.map(student => {
                        if(student.key=== editingStudent.key)
                        {
                            return editingStudent;
                        }
                        else{
                            return student;
                        }
                    })
                })
                resetEditing();
            }}
        >
            <Input 
                style={{
                    padding: "5px",
                    margin: "10px 0"
                }}
                value={editingStudent?.task}
                onChange={(e)=>{
                    setEditingStudent((prev)=>{
                        return {
                            ...prev, 
                            task:e.target.value}
                    })
                }}
            />
            <Input  
                // key={key}
                type='date'
                value={editingStudent?.date} 
                className={()=>date>newStudent?.date ? 'invalid' :  'valid'}
                onChange={(e)=>{
                    setEditingStudent((prev)=>{
                        return {
                            ...prev, 
                            date:e.target.value}
                    })
                }}
                />

        </Modal>

        <Modal
            title="Add student"
            open={isNewStudent}
            okText= "Save"
            okButtonProps={{ style: { backgroundColor: 'black', color: 'white' } }} 
            onCancel={()=>setIsNewStudent(false)}
            onOk={()=>{
                    setDataSource([...dataSource, newStudent]);
                    // data.push(newStudent);
                    setTotalTask(totalTask+1);
                    setKey(key+1);
                    setIsNewStudent(false);
            }}
        >
                <Input 

                    style={{
                        padding: "5px",
                        margin: "10px 0"
                    }}
                    type='text'
                    name='text'
                    placeholder='Add your task'
                    onChange={(e)=>{
                        setNewStudent((prev) => {
                            return{
                                ...prev,
                                key : key,
                                task : e.target.value
                            }
                        })
                    }}
                    required
                />
                <Input 
                    name='date'
                    type='date'
                    onChange={(e)=>{
                        setNewStudent((prev) => {
                            return{
                                ...prev,
                                date : e.target.value
                            }
                        })
                    }}
                    required
                />

        </Modal>
        
        
    </div>
  )
}

export default Home