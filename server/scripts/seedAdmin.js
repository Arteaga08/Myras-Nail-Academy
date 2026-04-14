import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import AdminUser from '../models/AdminUser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const seed = async () => {
  const { MONGO_URI, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = process.env;

  if (!MONGO_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD || !ADMIN_NAME) {
    console.error('❌ Missing env variables: MONGO_URI, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME');
    process.exit(1);
  }

  await mongoose.connect(MONGO_URI);
  console.log('✅ MongoDB connected');

  const existing = await AdminUser.findOne({ email: ADMIN_EMAIL });

  if (existing) {
    console.log(`⚠️  Admin already exists: ${existing.email}`);
    await mongoose.disconnect();
    process.exit(0);
  }

  await AdminUser.create({
    name: ADMIN_NAME,
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
  });

  console.log(`✅ Admin created: ${ADMIN_EMAIL}`);
  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
