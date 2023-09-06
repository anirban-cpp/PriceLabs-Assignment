import { ApistoreDataType, FilterGroup, Listing } from "@/interfaces";
import { getPropertyTypes } from "@/utils/helperFunctions";
import { create } from "zustand";

const useApiDataStore = create<ApistoreDataType>((set) => ({
  filterGroups: undefined,
  listings: undefined,
  error: undefined,
  propertyTypes: undefined,
  checkedProperties: undefined,
  currentListing: undefined,
  currentPage: 1,
  pageInfo: { pageSize: 1, totalPages: 1 },
  listLoading: false,
  setListLoading: (value: boolean) => {
    set((state) => ({ ...state, listLoading: value }));
  },
  setPageInfo: (totalPages: number, pageSize: number) => {
    set((state) => ({
      ...state,
      pageInfo: { ...state.pageInfo, totalPages, pageSize },
    }));
  },
  setCurrentPage: (value?: number) => {
    set((state) => ({ ...state, currentPage: value }));
  },
  setTotalPages: (value?: number) => {
    set((state) => ({ ...state, totalPages: value }));
  },
  setCurrentListing: (value?: Listing) => {
    set((state) => ({
      ...state,
      currentListing: value,
    }));
  },
  setCheckedProperties: (checkedProperties?: string[]) => {
    set((state) => ({
      ...state,
      checkedProperties,
    }));
  },
  setFilterGroups: (value?: FilterGroup[]) => {
    set((state) => ({
      ...state,
      filterGroups: value,
    }));
  },
  setListings: (value?: Listing[]) => {
    set((state) => ({
      ...state,
      listings: value,
    }));
  },
  setError: (value?: unknown) => {
    set((state) => ({ ...state, error: value }));
  },
  setPropertyTypes: (value?: Listing[]) => {
    set((state) => {
      const propertyTypes = getPropertyTypes(value);
      return {
        ...state,
        propertyTypes,
      };
    });
  },
}));

export default useApiDataStore;
