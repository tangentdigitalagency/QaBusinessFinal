import React, { Component } from "react";
import { Form, Button, Input, Progress, InputNumber, Select  } from "antd";
import CommonComponents from "./CommonComponents";
import Axios from "axios";
import XMLParser from 'react-xml-parser';
import ProgressLottie from './ProgressLottie';
import {Link,withRouter} from "react-router-dom"; 
import { ArrowLeftOutlined } from '@ant-design/icons';
const {Option} = Select;

class S8BusinessRevenueAndNoOfEmployees extends Component {
  state = {
    error: '',
    loading: false,
    response: ''
  }
  onFinish = (values) => {
    this.props.setRevenue(values.annual_revenue_over_next_12_months);
    this.props.setNumberOfEmployees(values.number_of_employees);
    console.log("Success:", values);
    this.setState({
      loading: true 
    }, this.PostDataOfBusinessInsurance(this.props.postData));
    this.props.history.push("/thank-you-commercial")
  };
  PostDataOfBusinessInsurance = (postData) => {
    console.log(postData);
    Axios.post("https://quotehound.leadspediatrack.com/post.do", null, {
      params: postData,
    })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          this.setState({
            loading: false,
          },() => {
            this.props.nextStep();

          this.props.callMediaAlpha();
        
          });
        }
      })
      .catch((err) => {
        if (err) throw err;
      });
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  componentWillReceiveProps = () => {
    if (this.state.response !== '') {
      this.setState({ response: '' })
    }
  }


  render() {
    const { response, loading } = this.state
    return (
      <div className="card shadow-lg" style={{ borderRadius: "25px" }}>
       <Progress percent={100} status="active" showInfo={false} className="pbar"/>

        <CommonComponents
          currentStep={this.props.currentStep}
          totalSteps={this.props.totalSteps}
          previousStep={this.props.previousStep}
        />
         <div className="p-2">
           <Link to="/step7">
                    <Button  type="primary" shape="circle"  >
                        <ArrowLeftOutlined className="anticon" />
                    </Button>
                    </Link>
                </div>
        <div className="d-flex" style={{ minHeight: "60vh" }}>
          <div
            className="card-body d-xl-flex justify-content-center align-items-center"
            align="center"
            style={{ paddingTop: "0px" }}
          >
            {loading ?
              <ProgressLottie /> :
              <React.Fragment>
                {(response !== "") ? <h5>{response}
                </h5> :
                  <Form
                    name="basic"
                    className="mywidth"
                    onFinish={this.onFinish}
                    initialValues={{
                      annual_revenue_over_next_12_months: this.props.annual_revenue_over_next_12_months,
                      number_of_employees: this.props.number_of_employees
                    }}
                    onFinishFailed={this.onFinishFailed}
                  >
                    <h3>One more thing...</h3>
                    <br />
                    <h5>What Is Your Annual Revenue Over The Next 12 Months</h5>
                    <Form.Item
                      name="annual_revenue_over_next_12_months"
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Your Revenue ",
                        }
                      ]}
                    >
                      <InputNumber
                      className="numInput"
                        size="large"
                        defaultValue={1000}
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                
                      />
                    </Form.Item>
                    <h5>
                      Number Of Employees
                    </h5>
                    <Form.Item
                      name="number_of_employees"
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Your Number Of Employees",
                        }
                      ]}
                    >
                     <Select size="large" name="number_of_employees" >
                  <Option disabled selected="" value=""> -- select number of employees -- </Option>
                  <Option value="10">1-10</Option>
                  <Option value="20">11-50</Option>
                  <Option value="50">51-100</Option>
                  <Option value="75">101-250</Option>
                  <Option value="100">251-500</Option>
                  <Option value="200">500+</Option>
                </Select>
                    </Form.Item>
                    <Form.Item>
                    </Form.Item>
                    {/* <Link to="step9"> */}
                    <Form.Item>
                      <Button type="primary" htmlType="submit" block size="large">
                        Get My Quote
                      </Button>
                    </Form.Item>
                    {/* </Link> */}
                  </Form>
                }
              </React.Fragment>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(S8BusinessRevenueAndNoOfEmployees);


