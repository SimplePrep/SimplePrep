import React, { useState, useRef, useEffect } from 'react';
import { FaCircleArrowUp } from 'react-icons/fa6';
import { useParams } from 'react-router-dom'; // Import useParams to get the sectionSlug from the URL
import NovaHeadshot from '../../../assets/nova_headshot.png';
import { NovaChatService, getSection } from '../../../auth_utils/axios/axiosServices';

interface Message {
  content: Array<{ type: string; value: string | string[] }>;
  isTyping: boolean;
  sender: 'nova' | 'user';
}

interface NovaSpaceProps {
  userSubscription: 'free' | 'nova+' | 'nova pro';
  isDarkMode: boolean;
}

const NovaSpace: React.FC<NovaSpaceProps> = ({ userSubscription, isDarkMode }) => {
  const { sectionSlug } = useParams<{ sectionSlug: string }>(); // Use useParams to get the sectionSlug from the URL
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [sectionTitle, setSectionTitle] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const darkModeClass = isDarkMode ? 'bg-[#1d263b] text-white' : 'bg-gray-100 text-gray-900';
  const novaMessageClass = isDarkMode ? 'bg-gray-700' : 'bg-gray-200';
  const userMessageClass = isDarkMode ? 'bg-blue-700' : 'bg-blue-500 text-white';
  const textareaBgClass = isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900';
  const borderColor = isDarkMode ? 'border-gray-600' : 'border-gray-300';

  const cleanResponseText = (responseText: string): string => {
    let cleanedText = responseText.replace(/\[Tool Call:.*?\]/g, '');
    cleanedText = cleanedText.replace(/【\d+:\d+†source】/g, '');
    return cleanedText.trim();
  };

  const parseResponseContent = (response: string): Array<{ type: string; value: string | string[] }> => {
    return [{ type: 'paragraph', value: response }];
  };

  const typeMessage = (content: Array<{ type: string; value: string | string[] }>): void => {
    let i = 0;
    const messageToType = content.find(item => item.type === 'paragraph')?.value as string;

    const typing = setInterval(() => {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage && lastMessage.isTyping) {
          if (typeof messageToType === 'string') {
            lastMessage.content[0].value = messageToType.substring(0, i);
          }
        }
        return newMessages;
      });
      i++;
      if (i > (messageToType?.length || 0)) {
        clearInterval(typing);
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage && lastMessage.isTyping) {
            lastMessage.isTyping = false;
          }
          return newMessages;
        });
      }
    }, 15);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: [{ type: 'paragraph', value: inputValue }], isTyping: false, sender: 'user' },
      ]);
      setInputValue('');
      resetTextareaHeight();

      try {
        const response = await NovaChatService(inputValue);
        const cleanedResponse = cleanResponseText(response.response);
        const parsedContent = parseResponseContent(cleanedResponse);
        setMessages((prevMessages) => [...prevMessages, { content: parsedContent, isTyping: true, sender: 'nova' }]);
        typeMessage(parsedContent);
      } catch (error) {
        console.error('Error communicating with Nova:', error);
        setMessages((prevMessages) => [
          ...prevMessages, 
          { content: [{ type: 'paragraph', value: "Sorry, something went wrong. Please try again." }], isTyping: false, sender: 'nova' }
        ]);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setInputValue(e.target.value);
    autoResizeTextarea();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const autoResizeTextarea = (): void => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const resetTextareaHeight = (): void => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const fetchSectionData = async () => {
      if (sectionSlug) {
        try {
          const sectionData = await getSection(sectionSlug);
          setSectionTitle(sectionData.title); // Set the section title
          const welcomeMessage = [
            { type: 'paragraph', value: `Welcome to "${sectionData.title}"!` },
          ];
          setMessages([{ content: welcomeMessage, isTyping: true, sender: 'nova' }]);
          typeMessage(welcomeMessage);
        } catch (error) {
          console.error('Error fetching section data:', error);
          const errorMessage = [
            { type: 'paragraph', value: 'Welcome! There was an error loading the section title.' },
          ];
          setMessages([{ content: errorMessage, isTyping: true, sender: 'nova' }]);
          typeMessage(errorMessage);
        }
      }
    };

    fetchSectionData();
  }, [sectionSlug]);

  useEffect(() => {
    autoResizeTextarea();
  }, []);

  const renderContent = (content: Array<{ type: string; value: string | string[] }>) => {
    return content.map((item, index) => {
      switch (item.type) {
        case 'paragraph':
          return <p key={index}>{item.value}</p>;
        case 'list':
          return (
            <ul key={index}>
              {(item.value as string[]).map((li, liIndex) => (
                <li key={liIndex}>{li}</li>
              ))}
            </ul>
          );
        case 'header':
          return <h2 key={index}>{item.value}</h2>;
        default:
          return <p key={index}>{item.value}</p>;
      }
    });
  };

  return (
    <div className={`fixed w-[30%] h-screen ${darkModeClass} border-r-[0.5px] ${borderColor} px-5 py-10 hidden md:block`}>
      <div className="flex flex-col h-full">
        <div className="flex-grow overflow-y-auto space-y-4 my-10" ref={chatContainerRef}>
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.sender === 'nova' ? 'flex-row' : 'flex-row-reverse'} items-start gap-3`}
            >
              {message.sender === 'nova' ? (
                <>
                  <img src={NovaHeadshot} className='w-12 h-12 p-1 bg-blue-600 rounded-3xl' alt="Nova" />
                  {message.isTyping && (
                    <div className="dots-container">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-2 w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full text-white">
                  <span className="text-sm font-semibold">You</span>
                </div>
              )}
              <div className={`p-4 rounded-lg ${message.sender === 'nova' ? novaMessageClass : userMessageClass}`}>
                {renderContent(message.content)}
                {message.isTyping && <span className="animate-pulse">|</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="relative">
          <textarea
            ref={textareaRef}
            rows={1}
            className={`w-full p-4 pr-12 rounded-2xl ${textareaBgClass} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-[1px] ${borderColor} resize-none overflow-hidden`} 
            placeholder="Message Nova" 
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <FaCircleArrowUp
            onClick={handleSendMessage}
            className="absolute right-3 bottom-6 transform cursor-pointer hover:text-blue-600 text-gray-400"
            size={25}
          />
        </div>
      </div>
    </div>
  );
};

export default NovaSpace;
