import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

const useStore = create(
  persist(
  (set, get) => ({
  user: null,
  totalLikes: 0,
  totalComments: 0,
  friends: [],
  posts: [],
  likedPosts:[],
  joinDate:null,

  // Actions
  setUser: (user) => set({ user }),

  setTotalLikes: (likes) => set({ totalLikes: likes }),
  
  setJoinDate: (date) => set({joinDate: date}),
  
  setFriends: (friends) => set({ friends: friends }),
  addFriend: (friend) =>
    set((state) => ({ friends: [...state.friends, friend] })),
  removeFriend: (friendId) =>
    set((state) => ({
      friends: state.friends.filter((friend) => friend.id !== friendId),
    })),
  
  setPosts: (newPosts) => set({ posts: newPosts }),
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  removePost: (postId) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== postId),
    })),
  

  setLikedPosts: (newPosts) => set({ likedPosts: newPosts }),
  addLikedPosts: (post) => set((state) => ({ likedPosts: [...state.likedPosts, post], totalLikes: state.totalLikes + 1,  })),
  removeLikedPosts: (postId) =>
    set((state) => ({
      likedPosts: state.likedPosts.filter((post) => post !== postId),
      totalLikes: state.totalLikes - 1,
    })),

  setTotalComments: (comments) => set({ totalComments: comments }),
  increaseTotalComments: () =>
    set((state) => ({ totalComments: state.totalComments + 1 })),
  reduceTotalComments: () =>
    set((state) => ({ totalComments: state.totalComments - 1 })),

  addLikeToPost: (postId, userId) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          return { ...post, likes: [...post.likes, userId] };
        }
        return post;
      }),
      totalLikes: state.totalLikes + 1,
    })),

  removeLikeFromPost: (postId, userId) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          return { ...post, likes: post.likes.filter((id) => id !== userId) };
        }
        return post;
      }),
      totalLikes: state.totalLikes - 1,
    })),

  addCommentToPost: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          return { ...post, comments: [...post.comments, comment] };
        }
        return post;
      }),
      totalComments: state.totalComments + 1,
    })),

  removeCommentFromPost: (postId, commentId) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment.id !== commentId
            ),
          };
        }
        return post;
      }),
      totalComments: state.totalComments - 1,
    })),

    setUserId: (id) => set((state) => ({
      user: { ...state.user, id: id }
    })),

}),
{
  name: 'gif-storage',
  storage: createJSONStorage(() => sessionStorage)
})
);

export default useStore;
