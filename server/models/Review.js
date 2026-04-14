import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    comment: {
      type: String,
      maxlength: [1000, 'Comment cannot exceed 1000 characters'],
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course reference is required'],
    },
  },
  { timestamps: true }
);

// One review per student per course
reviewSchema.index({ userId: 1, courseId: 1 }, { unique: true });

// Recalculate course averageRating and reviewCount
reviewSchema.statics.calcAverageRating = async function (courseId) {
  const stats = await this.aggregate([
    { $match: { courseId } },
    {
      $group: {
        _id: '$courseId',
        avgRating: { $avg: '$rating' },
        count: { $sum: 1 },
      },
    },
  ]);

  const Course = mongoose.model('Course');

  if (stats.length > 0) {
    await Course.findByIdAndUpdate(courseId, {
      averageRating: Math.round(stats[0].avgRating * 10) / 10,
      reviewCount: stats[0].count,
    });
  } else {
    await Course.findByIdAndUpdate(courseId, {
      averageRating: 0,
      reviewCount: 0,
    });
  }
};

reviewSchema.post('save', function () {
  this.constructor.calcAverageRating(this.courseId);
});

reviewSchema.post('findOneAndDelete', function (doc) {
  if (doc) doc.constructor.calcAverageRating(doc.courseId);
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
