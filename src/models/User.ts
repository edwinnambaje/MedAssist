import * as mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string,
  medicineDetails: mongoose.Schema.Types.ObjectId[];
  resetToken?: string;
}
export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  medicineDetails: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MedicineDetails"
    }
  ],
  resetToken: { type: String },
});
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;