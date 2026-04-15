/**
 * TEST SEED — Solo para pruebas en desarrollo
 * Crear: 1 usuario estudiante + 1 categoría + 1 curso publicado + 3 lecciones
 * Borrar después de terminar las pruebas de Stripe.
 *
 * Uso: npm run seed:test
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import User from '../models/User.js';
import Category from '../models/Category.js';
import Course from '../models/Course.js';
import Lesson from '../models/Lesson.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const seed = async () => {
  const { MONGO_URI } = process.env;

  if (!MONGO_URI) {
    console.error('❌ MONGO_URI is required in .env');
    process.exit(1);
  }

  await mongoose.connect(MONGO_URI);
  console.log('✅ MongoDB connected');

  // ── 1. Usuario de prueba ──────────────────────────────────────────────────
  let user = await User.findOne({ email: 'estudiante@test.com' });
  if (user) {
    console.log('⚠️  Test user already exists — skipping creation');
  } else {
    user = await User.create({
      firstName: 'Estudiante',
      lastName: 'Test',
      email: 'estudiante@test.com',
      password: 'Test1234!',
    });
    console.log(`✅ User created: ${user.email}`);
  }

  // ── 2. Categoría ─────────────────────────────────────────────────────────
  let category = await Category.findOne({ slug: 'unas-acrilicas' });
  if (category) {
    console.log('⚠️  Category already exists — skipping creation');
  } else {
    category = await Category.create({
      name: 'Uñas Acrílicas',
      slug: 'unas-acrilicas',
      description: 'Técnicas completas de uñas acrílicas',
    });
    console.log(`✅ Category created: ${category.name}`);
  }

  // ── 3. Curso publicado ────────────────────────────────────────────────────
  let course = await Course.findOne({ slug: 'curso-test-acrilicas' });
  if (course) {
    console.log('⚠️  Course already exists — skipping creation');
  } else {
    course = await Course.create({
      title: 'Curso Test — Acrílicas desde Cero',
      slug: 'curso-test-acrilicas',
      description:
        'Curso de prueba para validar el flujo de compra con Stripe. Aprende técnicas fundamentales de uñas acrílicas.',
      shortDescription: 'Aprende acrílicas desde cero — curso de prueba Stripe.',
      price: 999,
      isPublished: true,
      isFeatured: true,
      category: category._id,
      thumbnail: null,
      previewVideoUrl: null,
      totalLessons: 3,
      totalDuration: 45,
    });
    console.log(`✅ Course created: "${course.title}" — $${course.price} — ID: ${course._id}`);
  }

  // ── 4. Lecciones ─────────────────────────────────────────────────────────
  const existingLessons = await Lesson.countDocuments({ courseId: course._id });
  if (existingLessons > 0) {
    console.log(`⚠️  Lessons already exist for this course — skipping creation`);
  } else {
    await Lesson.insertMany([
      {
        courseId: course._id,
        order: 1,
        title: 'Introducción y materiales necesarios',
        description: 'Conoce todos los materiales que usaremos durante el curso.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: 10,
        isFree: true,
      },
      {
        courseId: course._id,
        order: 2,
        title: 'Preparación de la uña natural',
        description: 'Limpieza, desbridado y aplicación de primer.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: 20,
        isFree: false,
      },
      {
        courseId: course._id,
        order: 3,
        title: 'Aplicación del acrílico paso a paso',
        description: 'Mezcla perfecta, bola correcta y moldeo profesional.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: 15,
        isFree: false,
      },
    ]);
    console.log('✅ 3 lessons created');
  }

  // ── Resumen ───────────────────────────────────────────────────────────────
  console.log('\n─────────────────────────────────────────');
  console.log('✅ Test data seeded');
  console.log(`📚 Course ID : ${course._id}`);
  console.log('Credentials for the test student live in .env.example (TEST_STUDENT_EMAIL / TEST_STUDENT_PASSWORD).');
  console.log('─────────────────────────────────────────\n');

  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
