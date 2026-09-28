"use client"
import React from 'react';
import ChatCircleDotsIcon from '../common/chat-icon'; // Adjust path as needed

function FloatingChatButton() {
  const handleClick = () => {
    // Implement your chat functionality here, e.g., open a chat widget
    alert("Chat functionality coming soon!"); // Replace with actual chat logic or modal
  };

  return (
    <div className="fixed bottom-5 right-5 z-50"> {/* Added fixed positioning and z-index */}
      <button
        className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-5 bg-[#f3c334] text-[#181611] text-base font-bold leading-normal tracking-[0.015em] min-w-0 gap-4 pl-4 pr-6 shadow-lg" // Added shadow for better visibility
        onClick={handleClick}
      >
        <ChatCircleDotsIcon />
        <span className="truncate">Chat with us</span>
      </button>
    </div>
  );
}

export default FloatingChatButton;