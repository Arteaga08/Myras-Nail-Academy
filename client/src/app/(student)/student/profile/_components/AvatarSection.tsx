'use client'

import { useState, useRef } from 'react'
import { createAvatar } from '@dicebear/core'
import { lorelei } from '@dicebear/collection'
import { CameraIcon as Camera, ArrowsClockwiseIcon as Refresh } from '@phosphor-icons/react/ssr'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import { studentApiFetch } from '@/lib/studentApi'
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '@/lib/env'
import type { StudentProfile } from '@/hooks/useStudentProfile'

const DICEBEAR_OPTIONS = {
  backgroundType: ['solid', 'gradientLinear'] as const,
  beard: [] as const,
  beardProbability: 0,
  earringsProbability: 80,
  eyebrows: ['variant03','variant04','variant05','variant06','variant07','variant08','variant09','variant11','variant12','variant02','variant01'],
  eyes: ['variant02','variant09','variant10','variant11','variant14','variant15','variant17','variant18','variant20','variant21','variant23','variant24'],
  frecklesProbability: 35,
  glasses: ['variant01','variant03','variant04'],
  hair: ['variant13','variant14','variant15','variant16','variant17','variant18','variant19','variant20','variant21','variant23','variant24','variant26','variant29','variant31','variant32','variant33','variant35','variant36','variant37','variant38','variant40','variant41','variant42','variant43','variant45','variant46','variant48'],
  hairAccessoriesProbability: 60,
  head: ['variant04'],
  mouth: ['happy01','happy02','happy03','happy04','happy05','happy06','happy07','happy08','happy09','happy10','happy11','happy12','happy13','happy14','happy15','happy16','happy17','happy18'],
  nose: ['variant01','variant02','variant03','variant04','variant06'],
  backgroundColor: ['d1d4f9', 'ffd5dc'],
}

function generateAvatar(seed: string): string {
  return createAvatar(lorelei, { ...DICEBEAR_OPTIONS, seed } as unknown as Parameters<typeof createAvatar>[1]).toDataUri()
}

interface AvatarSectionProps {
  profile: StudentProfile
  onSuccess: () => void
}

export function AvatarSection({ profile, onSuccess }: AvatarSectionProps) {
  const showToast = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [previewSeed, setPreviewSeed] = useState(profile._id)

  const currentAvatar = profile.profilePicture || generateAvatar(previewSeed)
  const isDiceBear = !profile.profilePicture

  const handleNewAvatar = () => {
    // Generate a new random seed to get a different avatar
    setPreviewSeed(crypto.randomUUID())
  }

  const handleSaveDiceBear = async () => {
    setIsSaving(true)
    try {
      const dataUri = generateAvatar(previewSeed)
      await studentApiFetch('/api/auth/me', {
        method: 'PUT',
        body: JSON.stringify({ profilePicture: dataUri }),
      })
      showToast('Avatar guardado.', 'success')
      onSuccess()
    } catch {
      showToast('No se pudo guardar el avatar.', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      )

      if (!res.ok) {
        const errBody = await res.json().catch(() => null)
        throw new Error(errBody?.error?.message ?? 'Error al subir la imagen')
      }

      const data = await res.json()

      await studentApiFetch('/api/auth/me', {
        method: 'PUT',
        body: JSON.stringify({ profilePicture: data.secure_url }),
      })
      showToast('Foto actualizada.', 'success')
      onSuccess()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'No se pudo subir la foto.'
      showToast(message, 'error')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Avatar preview */}
      <div className="relative">
        <img
          src={currentAvatar}
          alt="Tu avatar"
          className="h-28 w-28 rounded-full border-4 border-rose-100 object-cover shadow-md"
        />
      </div>

      {/* Name */}
      <p className="font-display text-base font-semibold text-neutral-900">
        {profile.firstName} {profile.lastName}
      </p>

      {/* DiceBear controls */}
      <div className="flex w-full flex-col gap-2">
        <Button
          variant="secondary"
          size="sm"
          fullWidth
          onClick={handleNewAvatar}
          type="button"
        >
          <Refresh size={15} />
          Generar otro avatar
        </Button>

        {isDiceBear && previewSeed !== profile._id && (
          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={handleSaveDiceBear}
            loading={isSaving}
            type="button"
          >
            Guardar este avatar
          </Button>
        )}
      </div>

      {/* Cloudinary upload */}
      <div className="w-full">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          variant="ghost"
          size="sm"
          fullWidth
          onClick={() => fileInputRef.current?.click()}
          loading={isUploading}
          type="button"
        >
          <Camera size={15} />
          Subir foto propia
        </Button>
      </div>
    </div>
  )
}
