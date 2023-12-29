import React,{useEffect,useState}  from "react";
import { Form, Input, Select, Button ,message ,List } from 'antd';
import axios from "axios";
import styles from './FeedbackPage.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const { Option } = Select;
function Feedback() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [currentPage, setCurrentPage] = useState(1);
  const login_info = JSON.parse(localStorage.getItem("login_token"));
 
  const [searchTerm, setSearchTerm] = useState('');
  const [feedbackData, setFeedbackData] = useState([]);
  // Function to convert date to "days ago" format
  const formatDateAgo = (dateString) => {
    const currentDate = new Date();
    const inputDate = new Date(dateString);
    const timeDifference = currentDate - inputDate;
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
  
    if (minutesDifference < 1) {
      return 'Just now';
    } else if (minutesDifference < 60) {
      return `${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'} ago`;
    } else if (hoursDifference < 24) {
      return `${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'} ago`;
    } else if (daysDifference === 1) {
      return '1 day ago';
    } else {
      return `${daysDifference} days ago`;
    }
  };
  
  const onFinish = (values) => {
    axios
      .post(`http://127.0.0.1:8000/api/addFeedback`, values, {
        headers: {
          "Content-Type": "multipart/form-data",
           "Authorization": `Bearer ${login_info.token}`,
        },
      })
      .then(({ data }) => {
       
        if (data.status == '200') {
        
          messageApi.open({
            type: "success",
            content: "FeedBack is added",
          });
          form.resetFields();
          fetchData();
        } else {
          messageApi.open({
            type: "error",
            content: "Something went wrong",
          });
        }
      })
      .catch(({ response }) => {
        
          messageApi.open({
            type: "warning",
            content: "Something Went Wrong",
          });
       
      });
  };
   // State to store feedback data
   const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/getFeedback/?page=${currentPage}&search=${searchTerm}`,{ headers: {
       "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${login_info.token}`,
     },}); // Replace with your API endpoint
      setFeedbackData(response.data);
    } catch (error) {
    }
  };
   // Effect to fetch feedback data from the API
   useEffect(() => {
     fetchData();
   }, [currentPage,searchTerm]);
 
   // State to store comments
   const [comments, setComments] = useState({});
 
   // Function to update comments
   const handleCommentChange = (feedbackId, comment) => {
     setComments({
       [feedbackId]: comment,
       content: comment,
       feedback_id:feedbackId,
       'user_id': login_info.id
     });
   };
   const handleSubmit = async () => {
      try {
        const response = await axios.post(`http://127.0.0.1:8000/api/addComment`,comments,{ headers: {
         "Content-Type": "multipart/form-data",
         "Authorization": `Bearer ${login_info.token}`,
       },}); // Replace with your API endpoint
       if (response?.status == 200) {
        setComments('');
        messageApi.open({
          type: "success",
          content: "Comment Added",
        });
        fetchData();
      }else{
        messageApi.open({
          type: "error",
          content: "something went wrong",
        });
      }
      } catch (error) {
        messageApi.open({
          type: "error",
          content: "something went wrong",
        });
      }
  };
  return (<>
  <div className={styles.feedbackItem}>
    <h6 className="d-flex justify-content-center">Add Feedback</h6>
    <Form
     form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      onFinish={onFinish}
      autoComplete="off"
    >
       {contextHolder}
      <Form.Item
        label="Item"
        name="item"
        rules={[{ required: true, message: 'Please enter the item!' }]}
      >
        <Input placeholder="Item" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please enter the description!' }]}
      >
        <Input.TextArea placeholder="Description" />
      </Form.Item>

      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: 'Please select a category!' }]}
      >
        <Select placeholder="Select a category">
          <Option value="Bug Report">Bug Report</Option>
          <Option value="Feature Request">Feature Request</Option>
          <Option value="Improvement">Improvement</Option>
         
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
    <div className={styles.feedbackContainer}>
      
       {/* Search bar */}
       <div className={styles.searchBar}>
        <Input
          placeholder="Search FeedBack..."
          value={searchTerm}
          className="form-control mb-4"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className={styles.feedbackList}>
        {feedbackData?.data?.map((feedback) => (
          <div key={feedback.id} className={styles.feedbackItem}>
            <h6 className={styles.feedbackTitle}>Title: {feedback.item}</h6>
            <p className={styles.feedbackCategory}><strong>Category:</strong> {feedback.category}</p>
            <p className={styles.feedbackDescription}>Description: {feedback.description}</p>
            <ReactQuill
              className={styles.commentEditor}
              value={comments[feedback.id] || ''}
              onChange={(value) => handleCommentChange(feedback.id, value)}
              placeholder="Add your comment..."
            />
             <Button className="mt-2 btn btn-primary btn-sm" onClick={handleSubmit}>
        Add Comments
      </Button>
      {feedback.comments.length > 0 && (
      <List
            className={styles.commentList}
            header={`${
              feedback.comments.length
            } ${feedback.comments.length === 1 ? 'Comment' : 'Comments'}`}
            itemLayout="horizontal"
            dataSource={feedback.comments}
            renderItem={(comment) => (
              <li className={styles.commentItem} key={comment.id}>
                <div className={styles.commentContent}>
                  <p
                    dangerouslySetInnerHTML={{ __html: comment.content }}
                  />
                  <div className="d-flex justify-content-between">
                  <span className={styles.commentUser}>By: {comment?.user?.name}</span>
                  <span className={styles.commentDateTime}>{formatDateAgo(comment?.created_at)}</span>

                  </div>
                </div>
              </li>
            )}
          />
          )}
          </div>
        ))}



        
         {/* Pagination controls */}
      <div className="d-flex">
      <button
          onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
          className="btn btn-primary btn-sm"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="p-2">{`Page ${currentPage}`}</span>
        <button
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          disabled={currentPage === feedbackData.last_page} className="btn btn-primary btn-sm"
        >
          Next
        </button>
      </div>
       
      </div>
     
    </div>
    </>
  );
}

export default Feedback;
