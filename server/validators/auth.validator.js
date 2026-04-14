import { z } from 'zod';

const registerSchema = z.object({
  firstName: z.string().min(1, 'El nombre es requerido').max(50),
  lastName: z.string().min(1, 'El apellido es requerido').max(50),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

const adminLoginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

export { registerSchema, loginSchema, adminLoginSchema };
