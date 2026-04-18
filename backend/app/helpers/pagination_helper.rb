module PaginationHelper
  # scopeをページネーションして { records:, meta: } を返す
  def paginate(scope, page: 1, per_page: 20)
    page     = [page.to_i, 1].max
    per_page = [per_page.to_i, 1].max

    total_count = scope.count
    total_pages = (total_count.to_f / per_page).ceil
    total_pages = 1 if total_pages.zero?

    records = scope.limit(per_page).offset((page - 1) * per_page)

    {
      records: records,
      meta: {
        currentPage:  page,
        totalPages:   total_pages,
        totalCount:   total_count
      }
    }
  end
end
