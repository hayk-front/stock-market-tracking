import { SearchFormData } from "./types";

export const validateSearchQuery = (data: SearchFormData): boolean => {
  return data.query.trim().length > 0;
};

export const formatSearchQuery = (query: string): string => {
  return query.trim().toUpperCase();
};
