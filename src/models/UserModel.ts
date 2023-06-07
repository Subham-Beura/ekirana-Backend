import { Schema, model } from "mongoose";
import UserType from "../types/UserType";
const UserSchema = new Schema({
  emp_id: {
    type: String,
    unique: true,
  },
  emailID: String,
  password: String,
  role: String,
  name: {
    salutation: String,
    firstName: String,
    middleName: String,
    lastName: String,
  },
  empDetails: {
    dob: Date,
    aadhar: String,
    PAN: String,
    isMarried: String,
    gender: String,
    bloodGroup: String,
    qualification: String,
  },
  contactDetails: {
    contactno1: Number,
    contactno2: Number,
    // TODO Change to Objects
    permanentAddress: String,
    currentAddress: String,
  },
  workDetails: {
    status: String,
    designation: String,
    deparment: String,
    division: String,
    policyBand: Number,
    natureOfEmployment: String,
    location: String,
  },
});
export default model<UserType>("users", UserSchema);
