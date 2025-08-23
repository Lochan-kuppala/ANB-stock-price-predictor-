import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { Send, Bot, User } from 'lucide-react';
import { ChatMessage } from '../../types';
import { formatRelativeTime } from '../../utils/helpers';
import { mockChatMessages } from '../../utils/mockData';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of chat when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage,
      role: 'user',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI response after delay
    setTimeout(() => {
      let responseText = '';
      
      // Simple response logic based on keywords
      const lowerCaseMsg = newMessage.toLowerCase();
      
      if (lowerCaseMsg.includes('tesla') || lowerCaseMsg.includes('tsla')) {
        responseText = "Tesla (TSLA) currently shows bearish signals with a 68% confidence level for the coming week. The stock is trading below both its 50-day and 200-day moving averages, with MACD indicating a sell signal. Consider your investment timeframe and risk tolerance.";
      } else if (lowerCaseMsg.includes('apple') || lowerCaseMsg.includes('aapl')) {
        responseText = "Apple (AAPL) shows a bullish outlook with 85% confidence for the next week. Technical indicators like MACD are signaling buy, and the price is above both 50-day and 200-day moving averages.";
      } else if (lowerCaseMsg.includes('nvidia') || lowerCaseMsg.includes('nvda')) {
        responseText = "NVIDIA (NVDA) is showing strong bullish momentum with a 92% confidence level for the next month. The company continues to benefit from the AI boom, with demand for its chips outpacing supply. Technical indicators are very positive.";
      } else if (lowerCaseMsg.includes('buy') || lowerCaseMsg.includes('sell') || lowerCaseMsg.includes('invest')) {
        responseText = "When considering investment decisions, it's important to look at both fundamental factors (company financials, growth prospects) and technical indicators (price trends, volume). I recommend diversifying your portfolio and investing based on your risk tolerance and time horizon.";
      } else {
        responseText = "I'd be happy to provide insights on specific stocks or market trends. You can ask about technical analysis, fundamentals, or recent news for any publicly traded company.";
      }
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: responseText,
        role: 'assistant',
        timestamp: new Date().toISOString()
      };
      
      setIsTyping(false);
      setMessages(prev => [...prev, aiMessage]);
    }, 1500);
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Bot className="h-5 w-5 mr-2 text-primary-600" />
          AI Trading Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'assistant' 
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200' 
                    : 'bg-primary-600 text-white'
                }`}
              >
                <div className="flex items-center mb-1">
                  {message.role === 'assistant' ? (
                    <Bot className="h-4 w-4 mr-1" />
                  ) : (
                    <User className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-xs opacity-75">
                    {message.role === 'assistant' ? 'AI Assistant' : 'You'} • {formatRelativeTime(message.timestamp)}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t border-gray-200 dark:border-gray-800">
        <div className="flex w-full space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about stocks, trends, or trading advice..."
            className="flex-grow p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isTyping}
            size="sm"
            variant="primary"
            className="flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatInterface;