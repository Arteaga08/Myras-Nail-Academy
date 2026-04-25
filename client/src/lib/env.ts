  function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing required env var: ${name}. Define it in client/.env.local before starting the app.`
    )
  }
  return value
}

export const STRIPE_PUBLISHABLE_KEY = required(
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
)

export const CLOUDINARY_CLOUD_NAME = required(
  'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME',
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
)

export const CLOUDINARY_UPLOAD_PRESET = required(
  'NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET',
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
 )
