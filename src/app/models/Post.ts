export interface Post {
  userId: number;
  id: string;
  title: string;
  body: string;
}


export interface PostRequest {
  userId: number;
  title: string;
  body: string;
}