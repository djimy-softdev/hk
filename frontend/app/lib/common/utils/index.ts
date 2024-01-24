import { redirect } from 'next/navigation';

export const formatCurrency = (amount: number, currency: string = 'JPY') => {
  return amount.toLocaleString('ja-JP', {
    style: 'currency',
    currency,
  });
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export function toQueryString(params: any) {
  let cleanObj = {};
  try {
    cleanObj = JSON.parse(JSON.stringify(params)); //remove undefined values
  } catch (e) {
    console.error('[toQueryString]: ', e);
  }

  return new URLSearchParams(cleanObj).toString();
}

export function handleHttpStatus(status: number) {
  if (status == 401) {
    console.error('[handleHttpStatus] 401');
    return redirect('/logout');
  }

  if (status >= 500) {
    throw new Error('Server error, please try again!');
  }

  if (status > 299) {
    return { message: 'Request error' };
  }
}
