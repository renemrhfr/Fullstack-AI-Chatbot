"use client"

import React, { useState } from 'react';
import styles from './page.module.css';

function ChatInputField({ onSendMessage }) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      event.preventDefault();
      onSendMessage(inputValue);
      setInputValue(''); 
    }
  };

  return (
    <div>
    <input
      type="text"
      className={styles.chattextfield}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyPress}
      placeholder="Ask me something..."
    />
    </div>
  );
}

export default ChatInputField;
