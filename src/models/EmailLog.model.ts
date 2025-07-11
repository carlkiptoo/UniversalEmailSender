import mongoose from 'mongoose';

const EmailLogSchema = new mongoose.Schema({
    jobId: {type: String},
    to: {type: [String], required: true},
    from: {type: String, required: true},
    subject: {type: String, required: true},
    template: {type: String},
    provider: {type: String},
    status: {type: String, enum: ['sent', 'failed'], required: true},
    error: {type: String},
    requestedAt: {type: Date},
    sentAt: {type: Date},
}, {timestamps: true});

export const EmailLog = mongoose.model('EmailLog', EmailLogSchema);