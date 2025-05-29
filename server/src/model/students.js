import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        _id: { type: Number, required: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
        scores: {
            type: Map,
            of: Number,
            default: {}
        }
    },
    {
        toJSON: {
            virtuals: true,
            versionKey: false,
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
            }
        },
        toObject: {
            virtuals: true,
            versionKey: false,
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
            }
        }
    }
);

const Student = mongoose.model("Student", studentSchema, 'college');
export default Student;

