import { Button, DatePicker, Form, Input, message, Select } from "antd";
import styled from "styled-components";
import React, { useState } from "react";
import { BASE_URL } from "../constants/BaseURL";
import axios from "axios";
import { TOKEN } from "../constants/Token";
import { useHistory } from "react-router-dom";
import NavMenu from "../components/NavMenu";
import { OPTIONS } from "../constants/Options";
import { IValues } from "../Types";

const { Item } = Form;

const Wrapper = styled.div`
  width: 97%;
  margin: 2rem auto;
  form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  form > * {
    width: 32%;
  }
`;

const AddApplication: React.FC = () => {
  const {
    likelihoodOptions,
    receptionMailOptions,
    referralOptions,
    relocationOptions,
    remoteOptions,
    sourceOptions,
    statusOptions,
    strategyOptions,
    tagsOptions,
    typeOptions,
  } = OPTIONS;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  // const [formData, setFormData] = useState();

  const onFinish = async (values: IValues) => {
    setLoading(true);
    const {
      contactName,
      contactPhone,
      position,
      linkToOpening,
      ...rest
    } = values;

    const updatedValues = {
      ...rest,
      position: [
        {
          positionTitle: values.position,
          linkToOpening: values.linkToOpening,
        },
      ],
      mainContact: [
        {
          mainContactName: values.contactName,
          mainContactPhone: values.contactPhone,
        },
      ],
    };

    axios
      .post(`${BASE_URL}/application/createApplication`, updatedValues, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        const result = response.data;
        setLoading(false);
        message.success(result.message, 3);
        form.resetFields();
        history.push("/tracker");
      })
      .catch((error) => {
        message.error(error.message, 3);
        setLoading(false);
      });
  };

  const dateFormat = "ddd, Do MMM, YYYY";

  return (
    <Wrapper>
      <NavMenu />
      <Form name="applicationForm" form={form} onFinish={onFinish}>
        <div>
          <label>Date Applied</label>
          <Item
            name="dateApplied"
            rules={[
              {
                required: true,
                message: "Please select the application date!",
              },
            ]}>
            <DatePicker format={dateFormat} style={{ width: "100%" }} />
          </Item>
        </div>

        <div>
          <label>Name of Company</label>
          <Item
            name="company"
            rules={[
              { required: true, message: "Please input the company name!" },
            ]}>
            <Input placeholder="Name of Company" />
          </Item>
        </div>

        <div>
          <label>Location</label>
          <Item
            name="location"
            rules={[
              { required: true, message: "Please input the company location!" },
            ]}>
            <Input placeholder="Location" />
          </Item>
        </div>

        <div>
          <label>Position</label>
          <Item
            name="position"
            rules={[
              { required: true, message: "Please input the job position!" },
            ]}>
            <Input placeholder="Position" />
          </Item>
        </div>

        <div>
          <label>Link To Opening</label>
          <Item
            name="linkToOpening"
            rules={[
              {
                required: true,
                message: "Please input the link to the opening!",
              },
            ]}>
            <Input addonBefore="https://" placeholder="Link To Opening" />
          </Item>
        </div>

        <div>
          <label>Type</label>
          <Item
            name="type"
            rules={[
              { required: true, message: "Please select the job type!" },
            ]}>
            <Select placeholder="Select Type Options" options={typeOptions} />
          </Item>
        </div>

        <div>
          <label>Source</label>
          <Item
            name="source"
            rules={[
              { required: true, message: "Please select the job source!" },
            ]}>
            <Select placeholder="Select Source" options={sourceOptions} />
          </Item>
        </div>

        <div>
          <label>Strategy</label>
          <Item
            name="strategy"
            rules={[
              { required: true, message: "Please select a job hunt strategy!" },
            ]}>
            <Select placeholder="Select Strategy" options={strategyOptions} />
          </Item>
        </div>

        <div>
          <label>Copy of Cover Letter</label>
          <Item
            name="coverLetter"
            rules={[
              {
                required: true,
                message: "Please input the link to the copy of cover letter!",
              },
            ]}>
            <Input
              addonBefore="https://"
              placeholder="Enter link to copy of cover letter"
            />
          </Item>
        </div>

        <div>
          <label>Copy of Resume</label>
          <Item
            name="resume"
            rules={[
              {
                required: true,
                message: "Please input the link to the copy of resume!",
              },
            ]}>
            <Input
              addonBefore="https://"
              placeholder="Enter link to copy of Resume"
            />
          </Item>
        </div>

        <div>
          <label>Referral?</label>
          <Item
            name="referral"
            rules={[
              { required: true, message: "Please select a referral option!" },
            ]}>
            <Select placeholder="Select Referral" options={referralOptions} />
          </Item>
        </div>

        <div>
          <label>Relocation</label>
          <Item
            name="relocation"
            rules={[
              { required: true, message: "Please select a relocation option!" },
            ]}>
            <Select
              placeholder="Select Relocation Option"
              options={relocationOptions}
            />
          </Item>
        </div>

        <div>
          <label>Remote?</label>
          <Item
            name="remote"
            rules={[
              { required: true, message: "Please select a remote option!" },
            ]}>
            <Select
              placeholder="Select Remote Option"
              options={remoteOptions}
            />
          </Item>
        </div>

        <div>
          <label>Main Contact Name</label>
          <Item
            name="contactName"
            rules={[
              { required: true, message: "Please input a contact name!" },
            ]}>
            <Input placeholder="Contact Name" />
          </Item>
        </div>

        <div>
          <label>Main Contact Phone</label>
          <Item
            name="contactPhone"
            rules={[
              {
                required: true,
                message: "Please input the contact phone number!",
              },
            ]}>
            <Input placeholder="Contact Phone" />
          </Item>
        </div>

        <div>
          <label>Reception Mail (thanks for applying)</label>
          <Item
            name="receptionMail"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: "Please select a reception mail option!",
              },
            ]}>
            <Select
              placeholder="Select Reception Mail Options"
              options={receptionMailOptions}
            />
          </Item>
        </div>

        <div>
          <label>Status</label>
          <Item
            name="status"
            rules={[
              {
                required: true,
                message: "Please select the job status option!",
              },
            ]}>
            <Select
              placeholder="Select Status Options"
              options={statusOptions}
            />
          </Item>
        </div>

        <div>
          <label>Likelihood of Hiring</label>
          <Item
            name="likelihoodOfHiring"
            rules={[
              {
                required: true,
                message: "Please select the likelihood of hiring option!",
              },
            ]}>
            <Select
              placeholder="Select Likelihood Options"
              options={likelihoodOptions}
            />
          </Item>
        </div>

        <div>
          <label>Last Time Contacted</label>
          <Item
            name="lastTimeContacted"
            rules={[
              {
                required: true,
                message: "Please include the last time you were contacted!",
              },
            ]}>
            <DatePicker format={dateFormat} style={{ width: "100%" }} />
          </Item>
        </div>

        <div>
          <label>Tags</label>
          <Item
            name="tags"
            rules={[
              {
                required: true,
                message: "Please select multiple appropriate tags!",
              },
            ]}>
            <Select
              mode="tags"
              placeholder="Select Tags"
              options={tagsOptions}
            />
          </Item>
        </div>

        <div>
          <Item></Item>
        </div>

        <div>
          <Button loading={loading} type="primary" htmlType="submit">
            Add Application
          </Button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddApplication;