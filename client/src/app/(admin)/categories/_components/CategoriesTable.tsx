'use client'

import { useState } from 'react'
import { PlusIcon as Plus, PencilSimpleIcon as PencilSimple, TrashIcon as Trash } from '@phosphor-icons/react/ssr'
import { Table, THead, TBody, TR, TH, TD } from '@/components/ui/Table'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { EmptyState } from '@/components/ui/EmptyState'
import { FullPageSpinner } from '@/components/ui/Spinner'
import { PageHeader } from '@/components/ui/PageHeader'
import { apiFetch } from '@/lib/api'
import { useCategories } from '@/hooks/useCategories'
import type { Category } from '@/hooks/useCategories'
import { CategoryModal } from './CategoryModal'
import { useToast } from '@/components/ui/Toast'

export function CategoriesTable() {
  const { categories, isLoading, error, mutate } = useCategories()
  const toast = useToast()
  const [formOpen, setFormOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  function openCreate() {
    setEditingCategory(null)
    setFormOpen(true)
  }

  function openEdit(cat: Category) {
    setEditingCategory(cat)
    setFormOpen(true)
  }

  function openDelete(cat: Category) {
    setDeletingCategory(cat)
    setDeleteError(null)
    setDeleteOpen(true)
  }

  async function handleDelete() {
    if (!deletingCategory) return
    setDeleteLoading(true)
    setDeleteError(null)
    try {
      await apiFetch(`/api/admin/categories/${deletingCategory._id}`, { method: 'DELETE' })
      setDeleteOpen(false)
      mutate()
      toast('Categoría eliminada')
    } catch (err: unknown) {
      const e = err as Error
      setDeleteError(e.message ?? 'Error al eliminar')
    } finally {
      setDeleteLoading(false)
    }
  }

  if (isLoading) return <FullPageSpinner />
  if (error) return (
    <div className="rounded-xl border border-error-500/20 bg-error-100 p-6 text-sm text-error-600">
      Error al cargar categorías.
    </div>
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Categorías"
        description="Organiza los cursos por categorías"
        action={
          <Button size="sm" onClick={openCreate}>
            <Plus size={16} />
            Nueva categoría
          </Button>
        }
      />

      <div className="overflow-hidden rounded-xl border border-neutral-200 shadow-sm">
        <Table>
          <THead>
            <TR>
              <TH>Nombre</TH>
              <TH>Slug</TH>
              <TH>Descripción</TH>
              <TH></TH>
            </TR>
          </THead>
          <TBody>
            {categories.length === 0 ? (
              <TR>
                <td colSpan={4}>
                  <EmptyState
                    title="Sin categorías"
                    description="Crea la primera categoría para organizar los cursos."
                  />
                </td>
              </TR>
            ) : (
              categories.map((cat) => (
                <TR key={cat._id}>
                  <TD className="font-medium text-neutral-900">{cat.name}</TD>
                  <TD className="font-mono text-xs text-neutral-500">{cat.slug}</TD>
                  <TD className="text-neutral-600 text-sm max-w-xs truncate">
                    {cat.description || '—'}
                  </TD>
                  <TD>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(cat)}
                        className="rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
                        aria-label={`Editar ${cat.name}`}
                      >
                        <PencilSimple size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => openDelete(cat)}
                        className="rounded p-1 text-neutral-400 hover:bg-error-100 hover:text-error-600 transition-colors"
                        aria-label={`Eliminar ${cat.name}`}
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </TD>
                </TR>
              ))
            )}
          </TBody>
        </Table>
      </div>

      <CategoryModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSaved={() => {
          mutate()
          toast(editingCategory ? 'Categoría actualizada' : 'Categoría creada')
        }}
        category={editingCategory}
      />

      <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} title="Eliminar categoría" size="sm">
        <div className="space-y-4">
          <p className="text-sm text-neutral-600">
            ¿Eliminar{' '}
            <span className="font-medium text-neutral-900">"{deletingCategory?.name}"</span>?
            Los cursos asociados quedarán sin categoría.
          </p>
          {deleteError && <p className="text-sm text-error-600" role="alert">{deleteError}</p>}
          <div className="flex justify-end gap-3">
            <Button variant="ghost" size="sm" onClick={() => setDeleteOpen(false)} disabled={deleteLoading}>
              Cancelar
            </Button>
            <Button variant="destructive" size="sm" loading={deleteLoading} onClick={handleDelete}>
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
