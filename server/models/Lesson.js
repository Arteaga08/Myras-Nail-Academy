import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Lesson title is required'],
      trim: true,
    },
    order: {
      type: Number,
      required: [true, 'Lesson order (video number) is required'],
    },
    description: {
      type: String,
      default: null,
    },
    videoUrl: {
      type: String,
      required: [true, 'Video URL is required'],
    },
    duration: {
      type: Number,
      default: 0,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    resources: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course reference is required'],
    },
  },
  { timestamps: true }
);

// Ensure order is unique within a course
lessonSchema.index({ courseId: 1, order: 1 }, { unique: true });

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;
