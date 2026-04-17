import PDFDocument from 'pdfkit';
import asyncHandler from '../utils/asyncHandler.js';
import Enrollment from '../models/Enrollment.js';

// Brand colors (from globals.css tokens)
const ROSE_500   = '#E91E63';
const ROSE_100   = '#FFE4EC';
const GOLD_400   = '#E6C068';
const NUDE_50    = '#FDFAF7';
const NEUTRAL_700 = '#3F3F46';
const NEUTRAL_400 = '#A1A1AA';
const WHITE      = '#FFFFFF';

/**
 * GET /api/enrollments/:enrollmentId/certificate
 * Streams a PDF certificate for a completed enrollment.
 */
export const getCertificate = asyncHandler(async (req, res) => {
  const { enrollmentId } = req.params;

  const enrollment = await Enrollment.findById(enrollmentId)
    .populate('courseId', 'title slug')
    .populate('userId', 'firstName lastName');

  if (!enrollment) {
    res.status(404);
    throw new Error('Inscripción no encontrada');
  }

  // Only the owner can download
  if (enrollment.userId._id.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('No tienes permiso para descargar este certificado');
  }

  if (enrollment.progressPercent < 100) {
    res.status(403);
    throw new Error('Debes completar el curso para obtener el certificado');
  }

  const studentName = `${enrollment.userId.firstName} ${enrollment.userId.lastName}`;
  const courseTitle  = enrollment.courseId.title;
  const courseSlug   = enrollment.courseId.slug ?? 'curso';
  const completedDate = enrollment.completedAt
    ? new Date(enrollment.completedAt).toLocaleDateString('es-MX', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });

  // ── PDF setup ──────────────────────────────────────────────────────
  const doc = new PDFDocument({
    size: 'A4',
    layout: 'landscape',
    margin: 0,
    info: {
      Title: `Certificado — ${courseTitle}`,
      Author: "Myra's Nail Academy",
    },
  });

  const W = doc.page.width;   // 841.89pt
  const H = doc.page.height;  // 595.28pt

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="certificado-${courseSlug}.pdf"`
  );
  doc.pipe(res);

  // ── Background ────────────────────────────────────────────────────
  doc.rect(0, 0, W, H).fill(NUDE_50);

  // ── Top accent bar (rose gradient simulation — solid) ─────────────
  doc.rect(0, 0, W, 10).fill(ROSE_500);

  // ── Bottom accent bar ─────────────────────────────────────────────
  doc.rect(0, H - 10, W, 10).fill(ROSE_500);

  // ── Decorative corner circles ─────────────────────────────────────
  doc.circle(0, 0, 80).fillOpacity(0.08).fill(ROSE_500);
  doc.circle(W, H, 80).fillOpacity(0.08).fill(ROSE_500);
  doc.circle(W, 0, 50).fillOpacity(0.06).fill(GOLD_400);
  doc.fillOpacity(1);

  // ── Outer border ──────────────────────────────────────────────────
  doc
    .rect(24, 24, W - 48, H - 48)
    .lineWidth(1.5)
    .strokeColor(ROSE_100)
    .stroke();

  // ── Inner border ──────────────────────────────────────────────────
  doc
    .rect(32, 32, W - 64, H - 64)
    .lineWidth(0.5)
    .strokeColor(GOLD_400)
    .stroke();

  // ── Academy name ──────────────────────────────────────────────────
  doc
    .font('Helvetica-Bold')
    .fontSize(13)
    .fillColor(ROSE_500)
    .text("MYRA'S NAIL ACADEMY", 0, 70, {
      align: 'center',
      characterSpacing: 3,
    });

  // ── Decorative line under academy name ────────────────────────────
  const lineY = 94;
  doc
    .moveTo(W / 2 - 60, lineY)
    .lineTo(W / 2 + 60, lineY)
    .lineWidth(1)
    .strokeColor(GOLD_400)
    .stroke();

  // ── "CERTIFICADO DE FINALIZACIÓN" ────────────────────────────────
  doc
    .font('Helvetica')
    .fontSize(10)
    .fillColor(NEUTRAL_400)
    .text('CERTIFICADO DE FINALIZACIÓN', 0, 108, {
      align: 'center',
      characterSpacing: 2,
    });

  // ── "Se certifica que" ────────────────────────────────────────────
  doc
    .font('Helvetica')
    .fontSize(14)
    .fillColor(NEUTRAL_700)
    .text('Se certifica que', 0, 155, { align: 'center' });

  // ── Student name ──────────────────────────────────────────────────
  doc
    .font('Helvetica-Bold')
    .fontSize(34)
    .fillColor(ROSE_500)
    .text(studentName, 60, 182, { align: 'center', width: W - 120 });

  // ── Separator dots ────────────────────────────────────────────────
  const sepY = 240;
  doc
    .moveTo(W / 2 - 40, sepY)
    .lineTo(W / 2 + 40, sepY)
    .lineWidth(0.8)
    .strokeColor(ROSE_100)
    .stroke();

  // ── "ha completado exitosamente el curso:" ────────────────────────
  doc
    .font('Helvetica')
    .fontSize(13)
    .fillColor(NEUTRAL_700)
    .text('ha completado exitosamente el curso:', 0, 255, { align: 'center' });

  // ── Course title ──────────────────────────────────────────────────
  doc
    .font('Helvetica-Bold')
    .fontSize(20)
    .fillColor(NEUTRAL_700)
    .text(courseTitle, 80, 282, { align: 'center', width: W - 160 });

  // ── Gold underline under course title ─────────────────────────────
  const courseUnderlineY = 320;
  doc
    .moveTo(W / 2 - 80, courseUnderlineY)
    .lineTo(W / 2 + 80, courseUnderlineY)
    .lineWidth(1.5)
    .strokeColor(GOLD_400)
    .stroke();

  // ── Completion date ───────────────────────────────────────────────
  doc
    .font('Helvetica')
    .fontSize(11)
    .fillColor(NEUTRAL_400)
    .text(`Fecha de finalización: ${completedDate}`, 0, 340, { align: 'center' });

  // ── Signature line ────────────────────────────────────────────────
  const sigY = 430;
  const sigX = W / 2 - 60;
  doc
    .moveTo(sigX, sigY)
    .lineTo(sigX + 120, sigY)
    .lineWidth(1)
    .strokeColor(NEUTRAL_400)
    .stroke();

  doc
    .font('Helvetica-Bold')
    .fontSize(10)
    .fillColor(NEUTRAL_700)
    .text('Myra García', sigX - 10, sigY + 6, { width: 140, align: 'center' });

  doc
    .font('Helvetica')
    .fontSize(9)
    .fillColor(NEUTRAL_400)
    .text('Directora Académica', sigX - 10, sigY + 20, { width: 140, align: 'center' });

  // ── Footer ────────────────────────────────────────────────────────
  doc
    .font('Helvetica')
    .fontSize(8)
    .fillColor(NEUTRAL_400)
    .text("myrasnailacademy.com", 0, H - 28, { align: 'center' });

  doc.end();
});
