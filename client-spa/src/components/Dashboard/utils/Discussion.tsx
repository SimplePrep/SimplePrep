import React, {useState, useEffect} from 'react'
import {BsMoon, BsEye, BsChat} from 'react-icons/bs';
import { MdAccessTime } from 'react-icons/md';
import { Editor } from 'react-draft-wysiwyg'; // Assuming you're using 'react-draft-wysiwyg' for rich text
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw} from 'draft-js';
import { AiOutlineLike } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import draftToHtml from 'draftjs-to-html';
import { stateFromHTML } from 'draft-js-import-html';
import { stateToHTML } from 'draft-js-export-html';
import { toolbarOptions } from './analytics_components/ToolBarOptions';

interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    views: number;
    likes: number;
    date: string;
    replies: Reply[];
  }
  
  interface Reply {
    id: number;
    author: string;
    content: string;
    date: string;
  }


  const samplePosts: Post[] = [
  {
    id: 1,
    title: "Strategies for tackling complex algebraic equations?",
    content: "public static List wordConcatenation(String inputString, String [] wordsList) { List resultIndices = new ArrayList(); Map givenWordsMap = new HashMap(); int noOfWords = wordsList.length; int wordLength = wordsList[0].length(); int resultStringLength = wordLength * noOfWords; for(String s : wordsList) givenWordsMap.put(s, givenWordsMap.getOrDefault(s, 0) + 1); for(int i = 0; i < wordLength; i++) { Map foundWordsMap = new HashMap(); int leftWindow = i; int matchCount = 0; for(int rightWindow = leftWindow; rightWindow",
    author: 'Mike Johnson',
    views: 157,
    likes: 42,
    date: "2023-09-10",
    replies: [
      { id: 1, author: 'Mark Gaethgi', content: "Start by simplifying the equation as much as possible, then isolate the variable.", date: "2023-09-11" },
      { id: 2, author: 'Kamila K', content: "Don't forget to check your solutions by substituting them back into the original equation.", date: "2023-09-12" },
    ],
  },
  {
    id: 2,
    title: 'public static List wordConcatenation(String inputString, String [] wordsList) { ...',
    content: "public static List wordConcatenation(String inputString, String [] wordsList) { List resultIndices = new ArrayList(); Map givenWordsMap = new HashMap(); int noOfWords = wordsList.length; int wordLength = wordsList[0].length(); int resultStringLength = wordLength * noOfWords; for(String s : wordsList) givenWordsMap.put(s, givenWordsMap.getOrDefault(s, 0) + 1); for(int i = 0; i < wordLength; i++) { Map foundWordsMap = new HashMap(); int leftWindow = i; int matchCount = 0; for(int rightWindow = leftWindow; rightWindow",
    author: 'Harry Kein',
    views: 200,
    likes: 35,
    date: "2023-08-25",
    replies: [
      { id: 1, author: 'John Johnson', content: "Always read the questions first, so you know what to look for in the passage.", date: "2023-08-26" },
      { id: 2, author: 'OpenAi',  content: "Highlight or underline key information as you read.", date: "2023-08-27" },
    ],
  },
  {
    id: 3,
    title: "How to improve your score in quantitative sections?",
    content: "This needs a code comment on the first loop's signature.",
    author: 'Mike Johnson',
    views: 182,
    likes: 60,
    date: "2023-10-05",
    replies: [
      { id: 1, author: 'Antrophic', content: "Practice, practice, practice. The more you're familiar with the question patterns, the better.", date: "2023-10-06" },
      { id: 2, author: 'Google Gemini', content: "Time management is crucial. Work on pacing yourself to ensure you can attempt all questions.", date: "2023-10-07" },
    ],
  },
  {
    id: 4,
    title: "How to improve your score in quantitative sections?",
    content: "This needs a code comment on the first loop's signature.",
    author: 'Hellary Klinton',
    views: 95,
    likes: 28,
    date: "2023-07-19",
    replies: [
      { id: 1, author: 'Antrophic',content: "It's helpful to a point, but understanding context and how to determine meaning is more important.", date: "2023-07-20" },
      { id: 2, author: 'Google Gemini', content: "Flashcards can be a great tool for memorization, but also try to read extensively to see new words in context.", date: "2023-07-21" },
    ],
  },
  {
    id: 5,
    title: "How to improve your score in quantitative sections?",
    content: "This needs a code comment on the first loop's signature.",
    author: 'Hellary Klinton',
    views: 95,
    likes: 28,
    date: "2023-07-19",
    replies: [
      { id: 1, author: 'Azim', content: "It's helpful to a point, but understanding context and how to determine meaning is more important.", date: "2023-07-20" },
      { id: 2, author: 'Google Gemini', content: "Flashcards can be a great tool for memorization, but also try to read extensively to see new words in context.", date: "2023-07-21" },
    ],
  },
];

