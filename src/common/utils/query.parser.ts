// External
import mongoose, { SortOrder } from 'mongoose';

// Types
export interface IRawQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  ordering?: string;
  [key: string]: string | string[] | undefined;
}

export interface IParsedOptions {
  page: number;
  pageSize: number;
  search?: string;
}

const RESERVED_KEYS: string[] = ['page', 'pageSize', 'search', 'ordering', 'vendorId'];

/**
 * Parses a Django-style ordering string into a Mongoose sort object.
 * Example: "-createdAt,name" -> { createdAt: -1, name: 1 }
 */
export function parseSort(ordering?: string): Record<string, SortOrder> {
  if (!ordering) {
    return { createdAt: -1 };
  }

  const sort: Record<string, SortOrder> = {};
  const fields: string[] = ordering.split(',');

  for (const field of fields) {
    const trimmed: string = field.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('-')) {
      const key: string = trimmed.substring(1);
      sort[key] = -1;
    } else {
      sort[trimmed] = 1;
    }
  }

  return sort;
}

/**
 * Parses raw query parameters into a Mongoose QueryFilter object.
 * Supports Django-style operators: __gte, __lte, __gt, __lt, __in, __icontains
 */
export function parseFilter<T>(query: IRawQuery): mongoose.QueryFilter<T> {
  const filter: Record<string, unknown> = {};

  for (const key in query) {
    if (RESERVED_KEYS.includes(key)) {
      continue;
    }

    const value: string | string[] | undefined = query[key];
    if (value === undefined || value === '') {
      continue;
    }

    // Handle Operators (e.g., price__gte)
    if (key.includes('__')) {
      const [field, operator] = key.split('__');
      
      if (!field || !operator) continue;

      if (!filter[field] || typeof filter[field] !== 'object') {
        filter[field] = {};
      }

      const fieldFilter = filter[field] as Record<string, unknown>;

      switch (operator) {
        case 'gte':
          fieldFilter.$gte = value;
          break;
        case 'lte':
          fieldFilter.$lte = value;
          break;
        case 'gt':
          fieldFilter.$gt = value;
          break;
        case 'lt':
          fieldFilter.$lt = value;
          break;
        case 'in': {
          const values: string[] = typeof value === 'string' ? value.split(',') : (value as string[]);
          fieldFilter.$in = values;
          break;
        }
        case 'icontains':
          fieldFilter.$regex = value;
          fieldFilter.$options = 'i';
          break;
        case 'ne':
          fieldFilter.$ne = value;
          break;
      }
    } else {
      // Direct exact match
      if (value === 'true') {
        filter[key] = true;
      } else if (value === 'false') {
        filter[key] = false;
      } else {
        filter[key] = value;
      }
    }
  }

  return filter as mongoose.QueryFilter<T>;
}

/**
 * Helper to extract standard pagination options
 */
export function parseOptions(query: IRawQuery): IParsedOptions {
  return {
    page: query.page ? parseInt(query.page, 10) : 1,
    pageSize: query.pageSize ? parseInt(query.pageSize, 10) : 10,
    search: query.search,
  };
}