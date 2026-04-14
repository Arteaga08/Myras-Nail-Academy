import nodemailer from 'nodemailer';

const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Email to student confirming course enrollment
const sendEnrollmentConfirmationEmail = async ({ studentEmail, studentName, courseTitle }) => {
  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"Myra's Nail Academy" <${process.env.SMTP_USER}>`,
      to: studentEmail,
      subject: `¡Bienvenida al curso: ${courseTitle}!`,
      html: `
        <h2>¡Hola ${studentName}!</h2>
        <p>Tu pago fue procesado exitosamente. Ya tienes acceso completo al curso:</p>
        <h3>${courseTitle}</h3>
        <p>Ingresa a tu cuenta para comenzar a aprender.</p>
        <br/>
        <p>Con cariño,<br/>Myra's Nail Academy 💅</p>
      `,
    });

    console.log(`✅ Enrollment email sent to ${studentEmail}`);
  } catch (error) {
    console.error(`❌ Failed to send enrollment email: ${error.message}`);
  }
};

// Email to admin notifying a new enrollment
const notifyAdminNewEnrollment = async ({ studentName, studentEmail, courseTitle, amount }) => {
  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"Myra's Nail Academy" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `💰 Nueva inscripción: ${courseTitle}`,
      html: `
        <h2>Nueva inscripción recibida</h2>
        <p><strong>Alumna:</strong> ${studentName} (${studentEmail})</p>
        <p><strong>Curso:</strong> ${courseTitle}</p>
        <p><strong>Monto:</strong> $${(amount / 100).toFixed(2)} MXN</p>
      `,
    });

    console.log(`✅ Admin notification sent`);
  } catch (error) {
    console.error(`❌ Failed to send admin notification: ${error.message}`);
  }
};

export { sendEnrollmentConfirmationEmail, notifyAdminNewEnrollment };
