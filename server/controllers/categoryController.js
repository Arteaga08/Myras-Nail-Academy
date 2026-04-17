import asyncHandler from '../utils/asyncHandler.js';
import Category from '../models/Category.js';
import { createAuditLog } from '../services/auditService.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.status(200).json({ status: 'success', data: categories });
});

// @desc    Create a category
// @route   POST /api/admin/categories
// @access  Admin
const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const slug = req.body.slug || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const category = await Category.create({ name, slug, description });

  await createAuditLog({
    adminId: req.user._id,
    action: 'CREATE_CATEGORY',
    module: 'Category',
    targetId: category._id,
    details: { name },
    ip: req.ip,
  });

  res.status(201).json({ status: 'success', data: category });
});

// @desc    Update a category
// @route   PUT /api/admin/categories/:id
// @access  Admin
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: 'after',
    runValidators: true,
  });
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  await createAuditLog({
    adminId: req.user._id,
    action: 'UPDATE_CATEGORY',
    module: 'Category',
    targetId: category._id,
    details: { name: category.name },
    ip: req.ip,
  });

  res.status(200).json({ status: 'success', data: category });
});

// @desc    Delete a category
// @route   DELETE /api/admin/categories/:id
// @access  Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  await createAuditLog({
    adminId: req.user._id,
    action: 'DELETE_CATEGORY',
    module: 'Category',
    targetId: category._id,
    details: { name: category.name },
    ip: req.ip,
  });

  res.status(200).json({ status: 'success', message: 'Category deleted' });
});

export { getCategories, createCategory, updateCategory, deleteCategory };
