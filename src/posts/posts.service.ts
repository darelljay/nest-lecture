/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';

export interface PostModel {
    id: number;
    author: string;
    title: string;
    content: string;
    likeCount: number;
    commentCount: number;
  }
  
  let posts: PostModel[] = [
    {
      id: 1,
      author: 'newjeans_official',
      title: '뉴진스 민지',
      content: '메이크업 고치고 있는 민지',
      likeCount: 1000000,
      commentCount: 99999,
    },
    {
      id: 2,
      author: 'newjeans_official',
      title: '뉴진스 혜린',
      content: '노래 연습 하고 있는 혜린',
      likeCount: 1000000,
      commentCount: 99999,
    },
    {
      id: 3,
      author: 'blackpink_official',
      title: '블렉핑크 로제',
      content: '종합공원에서 공연하는 로제',
      likeCount: 1000000,
      commentCount: 99999,
    },
  ];
  
@Injectable()
export class PostsService {
    getAllPosts(){
        return posts;
    }

    getPostById(id:number){
        const post = posts.find((post) => post.id === +id);

        if (!post) {
          throw new NotFoundException();
        }
    
        return post;
    }

    createPost(author:string,title: string,content:string){
        const post : PostModel = {
            id: posts[posts.length-1].id+1,
            author,
            title,
            content,
            likeCount: 0,
            commentCount: 0
          };
      
          posts = [
            ...posts,post
          ]
      
          return post;
    }

    updatePost(postId:number, author:string, title:string, content:string,){
        const post = posts.find(post => post.id === postId);

        if(!post){
          throw new NotFoundException();
        }
    
        if(author){
          post.author = author;
        }
    
        if(title){
          post.title = title;
        }
    
        if(content){
          post.content = content
        }
    
        posts = posts.map(prevPost=>prevPost.id === postId ? post : prevPost);
    
        return post;
    }

    deletePost(id:number){
        const post = posts.find(post => post.id === +id);

        if(!post){
          throw new NotFoundException();
        }
    
    
        posts = posts.filter(post => post.id !== +id);
    
        return id;
    }
}