import React, { useState, useEffect } from 'react';
import { BsMoon, BsEye, BsChat } from 'react-icons/bs';
import { MdAccessTime } from 'react-icons/md';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import { AiOutlineLike } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { stateFromHTML } from 'draft-js-import-html';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { toolbarOptions } from './analytics_components/ToolBarOptions';
import { getPosts, addPost, deletePost, editPost, addReply, deleteReply, editReply } from '../../utils/axios/axiosServices';
import { useSelector } from 'react-redux';
import { Post, Reply } from '../types';
import { format } from 'date-fns';
import { RootState } from '../../store';
import { auth } from '../../utils/firebaseConfig';

interface DiscussionProps {
  title: string;
  testModuleId: number;
  onClose: () => void;
}

interface ReplyData {
  content: string;
  author_uid: string;
}

const Discussion: React.FC<DiscussionProps> = ({ onClose, title, testModuleId }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [currentView, setCurrentView] = useState<'post' | 'postView' | 'addPost'>('post');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [isEditingReply, setIsEditingReply] = useState(false);
  const [replyToEdit, setReplyToEdit] = useState<Reply | null>(null);
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);
  const [editedPostTitle, setEditedPostTitle] = useState('');
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const user = auth.currentUser;
  const currentUser = user?.displayName || 'Default Name';
  const currentUserUid = user?.uid || 'default-uid';

  const darkModeClass = isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-black';
  const animationClass = fadeIn ? 'animate-fadeIn' : 'opacity-0';
  const postBgClass = isDarkMode ? 'bg-gray-400 text-gray-800' : 'bg-slate-200';

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchPosts = async () => {
        try {
          const data = await getPosts(testModuleId);
          setPosts(data);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };

      fetchPosts();
    }
  }, [isAuthenticated, testModuleId]);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM dd, yyyy');
  };

  const handleAddReply = async () => {
    if (selectedPost == null) return;

    const contentState = editorState.getCurrentContent();
    const rawContent = contentState.getPlainText();
    const isEditorEmpty = contentState.getPlainText().trim().length === 0;

    if (isEditorEmpty) {
      return;
    }

    const newReplyData: ReplyData = {
      content: rawContent,
      author_uid: currentUserUid,
    };

    try {
      const addedReply = await addReply(selectedPost.id, newReplyData);

      const updatedSelectedPost = {
        ...selectedPost,
        replies: [...selectedPost.replies, { ...addedReply, author: currentUser, date: formatDate(new Date().toISOString()) }],
      };
      setSelectedPost(updatedSelectedPost);

      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === selectedPost.id ? updatedSelectedPost : post
        )
      );

      setEditorState(EditorState.createEmpty());
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  const handleDeleteReply = async (replyId: number) => {
    try {
      await deleteReply(replyId);

      const updatedSelectedPost = {
        ...selectedPost!,
        replies: selectedPost!.replies.filter(reply => reply.id !== replyId),
      };
      setSelectedPost(updatedSelectedPost);

      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === selectedPost!.id ? updatedSelectedPost : post
        )
      );
    } catch (error) {
      console.error('Error deleting reply:', error);
    }
  };

  const handleEditReply = (reply: Reply) => {
    setIsEditingReply(true);
    setReplyToEdit(reply);
    const contentState = stateFromHTML(reply.content);
    const editorState = EditorState.createWithContent(contentState);
    setEditorState(editorState);
  };

  const handleSaveEditedReply = async () => {
    if (!selectedPost || !replyToEdit) return;

    const contentState = editorState.getCurrentContent();
    const htmlContent = contentState.getPlainText();

    try {
      await editReply(replyToEdit.id, { content: htmlContent, author_uid: replyToEdit.author_uid });

      const updatedSelectedPost = {
        ...selectedPost,
        replies: selectedPost.replies.map(reply =>
          reply.id === replyToEdit.id ? { ...reply, content: htmlContent, date: formatDate(new Date().toISOString()) } : reply
        ),
      };
      setSelectedPost(updatedSelectedPost);

      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === selectedPost.id ? updatedSelectedPost : post
        )
      );

      setIsEditingReply(false);
      setReplyToEdit(null);
      setEditorState(EditorState.createEmpty());
    } catch (error) {
      console.error('Error saving edited reply:', error);
    }
  };

  const handleAddPost = async () => {
    const contentState = editorState.getCurrentContent();
    const isEditorEmpty = !contentState.hasText();
    const isTitleEmpty = !newPostTitle.trim();

    if (isEditorEmpty || isTitleEmpty) {
      alert('Please fill in both title and content for the post.');
      return;
    }
    const rawContent = contentState.getPlainText();

    const newPostData = {
      test_module: testModuleId,
      title: newPostTitle,
      content: rawContent,
    };

    try {
      const addedPost = await addPost(newPostData, testModuleId);

      setPosts(prevPosts => [...prevPosts, {
        ...addedPost,
        id: addedPost.id,
        replies: [],
        views: 0,
        likes: 0,
        author: currentUser || 'Default Name',
        date: formatDate(addedPost.created_at || new Date().toISOString()),
      } as Post]);
      setNewPostTitle('');
      setEditorState(EditorState.createEmpty());
      setCurrentView('post');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const handleDeletePost = async (postId: number) => {
    try {
      await deletePost(postId);
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      setCurrentView('post');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEditPost = (post: Post) => {
    setIsEditingPost(true);
    setPostToEdit(post);
    setEditedPostTitle(post.title);
    const contentState = stateFromHTML(post.content);
    const newEditorState = EditorState.createWithContent(contentState);
    setEditorState(newEditorState);
  };

  const handleSaveEditedPost = async () => {
    if (!postToEdit) return;

    const contentState = editorState.getCurrentContent();
    const content = contentState.getPlainText();

    try {
      const updatedPost = await editPost(postToEdit.id, {
        title: editedPostTitle,
        content: content,
        test_module: testModuleId
      });

      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postToEdit.id ? { ...post, title: editedPostTitle, content: content, date: formatDate(new Date().toISOString()) } : post
        )
      );

      setSelectedPost(prevPost =>
        prevPost ? { ...prevPost, title: editedPostTitle, content: content, date: formatDate(new Date().toISOString()) } : null
      );

      setIsEditingPost(false);
      setPostToEdit(null);
      setEditedPostTitle('');
      setEditorState(EditorState.createEmpty());
    } catch (error) {
      console.error('Error saving edited post:', error);
    }
  };

  return (
    <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 ${animationClass}`}>
      <div className={`relative top-20 mb-8 max-w-[1400px] mx-auto p-5 border shadow-lg rounded-2xl ${darkModeClass}`}>
        <div className='flex p-5 justify-between items-center'>
          <div className='mx-5 flex gap-10 items-center'>
            <p className='font-semibold text-3xl'>Discussion of <span>{title}</span></p>
            <button onClick={toggleDarkMode} className="text-lg p-3 border-2 rounded-2xl hover:bg-[#00df9a] hover:border-blue-500">
              <BsMoon />
            </button>
          </div>
          <div className='flex justify-end items-center gap-5'>
            {currentView === 'post' && (
              <button className='py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg'
                onClick={() => {
                  setCurrentView('addPost');
                }}>Add Post
              </button>
            )}
            {currentView !== 'post' && (
              <button className='flex gap-2 items-center py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg'
                onClick={() => setCurrentView('post')}><IoArrowBackCircleOutline size={30} />Back to Posts
              </button>
            )}
            <button onClick={onClose} className='py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg'>Exit</button>
          </div>
        </div>
        <hr className="border-gray-300 border-[1px]" />
        {currentView === 'addPost' && (
          <div className="flex flex-col gap-5 bg-slate-100 p-2">
            <div className='w-full'>
              <input
                type="text"
                placeholder="Post Title"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                className="py-5 px-10 w-full border-2 rounded-2xl border-gray-400"
              />
            </div>
            <div className='rounded-2xl bg-gray-300 p-2'>
              <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                toolbar={toolbarOptions}
              />
            </div>
            <div className='justify-center items-center'>
              <button
                onClick={handleAddPost}
                className="mt-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Post
              </button>
            </div>
          </div>
        )}
        {currentView === 'post' && (
          <div>
            {posts.length > 0 ? (
              posts.map(post => (
                <div key={post.id}
                  className={`p-5 cursor-pointer mt-5 rounded-lg shadow ${postBgClass}`}
                  onClick={() => {
                    setSelectedPost(post);
                    setCurrentView('postView');
                  }}>
                  <p className='text-lg font-bold'>{post.title}</p>
                  <p className='text-md'>{post.author}</p>
                  <div className='pt-3 flex items-center gap-14'>
                    <span className='flex gap-2 items-center'><BsEye size={20} />{post.views}</span>
                    <span className='flex gap-2 items-center'><AiOutlineLike size={25} />{post.likes}</span>
                    <span className='flex gap-2 items-center'><MdAccessTime size={25} />{formatDate(post.created_at)}</span>
                    <span className='flex gap-2 items-center'><BsChat size={20} />{post.replies.length}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className={`p-5 mt-5 rounded-lg shadow ${postBgClass}`}>
                <p className='text-lg font-bold'>No posts available.</p>
              </div>
            )}
          </div>
        )}
        {currentView === 'postView' && selectedPost && (
          <div className='flex flex-col gap-5'>
            <div className={`p-4 rounded-lg m-4 shadow ${postBgClass}`}>
              <p className='text-lg font-bold'>{selectedPost.title}</p>
              <div className='flex gap-5'>
                <p className='text-md'>{selectedPost.author}</p>
                <span className='flex gap-2 items-center'><MdAccessTime size={25} />{formatDate(selectedPost.created_at)}</span>
              </div>
              <p className='p-5'>{selectedPost.content}</p>
              {selectedPost.author_uid === currentUserUid && (
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      handleEditPost(selectedPost)
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePost(selectedPost.id);
                      setCurrentView('post');
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              )}
              {isEditingPost && postToEdit && (
                <div className="mt-5 flex flex-col gap-5 bg-slate-100 p-2">
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Post Title"
                      value={editedPostTitle}
                      onChange={(e) => setEditedPostTitle(e.target.value)}
                      className="py-5 px-10 w-full border-2 rounded-2xl border-gray-400"
                    />
                  </div>
                  <div className='rounded-2xl bg-gray-300 p-2'>
                    <Editor
                      editorState={editorState}
                      onEditorStateChange={setEditorState}
                      wrapperClassName="wrapper-class"
                      editorClassName="editor-class"
                      toolbarClassName="toolbar-class"
                      toolbar={toolbarOptions}
                    />
                  </div>
                  <div className='justify-center items-center'>
                    <button
                      onClick={handleSaveEditedPost}
                      className="mt-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Save Edit
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div>
              {selectedPost.replies.map((reply, index) => (
                <div key={`${reply.id}-${index}`} className={`p-4 rounded m-4 shadow ${postBgClass}`}>
                  <div className='flex items-center gap-4'>
                    <FaUserCircle size={30} />
                    <p>{reply.author}</p>
                    <p>{formatDate(reply.updated_at)}</p>
                    {reply.author_uid === currentUserUid && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditReply(reply)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteReply(reply.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  <p className='p-4' style={{ whiteSpace: 'pre-wrap' }}>{reply.content}</p>
                </div>
              ))}
            </div>
            {!isEditingPost && selectedPost.replies.length < 1 && (
              <p>Be first to comment</p>
            )}
            {!isEditingPost && (isEditingReply ? (
              <div className="my-4 bg-slate-100">
                <Editor
                  editorState={editorState}
                  onEditorStateChange={setEditorState}
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class"
                  toolbarClassName="toolbar-class"
                  toolbar={toolbarOptions}
                />
                <button
                  onClick={handleSaveEditedReply}
                  className="mt-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save Edit
                </button>
              </div>
            ) : (
              <div className="my-4 bg-slate-100 p-2">
                <Editor
                  editorState={editorState}
                  onEditorStateChange={setEditorState}
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class"
                  toolbarClassName="toolbar-class"
                  toolbar={toolbarOptions}
                />
                <button
                  onClick={handleAddReply}
                  className="mt-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Comment
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Discussion;
