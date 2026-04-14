import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AdminUser',
      required: [true, 'Admin reference is required'],
    },
    action: {
      type: String,
      required: [true, 'Action is required'],
      uppercase: true,
    },
    module: {
      type: String,
      required: [true, 'Module is required'],
      lowercase: true,
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    ip: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

auditLogSchema.index({ adminId: 1, createdAt: -1 });
auditLogSchema.index({ module: 1, action: 1 });

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

export default AuditLog;
