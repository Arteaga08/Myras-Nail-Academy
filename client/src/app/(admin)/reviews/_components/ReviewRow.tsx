import { TR, TD } from '@/components/ui/Table'
import { formatDate } from '@/lib/formatters'
import type { Review } from '@/hooks/useReviews'
import { DeleteReviewButton } from './DeleteReviewButton'

interface ReviewRowProps {
  review: Review
  onDeleted: () => void
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < rating ? 'text-amber-400' : 'text-neutral-200'}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  )
}

export function ReviewRow({ review, onDeleted }: ReviewRowProps) {
  const truncatedComment =
    review.comment && review.comment.length > 60
      ? review.comment.slice(0, 60) + '…'
      : review.comment

  return (
    <TR>
      <TD>
        <div>
          <p className="font-medium text-neutral-900">
            {review.userId.firstName} {review.userId.lastName}
          </p>
          <p className="text-xs text-neutral-400">{review.userId.email}</p>
        </div>
      </TD>
      <TD className="hidden text-neutral-700 md:table-cell">{review.courseId.title}</TD>
      <TD>
        <StarRating rating={review.rating} />
      </TD>
      <TD
        className="hidden max-w-xs text-sm text-neutral-500 lg:table-cell"
        title={review.comment ?? undefined}
      >
        {truncatedComment ?? <span className="text-neutral-300">—</span>}
      </TD>
      <TD className="hidden text-xs text-neutral-500 md:table-cell">
        {formatDate(review.createdAt)}
      </TD>
      <TD>
        <DeleteReviewButton reviewId={review._id} onDeleted={onDeleted} />
      </TD>
    </TR>
  )
}
