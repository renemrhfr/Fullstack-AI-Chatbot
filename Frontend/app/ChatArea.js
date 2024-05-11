"use client"

import React, { useState, useRef, useEffect } from 'react';
import styles from "./page.module.css";
import ChatInputField from './ChatInputField';

function ChatArea() {
    const initialMessages = [
        {message: 'Hi, my name is C3PO! Ask me something.', isUser: false}
        
    ];

    const [items, setItems] = useState(initialMessages);
    const messagesEndRef = useRef(null); 

    const handleSendMessage = async (newMessage) => {
        setItems(prevItems => [...prevItems, {
            message: newMessage,
            isUser: true
        }]);

        const appendToLastMessage = (additionalText) => {
            setItems(prevItems => {
                if (prevItems.length === 0) {
                    return prevItems;
                }
                const lastItem = {...prevItems[prevItems.length - 1]};
                lastItem.message += additionalText;
                return [...prevItems.slice(0, -1), lastItem];
            });
        };
        setItems(prevItems => [...prevItems, {
            message: "",
            isUser: false
        }]);

        const data = JSON.stringify({
            prompt: newMessage
        });

        try {
            const response = await fetch('http://localhost:5601/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: data
            });
            if (response.ok) {
            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            reader.read().then(function processText({ done, value }) {
                if (done) {
                    return;
                }
        const chunk = decoder.decode(value, {stream: true});
        let json_chunk = JSON.parse(chunk)
        console.log(json_chunk)
        if (json_chunk.done) {
            return;
        }
        appendToLastMessage(json_chunk.response);
        reader.read().then(processText);          
                });
            } else {
                setItems(prevItems => [...prevItems, {
                    message: `Failed to call Large Language Model. Status Code: ${response.status}`,
                    isUser: false
                }]);
            }
        } catch (error) {
            appendToLastMessage("Failed to send message:");
        }
    };
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [items]);
    
    return (
        <div className={styles.messageArea}>
            <div className={styles.messagesList} ref={messagesEndRef}>
                {items.map((item, index) => (
                    <p key={index} className={item.isUser ? styles.userMsg : styles.botMsg}>
                        <b>{item.isUser ? "You: " : "C3PO: "} </b><br/> {item.message}
                    </p>
                ))}
            </div>
                <div className={styles.chatinput}>
                    <ChatInputField onSendMessage={handleSendMessage} />
                </div>
        </div>
    );
}

export default ChatArea;
