import AuditLog from '../models/AuditLog.js';

const createAuditLog = async ({ adminId, action, module, targetId, details, ip }) => {
  try {
    await AuditLog.create({ adminId, action, module, targetId, details, ip });
  } catch (error) {
    console.error('❌ Failed to create audit log:', error.message);
  }
};

export { createAuditLog };
