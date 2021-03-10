import React, { Component } from "react";
import { Form,  Button,Input, Progress} from "antd";
import CommonComponents from "./CommonComponents"; 
import {Link,withRouter} from "react-router-dom"; 
import { ArrowLeftOutlined } from '@ant-design/icons';
class S3BusinessNameAndWebsite extends Component {
  onFinish = (values) => {
    // this.props.nextStep();
    this.props.setBusinessName(values.legal_business_name);
    this.props.setBusinessWebsite(values.business_website);
    console.log("Success:", values);
    this.props.history.push("/step4")
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  

  render() {
    return (
      <div className="card shadow-lg" style={{ borderRadius: "25px" }}>
                <Progress percent={37.5} status="active" showInfo={true} className="pbar"/>

        <CommonComponents
          currentStep={this.props.currentStep}
          totalSteps={this.props.totalSteps}
          previousStep={this.props.previousStep}
        />
         <div className="p-2">
           <Link to="/step2" >
                    <Button type="primary" shape="circle"  >
                        <ArrowLeftOutlined className="anticon" />
                    </Button>
                    </Link>
                </div>
        <div className="d-flex" style={{ minHeight: "60vh" }}>
          <div
            className="card-body d-xl-flex justify-content-center align-items-center"
            align="center"
            style={{ paddingTop:"0px" }}
          >
            <Form
              name="basic"
              className="mywidth"
              onFinish={this.onFinish}
              initialValues={{
                legal_business_name: this.props.legal_business_name,
                business_website: this.props.business_website
              }}
              onFinishFailed={this.onFinishFailed}
            >
              <h3>What is your business name</h3>
              <br />
              <h5>Legal Business Name</h5>
              <Form.Item
                name="legal_business_name"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please Enter Your Legal Business Name",
                  },
                  {
                      max:100, message:'Max Length Of First Name Is 100 Characters'
                  }
                ]}
              >
                <Input  
                  size="large"
                  placeholder="Business Name"
                />
              </Form.Item>
              <h5>Website (Optional)
              </h5>
              <Form.Item
                name="business_website"
                hasFeedback
                rules={[ 
                  {
                    pattern: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(\/\S*)?$/i,
                    message: "Please Enter Valid Website",
                  }
                ]}
              >
                <Input  
                  size="large"
                  placeholder="e.g: www.mywebsite.com"
                />
              </Form.Item>
              {/* <Link to="/step4"> */}
              <Form.Item>
                <Button type="primary" htmlType="submit" block size="large">
                  Next
                </Button>
              </Form.Item>
              {/* </Link> */}
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(S3BusinessNameAndWebsite);
