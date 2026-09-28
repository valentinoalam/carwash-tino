
import { Comment } from "@/types/blog";

export const commentsData: Record<string, Comment[]> = {
  "1": [
    {
      id: "c1",
      author: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face"
      },
      content: "Excellent article! The TypeScript examples really helped me understand how to properly type React components. I've been struggling with this for weeks.",
      createdAt: "2024-05-26",
      likes: 12,
      replies: [
        {
          id: "r1",
          author: {
            name: "Alex Thompson",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          },
          content: "Thanks David! I'm glad the examples were helpful. TypeScript can definitely be tricky at first, but it's so worth it once you get the hang of it.",
          createdAt: "2024-05-26",
          likes: 5
        }
      ]
    },
    {
      id: "c2",
      author: {
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      content: "The performance optimization section is gold! I implemented React.memo in my project and saw a 30% improvement in render times.",
      createdAt: "2024-05-25",
      likes: 8
    },
    {
      id: "c3",
      author: {
        name: "James Chen",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
      },
      content: "Great comprehensive guide! Could you do a follow-up article about state management with Redux Toolkit?",
      createdAt: "2024-05-25",
      likes: 15
    }
  ],
  "2": [
    {
      id: "c4",
      author: {
        name: "Lisa Park",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      content: "As a fellow designer, I completely agree with these principles. The whitespace examples really drive home the point about breathing room in design.",
      createdAt: "2024-05-22",
      likes: 18,
      replies: [
        {
          id: "r2",
          author: {
            name: "Sarah Chen",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
          },
          content: "Thank you Lisa! Whitespace is often underestimated, but it's one of the most powerful tools we have as designers.",
          createdAt: "2024-05-22",
          likes: 7
        }
      ]
    },
    {
      id: "c5",
      author: {
        name: "Robert Taylor",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
      },
      content: "I've been overcomplicating my designs for years. This article opened my eyes to the power of simplicity. Thank you!",
      createdAt: "2024-05-21",
      likes: 11
    }
  ],
  "3": [
    {
      id: "c6",
      author: {
        name: "Jennifer Adams",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face"
      },
      content: "Our company just went fully remote and this article couldn't have come at a better time. The communication strategies section is particularly valuable.",
      createdAt: "2024-05-17",
      likes: 22,
      replies: [
        {
          id: "r3",
          author: {
            name: "Michael Rodriguez",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
          },
          content: "I'm so glad this was helpful for your transition! Remote work is definitely a learning curve, but with the right approach, it can be incredibly rewarding.",
          createdAt: "2024-05-17",
          likes: 9
        }
      ]
    },
    {
      id: "c7",
      author: {
        name: "Tom Johnson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      content: "The well-being section really resonates with me. Setting boundaries has been my biggest challenge working from home.",
      createdAt: "2024-05-16",
      likes: 14
    }
  ],
  "4": [
    {
      id: "c1",
      content:
        "Great article! I've been washing my car wrong for years. The two-bucket method makes so much sense now.",
      author: {
        id: "u1",
        name: "John Smith",
        avatar: "/man-avatar-2.png",
        bio: "Car enthusiast",
      },
      createdAt: "2024-01-16",
      likes: 12,
      replies: [
        {
          id: "c1r1",
          content: "I know right! It's amazing how much difference proper technique makes.",
          author: {
            id: "u2",
            name: "Lisa Wang",
            avatar: "/diverse-woman-avatar.png",
            bio: "Weekend detailer",
          },
          createdAt: "2024-01-16",
          likes: 5,
        },
      ],
    },
    {
      id: "c2",
      content:
        "Do you have any recommendations for specific soap brands? I want to make sure I'm using quality products.",
      author: {
        id: "u3",
        name: "David Miller",
        avatar: "/man-avatar.png",
        bio: "New car owner",
      },
      createdAt: "2024-01-17",
      likes: 8,
    },
  ],
  "5": [
    {
      id: "c3",
      content: "Living in Minnesota, this article is a lifesaver! Road salt is brutal on cars here.",
      author: {
        id: "u4",
        name: "Jennifer Adams",
        avatar: "/woman-avatar-2.png",
        bio: "Cold weather survivor",
      },
      createdAt: "2024-01-11",
      likes: 15,
    },
  ],
  "6": [
    {
      id: "c4",
      content: "The steam cleaning tip is gold! My car's interior has never looked better.",
      author: {
        id: "u5",
        name: "Robert Chen",
        avatar: "/man-avatar-2.png",
        bio: "DIY enthusiast",
      },
      createdAt: "2024-01-06",
      likes: 10,
    },
  ],
};
