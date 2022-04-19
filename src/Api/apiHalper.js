import axios from "axios";
import * as c from "./constant";

// ? REGISTRATION API
export const user_registration = async (data) => {
  try {
    const url = c.USER;
    const res = await axios.post(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? OTP API mail
export const user_OTP_mail = async (data) => {
  try {
    const url = c.USER + "/" + data.id + "/" + data.otp;
    console.log(url);
    const res = await axios.get(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? MOBILE OTP verifiction
export const user_mobile_verification = async (data) => {
  try {
    const url = c.USER_MOBILE_OTP + "/" + data.id + "/" + data.otp;
    console.log("url", url);
    const res = await axios.get(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

//?  MOBILE NUMBER API
export const user_mobile = async (data) => {
  try {
    const url = c.USER_MOBILE;
    const res = await axios.patch(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

//? USER LOGIN API SECTION
export const user_login = async (data) => {
  try {
    const url = c.USER + "/login";
    const res = await axios.post(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? EDIT PROFILE USER DATA SHOW BY ID
export const user_data_id = async (data) => {
  try {
    const url = c.USER + "/" + data.id;
    const res = await axios.get(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? user update profile
export const user_update = async (data) => {
  try {
    const url = c.USER;
    const res = await axios.patch(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? Subscription Get
export const subscription_get = async (data) => {
  try {
    const url = c.SUBSCRIPTION;
    const res = await axios.get(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? USER QUESTION API SECTION
export const user_question = async (data) => {
  try {
    const url = c.USER_QUESTION;
    const res = await axios.get(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};
// ? user report id for dashBoard
export const user_report_id_dashBoard = async (data) => {
  try {
    const url = c.USER_REPORT + "/" + data.id;
    console.log("url", url);
    const res = await axios.get(url);
    return res;
  } catch (e) {
    return e.response;
  }
};
// ? USER UNIQ ID
export const user_report_dashBoard_uniqRequrd = async (data) => {
  try {
    const url = c.SEND_REQUEST + "/unique-records/" + data.id;
    console.log("url", url);
    const res = await axios.get(url);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? Active User payment by Id
export const user_payment_details = async (data) => {
  try {
    const url = c.PAYMENT + "/" + "paymenthistory" + "/" + data.id;
    console.log("url", url);
    const res = await axios.get(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

//? Subscription Get
export const subscription_getID = async (data) => {
  try {
    const url = c.SUBSCRIPTION + "/" + data.id;
    const res = await axios.get(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? ADD USER QUESTION
export const add_user_question = async (data) => {
  try {
    const url = c.ADD_USER_QUESTION;
    const res = await axios.post(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? LAB NAME LIST
export const labname_list = async (data) => {
  try {
    const url = c.GET_LABLISTNAME;
    const res = await axios.get(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? SEND REQUEST
export const send_request = async (data) => {
  try {
    const url = c.SEND_REQUEST;
    const res = await axios.post(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? SEND REQUEST LIST
export const send_request_list = async (data) => {
  try {
    const url = c.USER_REQUEST;
    const res = await axios.get(url + "/" + data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? Subscription Get
export const add_payment = async (data) => {
  try {
    const url = c.PAYMENT;
    const res = await axios.post(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};
//  ? NOTIFICATION
export const getuserNotification = async (data) => {
  try {
    const url = c.NOTIFICATION + "/" + data;
    const res = await axios.get(url);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? USER PROFILE IMAGES
export const user_profile_img = async (data) => {
  try {
    const url = c.MOB_IMAGE;
    const res = await axios.patch(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? user email id  edit
export const user_email_id = async (data) => {
  try {
    const url = c.USER_EMAIL_EDIT + "/" + data.emailId + "/" + data.id;
    console.log("url", url);
    const res = await axios.get(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ?USER CHANGES PASSWORD
export const user_changes_email_Otp = async (data) => {
  try {
    const url = c.USER + "/change-email";
    const res = await axios.patch(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? USER FORGOT PASSWORD
export const user_forgot_password = async (data) => {
  try {
    const url = c.USER + "/forgot-password-request";
    const res = await axios.patch(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};