interface DiscussionProps {
    title: string;
    onClose: () => void;
}

const Discussion:React.FC<DiscussionProps> = ({onClose, title}) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);

    const [currentView, setCurrentView] = useState<'post' | 'postView' | 'addPost'>('post');
    
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [posts, setPosts] = useState<Post[]>(samplePosts);
    const [newPostTitle, setNewPostTitle] = useState(''); // For storing new post title

    const [isEditingReply, setIsEditingReply] = useState(false);
    const [replyToEdit, setReplyToEdit] = useState<Reply | null>(null);

    const [isEditingPost, setIsEditingPost] = useState(false);
    const [postToEdit, setPostToEdit] = useState<Post | null>(null);
    const [editedPostTitle, setEditedPostTitle] = useState('');

    const darkModeClass = isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-black';
    const animationClass = fadeIn ? 'animate-fadeIn' : 'opacity-0';
    const postBgClass = isDarkMode ? 'bg-gray-400 text-gray-800' : 'bg-slate-200'

    const toggleDarkMode = () => { 
        setIsDarkMode(!isDarkMode)
        };
    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeIn(true);
        }, 300); 
        return () => clearTimeout(timer);
        }, []);
    useEffect(() => {
        if (selectedPost) {
            const postIndex = posts.findIndex(post => post.id === selectedPost.id)
            if (postIndex !== -1){
                setSelectedPost(posts[postIndex]);
            }
        }
    }, [posts, selectedPost])

    
    const handleAddReply = () => {
        if (selectedPost == null) return;

        const contentState = editorState.getCurrentContent();
        const rawContent = contentState.getPlainText();
        const isEditorEmpty = contentState.getPlainText().trim().length === 0;

        if (isEditorEmpty) {
            return;
        }

        const newReply: Reply = {
            id: Date.now(),
            author: 'Current User',
            content: rawContent,
            date: new Date().toISOString().split('T')[0]
        };

        const updatedPosts = posts.map((post) =>
            post.id === selectedPost.id
                ? { ...post, replies: [...post.replies, newReply] }
                : post   
        );
        setPosts(updatedPosts);
        setEditorState(EditorState.createEmpty());
    };

    const handleDeleteReply = (replyId: number) => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === selectedPost?.id
                    ? {
                        ...post,
                        replies: post.replies.filter(reply => reply.id !== replyId),
                    }
                    : post
            )
        );
    };
    const handleEditReply = (reply: Reply) => {
        setIsEditingReply(true);
        setReplyToEdit(reply);
        const contentState = stateFromHTML(reply.content);
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
    };
    const handleSaveEditedReply = () => {
        if (!selectedPost || !replyToEdit) return;
      
        const contentState = editorState.getCurrentContent();
        const htmlContent = contentState.getPlainText();
      
        setPosts(prevPosts =>
          prevPosts.map(post =>
            post.id === selectedPost.id
              ? {
                  ...post,
                  replies: post.replies.map(reply =>
                    reply.id === replyToEdit.id
                      ? { ...reply, content: htmlContent }
                      : reply
                  ),
                }
              : post
          )
        );
      
        setIsEditingReply(false);
        setReplyToEdit(null);
        setEditorState(EditorState.createEmpty());
      };
    
    const handleAddPost = () => {
        const contentState = editorState.getCurrentContent();
        const isEditorEmpty = !contentState.hasText();
        const isTitleEmpty = !newPostTitle.trim();
        
        if (isEditorEmpty || isTitleEmpty) {
            alert("Please fill in both title and content for the post.");
            return;
        }
        const rawContent = contentState.getPlainText();
    
        const newPost: Post = {
          id: Date.now(), // Simple ID generation for example
          title: newPostTitle,
          content: rawContent,
          author: 'Current User', // Example author, this should be dynamically set
          views: 0,
          likes: 0,
          date: new Date().toISOString().split('T')[0],
          replies: [],
        };
    
        setPosts(prevPosts => [...prevPosts, newPost]);
        setNewPostTitle('');
        setEditorState(EditorState.createEmpty());
        setCurrentView('post'); // Or any view you'd like to return to
      };
    
      const handleDeletePost = (postId: number) => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    };
    const handleEditPost = (post: Post) => {
        setIsEditingPost(true); // Mark that we're now editing a post
        setPostToEdit(post); // Set the currently editing post
        setEditedPostTitle(post.title);
        // Initialize the editorState with post content if necessary
        // Assuming the post.content is HTML and you're using draft-js-import-html
        const contentState = stateFromHTML(post.content);
        const newEditorState = EditorState.createWithContent(contentState);
        setEditorState(newEditorState);
      };
    const handleSaveEditedPost = () => {
        if (!postToEdit) {
            return;
        }
    
        const contentState = editorState.getCurrentContent();
        const content = contentState.getPlainText(); // Get plain text content
    
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postToEdit.id
                    ? { ...post, title: editedPostTitle, content: content }
                    : post
            )
        );
    
        setIsEditingPost(false);
        setPostToEdit(null);
        setEditedPostTitle('');
        setEditorState(EditorState.createEmpty());
    };
    

  return (
    
    <div className={`fixed inset-0 bg-gray-600  bg-opacity-50 overflow-y-auto h-full w-full z-50  ${animationClass}`}>
        <div className={`relative top-20 mb-8 max-w-[1400px] mx-auto p-5 border shadow-lg rounded-2xl ${darkModeClass}`}>
            <div className='flex p-5 justify-between items-center'>
                <div className='mx-5 flex gap-10 items-center'>
                <p className='font-semibold  text-3xl'>Discussion of <span>{title}</span></p>
                <button onClick={toggleDarkMode} className="text-lg p-3 border-2 rounded-2xl hover:bg-[#00df9a] hover:border-blue-500">
                    <BsMoon />
                </button>

                </div>
                <div className='flex justify-end items-center gap-5'>
                    {currentView === 'post' && (
                        <button className='py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg'
                        onClick={() => {
                            setCurrentView('addPost');
                        }}    >Add Post
                        </button>
                    )}
                    {currentView === 'postView' && (
                        <button className='flex gap-2 items-center py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg' onClick={() => setCurrentView('post')}><IoArrowBackCircleOutline size={30}/>Back to Posts</button>
                    )}
                    {currentView === 'addPost' && (
                        <button className='flex gap-2 items-center py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg' onClick={() => setCurrentView('post')}><IoArrowBackCircleOutline size={30}/>Back to Posts</button>
                    )}
                    <button onClick={onClose} className='py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg'>Exit</button>
                </div>
            </div>
            <hr className="border-gray-300 border-[1px]"/>
            {currentView === 'addPost' && (
                <div className="flex flex-col gap-5  bg-slate-100 p-2">
                    <div className='w-full'>
                        <input
                            type="text"
                            placeholder="Post Title"
                            value={newPostTitle}
                            onChange={(e) => setNewPostTitle(e.target.value)}
                            className="py-5 px-10 w-full border-2 rounded-2xl border-gray-400" // Replace with your actual class
                        />
                    </div>
                    <div className='rounded-2xl bg-gray-300 p-2'>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                        toolbar = {toolbarOptions}
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
                    {posts.map(post => (
                        <div key={post.id} 
                            className={`p-5 cursor-pointer  mt-5 rounded-lg shadow ${postBgClass}`}
                            onClick ={() => {
                                setSelectedPost(post); 
                                setCurrentView('postView');
                            }}>
                                <p className='text-lg font-bold'>{post.title}</p>
                                <p className='text-md'>{post.author}</p>
                                <div className='pt-3 flex items-center gap-14'>
                                    <span className='flex gap-2 items-center'><BsEye size={20}/>{post.views}</span>
                                    <span className='flex gap-2 items-center'><AiOutlineLike size={25}/>{post.likes}</span>
                                    <span className='flex gap-2 items-center'><MdAccessTime size={25}/>{post.date}</span>
                                    <span className='flex gap-2 items-center'><BsChat size={20}/>{post.replies.length}</span>
                                </div>
                            </div>
                        ))}
                </div>
            )}
            
            {currentView === 'postView' && selectedPost && (
                <div className='flex flex-col gap-5'>
                    <div className={`p-4 rounded-lg m-4 shadow ${postBgClass}`}>
                        <p className='text-lg font-bold'>{selectedPost.title}</p>
                        <div className='flex gap-5'>
                            <p className='text-md'>{selectedPost.author}</p>
                            <span className='flex gap-2 items-center'><MdAccessTime size={25}/>{selectedPost.date}</span>
                        </div>
                        <p className='p-5'>{selectedPost.content}</p>
                        {selectedPost.author === 'Current User' && (
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
                                    <div className="mt-5 flex flex-col gap-5  bg-slate-100 p-2">
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
                                <p>{reply.date}</p>
                                {reply.author === 'Current User' && (
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
                ) }
                {!isEditingPost && ( isEditingReply ? (
                    <div className="my-4 bg-slate-100">
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={setEditorState}
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                            toolbar = {toolbarOptions}
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
                            toolbar = {toolbarOptions}
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
  )
}

export default Discussion;