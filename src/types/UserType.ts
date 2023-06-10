type User = {
  emp_id: string;
  emailID: string;
  password: string;
  role: string;
  name: {
    salutation: string;
    firstName: string;
    middleName: string;
    lastName: string;
  };
  empDetails: {
    dob: Date;
    aadhar: string;
    PAN: string;
    isMarried: string;
    gender: string;
    bloodGroup: string;
    qualification: string;
  };
  contactDetails: {
    contactno1: number;
    contactno2: number;
    // TODO Change to Objects
    permanentAddress: string;
    currentAddress: string;
  };
  workDetails: {
    status: string;
    designation: string;
    deparment: string;
    division: string;
    policyBand: number;
    natureOfEmployment: string;
    location: string;
  };
};
export default User;
