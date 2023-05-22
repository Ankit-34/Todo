import React, { useEffect, useState } from 'react'
import { Button, Input, Modal, Table } from 'antd'
import moment from 'moment';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
// import ColumnGroup from 'antd/es/table/ColumnGroup';

const Home = () => {
    
    var data = [
        // {
        //     key : 1,
        //     task : "Finish Assignment-1",
        //     date : "2022-02-22"
        // },
        // {
        //     key : 2,
        //     task : "Finish Assignment-2",
        //     date : "2022-08-01"
        // },
        // {
        //     key : 3,
        //     task : "Finish Assignment-3",
        //     date : "2023-05-05"
        // },
        // {
        //     key : 4,
        //     task : "Finish Assignment-4",
        //     date : "2023-05-05"
        // },
        // {
        //     key : 5,
        //     task : "Finish Assignment-5",
        //     date : "2023-05-05"
        // },
        // {
        //     key : 6,
        //     task : "Finish Assignment-6",
        //     date : "2023-05-05"
        // },
        // {
        //     key : 7,
        //     task : "Finish Assignment-7",
        //     date : "2023-05-05"
        // },
        // {
        //     key : 8,
        //     task : "Finish Assignment-8",
        //     date : "2023-05-05"
        // },
        // {
        //     key : 9,
        //     task : "Finish Assignment-9",
        //     date : "2023-05-05"
        // },
        // {
        //     key : 10,
        //     task : "Finish Assignment-10",
        //     date : "2023-05-05"
        // },
        // {
        //     key : 11,
        //     task : "Finish Assignment-11",
        //     date : "2023-05-05"
        // },
        // {
        //     key : 12,
        //     task : "Finish Assignment-12",
        //     date : "2023-05-05"
        // },
        // {
        //     key : 13,
        //     task : "Finish Assignment-13",
        //     date : "2023-05-05"
        // },
        // {
        //     key : 14,
        //     task : "Finish Assignment-14",
        //     date : "2023-05-05"
        // },
        // {
        //     key : 15,
        //     task : "Finish Assignment-15",
        //     date : "2023-05-05"
        // },
        // {
        //     key : 16,
        //     task : "Finish Assignment-16",
        //     date : "2023-05-05"
        // },
        // {
        //     key : 17,
        //     task : "Finish Assignment-17",
        //     date : "2023-05-05"
        // },
        // {
        //     key : 18,
        //     task : "Finish Assignment-18",
        //     date : "2023-05-05"
        // },
        // {
        //     key : 19,
        //     task : "Finish Assignment-19",
        //     date : "2023-05-05"
        // },
        // {
        //     key : 20,
        //     task : "Finish Assignment-20",
        //     date : "2023-05-05"
        // },
        // {
        //     key : 21,
        //     task : "Finish Assignment-21",
        //     date : "2023-05-05"
        // },
        // {
        //     key : 22,
        //     task : "Finish Assignment-22",
        //     date : "2023-05-05"
        // }
    ]   

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
                        <EditOutlined onClick={()=>{
                            onEditStudent(record);
                        }}/>
                        <DeleteOutlined 
                            onClick={()=>{
                            onDeleteStudent(record);
                        }}
                        />
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
            okText: "delete",
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


  return (
    <div>
        <Table
            columns={columns}
            dataSource={dataSource}  
            pagination={{ total:totalTask, defaultPageSize: 3, onChange: (page)=>{
                setCurrPage(page); 
                console.log("Page changed data : ", dataSource.slice((page*3)-3,page*3));
            }}}
            rowClassName={(record) => date>record?.date ? 'invalid' :  'valid'}
        >
        </Table>            
        <Modal
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
                key={key}
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
        
        <Button onClick={handleAddStudent}>
            Add New Student
        </Button>
    </div>
  )
}

export default Home