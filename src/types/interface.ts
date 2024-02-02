export interface CardItemStructure {
  name: string;
  location: { name: string; url: string };
  image: string;
  species: string;
  status: string;
  key: number;
  isLiked: boolean;
  likeChangeHandler: (id: number) => void;
  deleteItemHandler: (id: number) => void;
  id: number;
}
export interface DataStructure {
  name: string;
  location: { name: string; url: string };
  image: string;
  species: string;
  status: string;
  key: number;
  gender: string;
  origin: { name: string; url: string };
  isLiked: boolean;
  id: number;
}
export interface AppLayoutStructure {
  onlyLiked: boolean;
  toggleOnlyLikedHandler: () => void;
  arrayList: DataStructure[];
  likeChangeHandler: (id: number) => void;
  deleteItemHandler: (id: number) => void;
}
