export interface CheckboxProps {
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  label?: string;
}

export interface PropertyListProps {
  checked?: boolean;
  selectedTab?: string;
  searchInput?: string;
}

export interface FilterProps {
  title?: string;
  minValue?: number;
  maxValue?: number;
  onMinIncrement?: () => void;
  onMaxIncrement?: () => void;
  onMinDecrement?: () => void;
  onMaxDecrement?: () => void;
}

export interface PropertyListItemProps {
  rating?: number;
  reviews?: number;
  sleeps?: number;
  bedrooms?: number;
  bathrooms?: number;
  imageSrc?: string;
  alt?: string;
  match?: number;
  checked?: boolean;
  name?: string;
  propertyId?: string;
  onClick: () => void;
}

export interface RatingProps {
  rating?: number;
  reviews?: number;
}

export interface SearchProps {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export interface TabsProps {
  onTabSelect?: (value?: string) => void;
  selectedTab?: string;
}

export type ProperyDataType = {
  name?: string | undefined;
  imgSrc?: string | undefined;
  match?: number | undefined;
  bedroomCount?: number | undefined;
  bathroomCount?: number | undefined;
  sleepCount?: number | undefined;
  rating?: number | undefined;
  reviews?: number | undefined;
  checked?: boolean;
};

// api data types

export interface ApiDataType {
  data: {
    results: Results;
    requestmarker: string;
    __typename: string;
  };
}

export interface Results {
  id: string;
  typeaheadSuggestion: TypeaheadSuggestion;
  geography: Geography;
  propertyRedirectUrl: any;
  __typename: string;
  destination: Destination;
  destinationMessage: DestinationMessage;
  resultCount: number;
  filterGroups: FilterGroup[];
  page: number;
  pageSize: number;
  queryUUID: string;
  listings: Listing[];
  pinnedListing: any;
  parsedParams: ParsedParams;
  pageCount: number;
  fromRecord: number;
  toRecord: number;
  mapViewport: MapViewport;
  expandedGroups: any[];
  discoveryXploreFeeds: DiscoveryXploreFeeds;
  internalTools: any;
  globalMessages: GlobalMessages;
  percentBooked: any;
}

export interface TypeaheadSuggestion {
  uuid: string;
  term: string;
  name: string;
  __typename: string;
}

export interface Geography {
  lbsId: string;
  gaiaId: string;
  location: Location;
  isGeocoded: boolean;
  shouldShowMapCentralPin: boolean;
  __typename: string;
  name: string;
  description: string;
  primaryGeoType: string;
  breadcrumbs: Breadcrumb[];
}

export interface Location {
  latitude: number;
  longitude: number;
  __typename: string;
}

export interface Breadcrumb {
  name: string;
  countryCode?: string;
  location: Location2;
  primaryGeoType: string;
  __typename: string;
}

export interface Location2 {
  latitude: number;
  longitude: number;
  __typename: string;
}

export interface Destination {
  breadcrumbs: Breadcrumb2[];
  __typename: string;
}

export interface Breadcrumb2 {
  name: string;
  url: string;
  __typename: string;
}

export interface DestinationMessage {
  iconTitleText: IconTitleText;
  iconText: any;
  __typename: string;
}

export interface IconTitleText {
  title: string;
  message: string;
  icon: string;
  messageValueType: string;
  link: any;
  __typename: string;
}

export interface FilterGroup {
  groupInfo: GroupInfo;
  filters: Filter[];
  __typename: string;
}

export interface GroupInfo {
  name: string;
  id: string;
  __typename: string;
}

export interface Filter {
  count: number;
  checked: boolean;
  filter: Filter2;
  __typename: string;
}

export interface Filter2 {
  id: string;
  name: string;
  refineByQueryArgument: string;
  description?: string;
  __typename: string;
  groupId: string;
}

export interface Listing {
  virtualTourBadge?: VirtualTourBadge;
  amenitiesBadges: AmenitiesBadge[];
  multiUnitProperty: boolean;
  images: Image[];
  listingId: string;
  detailPageUrl: string;
  instantBookable: boolean;
  minStayRange: MinStayRange;
  rankedBadges: RankedBadge[];
  propertyId: string;
  propertyMetadata: PropertyMetadata;
  superlativesBadges: SuperlativesBadge[];
  unitMetadata: UnitMetadata;
  webRatingBadges: any[];
  bathrooms: Bathrooms;
  bedrooms: number;
  propertyType: string;
  sleeps: number;
  petsAllowed: boolean;
  spaces: Spaces;
  __typename: string;
  geoDistance: GeoDistance;
  priceSummary: PriceSummary;
  priceSummarySecondary: any;
  priceLabel: any;
  averageRating: number;
  reviewCount: number;
  unitMessage: UnitMessage;
  listingNamespace: string;
  listingNumber: number;
  geoCode: GeoCode;
}

export interface VirtualTourBadge {
  name: string;
  id: string;
  helpText: any;
  __typename: string;
}

export interface AmenitiesBadge {
  name: string;
  id: string;
  helpText: any;
  __typename: string;
}

export interface Image {
  altText: any;
  c6_uri: string;
  c9_uri: string;
  mab?: Mab;
  __typename: string;
}

export interface Mab {
  banditId: string;
  payloadId: any;
  campaignId: string;
  cached: any;
  arm: any;
  __typename: string;
}

export interface MinStayRange {
  minStayHigh: number;
  minStayLow: number;
  __typename: string;
}

export interface RankedBadge {
  id: string;
  helpText: string;
  name: string;
  __typename: string;
}

export interface PropertyMetadata {
  headline: string;
  __typename: string;
  propertyName?: string;
}

export interface SuperlativesBadge {
  id: string;
  helpText: any;
  name: string;
  __typename: string;
}

export interface UnitMetadata {
  unitName: string;
  __typename: string;
}

export interface Bathrooms {
  full: number;
  half: number;
  toiletOnly: number;
  __typename: string;
}

export interface Spaces {
  spacesSummary: SpacesSummary;
  __typename: string;
}

export interface SpacesSummary {
  area: Area;
  __typename: string;
}

export interface Area {
  areaValue?: number;
  __typename: string;
}

export interface GeoDistance {
  text: string;
  relationType: string;
  __typename: string;
}

export interface PriceSummary {
  priceAccurate: any;
  priceTypeId: string;
  edapEventJson: string;
  formattedAmount: string;
  roundedFormattedAmount: string;
  pricePeriodDescription: string;
  __typename: string;
}

export interface UnitMessage {
  iconText: any;
  __typename: string;
}

export interface GeoCode {
  latitude: number;
  longitude: number;
  __typename: string;
}

export interface ParsedParams {
  q: string;
  coreFilters: CoreFilters;
  dates: any;
  sort: any;
  __typename: string;
}

export interface CoreFilters {
  adults: any;
  children: any;
  pets: number;
  minBedrooms: number;
  maxBedrooms: any;
  minBathrooms: number;
  maxBathrooms: any;
  minNightlyPrice: number;
  maxNightlyPrice: any;
  minSleeps: any;
  __typename: string;
}

export interface MapViewport {
  neLat: number;
  neLong: number;
  swLat: number;
  swLong: number;
  __typename: string;
}

export interface DiscoveryXploreFeeds {
  results: any[];
  __typename: string;
}

export interface GlobalMessages {
  alert: any;
  __typename: string;
  banner: any;
}

// store types

export interface ApistoreDataType {
  listings?: Listing[];
  filterGroups?: FilterGroup[];
  error?: unknown;
  propertyTypes?: { name: string; quantity: number }[];
  checkedProperties?: string[];
  currentListing?: Listing;
  currentPage?: number;
  pageInfo?: { totalPages: number; pageSize: number };
  listLoading: boolean,
  setListLoading: (value: boolean) => void,
  setPageInfo: (totalPages: number, pageSize: number) => void
  setCheckedProperties: (checkedProperties?: string[]) => void;
  setListings: (value?: Listing[]) => void;
  setFilterGroups: (value?: FilterGroup[]) => void;
  setError: (error?: unknown) => void;
  setPropertyTypes: (value?: Listing[]) => void;
  setCurrentListing: (value?: Listing) => void;
  setCurrentPage: (value?: number) => void;
  setTotalPages: (value?: number) => void;
}
