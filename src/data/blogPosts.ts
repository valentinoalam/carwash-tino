
import { BlogPost, BlogCategory } from "@/types/blog";

export const categories: BlogCategory[] = [
  {
    id: "tech",
    name: "Technology",
    description: "Latest in tech and programming",
    color: "bg-blue-500"
  },
  {
    id: "design",
    name: "Design",
    description: "UI/UX and visual design",
    color: "bg-purple-500"
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    description: "Life tips and experiences",
    color: "bg-green-500"
  },
  {
    id: "business",
    name: "Business",
    description: "Entrepreneurship and business insights",
    color: "bg-orange-500"
  },
   {
    id: "car-care",
    name: "Car Care",
    color: "bg-[#309be8]",
    description: "Tips and tricks for maintaining your vehicle",
  },
  {
    id: "detailing",
    name: "Detailing",
    color: "bg-green-600",
    description: "Professional detailing techniques and advice",
  },
  {
    id: "maintenance",
    name: "Maintenance",
    color: "bg-purple-600",
    description: "Regular maintenance tips to keep your car running smoothly",
  },
  {
    id: "seasonal",
    name: "Seasonal",
    color: "bg-orange-600",
    description: "Seasonal car care and preparation guides",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Modern Web Applications with React and TypeScript",
    slug: "building-modern-web-applications-react-typescript",
    excerpt: "Learn how to create scalable and maintainable web applications using React 18 and TypeScript. This comprehensive guide covers best practices, performance optimization, and modern development patterns.",
    content: `# Building Modern Web Applications with React and TypeScript

React and TypeScript have become the gold standard for building modern web applications. In this comprehensive guide, we'll explore how to leverage these powerful technologies to create scalable, maintainable, and performant applications.

## Why React and TypeScript?

React provides a component-based architecture that makes it easy to build and maintain complex user interfaces. TypeScript adds static typing to JavaScript, which helps catch errors early and improves code quality.

### Key Benefits:

- **Type Safety**: Catch errors at compile time
- **Better Developer Experience**: Enhanced IDE support and autocomplete
- **Improved Maintainability**: Self-documenting code with type annotations
- **Scalability**: Better suited for large applications

## Setting Up Your Development Environment

\`\`\`bash
# Create a new React app with TypeScript
npx create-react-app my-app --template typescript

# Navigate to the project directory
cd my-app

# Install additional dependencies
npm install @types/react @types/react-dom
\`\`\`

## Component Architecture Best Practices

When building React applications, it's important to follow component architecture best practices:

### 1. Single Responsibility Principle

Each component should have a single responsibility and do one thing well.

\`\`\`tsx
// Good: Single responsibility
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'primary' }) => {
  return (
    <button 
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
\`\`\`

### 2. Props Interface Design

Always define clear interfaces for your component props:

\`\`\`tsx
interface UserCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  onEdit?: (userId: string) => void;
  isEditable?: boolean;
}
\`\`\`

## State Management Patterns

Modern React applications can use various state management patterns:

### Local State with useState

For simple component state:

\`\`\`tsx
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
\`\`\`

### Global State with Context

For shared state across components:

\`\`\`tsx
interface AppContextType {
  user: User | null;
  theme: 'light' | 'dark';
  updateUser: (user: User) => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);
\`\`\`

## Performance Optimization

### 1. React.memo for Component Memoization

\`\`\`tsx
const ExpensiveComponent = React.memo<ExpensiveProps>(({ data }) => {
  // Expensive rendering logic
  return <div>{/* Complex UI */}</div>;
});
\`\`\`

### 2. useMemo and useCallback

\`\`\`tsx
const memoizedValue = useMemo(() => {
  return expensiveCalculation(props.data);
}, [props.data]);

const memoizedCallback = useCallback(() => {
  doSomething(props.id);
}, [props.id]);
\`\`\`

## Testing Strategies

### Unit Testing with Jest and Testing Library

\`\`\`tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

test('renders button with correct text', () => {
  render(<Button onClick={jest.fn()}>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
\`\`\`

## Conclusion

Building modern web applications with React and TypeScript requires understanding best practices, performance optimization techniques, and proper testing strategies. By following these guidelines, you'll be able to create applications that are not only functional but also maintainable and scalable.

The combination of React's component-based architecture and TypeScript's type safety provides a powerful foundation for modern web development. As you continue to build applications, remember to:

- Keep components focused and reusable
- Use TypeScript to your advantage for better code quality
- Implement proper state management patterns
- Optimize for performance when necessary
- Write comprehensive tests

Happy coding! 🚀`,
    author: {
      name: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "Full-stack developer with 8+ years of experience in React and TypeScript"
    },
    publishedAt: "2024-05-25",
    readTime: 12,
    categories: ["tech"],
    tags: ["React", "TypeScript", "Web Development", "Frontend"],
    featuredImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    likes: 147,
    views: 2834
  },
  {
    id: "2",
    title: "The Art of Minimalist UI Design: Less is More",
    slug: "art-of-minimalist-ui-design",
    excerpt: "Discover the principles of minimalist design and how to create clean, functional interfaces that prioritize user experience. Learn about whitespace, typography, and visual hierarchy.",
    content: `# The Art of Minimalist UI Design: Less is More

Minimalist design has become increasingly popular in the digital world, and for good reason. By focusing on essential elements and removing unnecessary clutter, minimalist UI design creates interfaces that are not only visually appealing but also highly functional and user-friendly.

## Understanding Minimalism in UI Design

Minimalism in UI design is about stripping away the non-essential to focus on what truly matters. It's not about creating empty or boring interfaces, but rather about thoughtful reduction and purposeful design decisions.

### Core Principles of Minimalist Design

1. **Functionality over ornamentation**
2. **Clarity and simplicity**
3. **Purposeful use of whitespace**
4. **Limited color palette**
5. **Clean typography**

## The Power of Whitespace

Whitespace, also known as negative space, is one of the most powerful tools in a minimalist designer's arsenal. It's not just empty space—it's an active design element that:

- **Improves readability** by giving text room to breathe
- **Creates visual hierarchy** by separating different elements
- **Reduces cognitive load** by making interfaces less overwhelming
- **Enhances focus** by drawing attention to important elements

### Effective Whitespace Usage

\`\`\`css
/* Good: Generous spacing for readability */
.card {
  padding: 2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.heading {
  margin-bottom: 1.5rem;
  letter-spacing: 0.05em;
}
\`\`\`

## Typography in Minimalist Design

Typography plays a crucial role in minimalist design. Since there are fewer visual elements competing for attention, the text needs to work harder to convey information effectively.

### Choosing the Right Fonts

- **Limit your font choices** to 1-2 typefaces maximum
- **Prioritize readability** over decorative elements
- **Use font weight and size** to create hierarchy
- **Consider system fonts** for better performance

### Typography Hierarchy Example

\`\`\`css
/* Clear typographic hierarchy */
h1 { font-size: 2.5rem; font-weight: 700; line-height: 1.2; }
h2 { font-size: 2rem; font-weight: 600; line-height: 1.3; }
h3 { font-size: 1.5rem; font-weight: 500; line-height: 1.4; }
body { font-size: 1rem; font-weight: 400; line-height: 1.6; }
\`\`\`

## Color in Minimalist Design

A limited color palette is essential in minimalist design. Instead of using many colors, focus on:

### Primary Color Strategy

- **Choose 1-2 primary colors** for your brand
- **Use grayscale** for most UI elements
- **Add color strategically** for emphasis and actions
- **Ensure sufficient contrast** for accessibility

### Color Palette Example

\`\`\`css
:root {
  --primary: #2563eb;
  --gray-900: #111827;
  --gray-600: #4b5563;
  --gray-300: #d1d5db;
  --gray-100: #f3f4f6;
  --white: #ffffff;
}
\`\`\`

## Visual Hierarchy Without Clutter

Creating clear visual hierarchy is crucial when you have fewer design elements to work with:

### Techniques for Clear Hierarchy

1. **Size and scale** - Make important elements larger
2. **Font weight** - Use bold text for emphasis
3. **Color contrast** - Use your accent color sparingly
4. **Spacing** - More space around important elements
5. **Positioning** - Place important items in prime locations

## Common Minimalist Design Mistakes

### 1. Oversimplification

Don't remove so much that the interface becomes unusable or confusing.

### 2. Ignoring Accessibility

Minimalist doesn't mean inaccessible. Ensure sufficient color contrast and clear navigation.

### 3. Lack of Visual Interest

While minimal, your design should still be engaging and reflect your brand personality.

### 4. Poor Information Architecture

Don't hide important information in the name of minimalism.

## Tools and Resources

### Design Tools
- **Figma** - For interface design and prototyping
- **Adobe XD** - Vector-based design tool
- **Sketch** - Mac-only design application

### Inspiration Sources
- **Dribbble** - Design inspiration
- **Behance** - Creative portfolios
- **Minimal Gallery** - Minimalist design showcase

## Real-World Examples

Some excellent examples of minimalist UI design include:

- **Apple's interfaces** - Clean, functional, and intuitive
- **Google's Material Design** - Purposeful minimalism with depth
- **Medium** - Typography-focused reading experience
- **Stripe** - Clean, professional financial interfaces

## Conclusion

Minimalist UI design is about making deliberate choices to create interfaces that are both beautiful and functional. By focusing on essential elements, using whitespace effectively, maintaining clear typography, and applying color strategically, you can create designs that truly embody the principle of "less is more."

Remember, minimalism isn't about removing everything—it's about removing the right things to make what remains more impactful and meaningful.

> "Simplicity is the ultimate sophistication." - Leonardo da Vinci

The art of minimalist design lies in knowing what to leave out, not just what to put in. Master this balance, and you'll create interfaces that users love to interact with.`,
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      bio: "Senior UI/UX Designer with expertise in minimalist design principles"
    },
    publishedAt: "2024-05-20",
    readTime: 8,
    categories: ["design"],
    tags: ["UI Design", "Minimalism", "User Experience", "Typography"],
    featuredImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
    likes: 203,
    views: 3421
  },
  {
    id: "3",
    title: "Building a Sustainable Remote Work Culture",
    slug: "building-sustainable-remote-work-culture",
    excerpt: "Learn how to create and maintain a thriving remote work environment that promotes productivity, collaboration, and employee well-being in the digital age.",
    content: `# Building a Sustainable Remote Work Culture

The shift to remote work has fundamentally changed how we think about workplace culture, team collaboration, and employee engagement. Building a sustainable remote work culture requires intentional effort, the right tools, and a focus on human connection.

## The Foundation of Remote Culture

### Core Values for Remote Success

1. **Trust and Autonomy** - Empower employees to manage their own schedules
2. **Clear Communication** - Over-communicate rather than under-communicate
3. **Results-Oriented** - Focus on outcomes, not hours worked
4. **Flexibility** - Accommodate different working styles and time zones
5. **Continuous Learning** - Invest in skill development and growth

## Communication Strategies

### Establishing Communication Norms

Effective remote work relies heavily on clear, consistent communication:

#### Synchronous vs. Asynchronous Communication

**Synchronous Communication (Real-time):**
- Video meetings for brainstorming and complex discussions
- Instant messaging for quick questions
- Virtual coffee chats for relationship building

**Asynchronous Communication (Time-delayed):**
- Email for formal communications
- Project management tools for status updates
- Recorded videos for training and updates

### Tools for Effective Communication

\`\`\`
Essential Communication Stack:
├── Video Conferencing: Zoom, Google Meet, Microsoft Teams
├── Instant Messaging: Slack, Microsoft Teams, Discord
├── Project Management: Asana, Trello, Monday.com
├── Documentation: Notion, Confluence, Google Workspace
└── File Sharing: Google Drive, Dropbox, OneDrive
\`\`\`

## Creating Connection in a Digital World

### Virtual Team Building Activities

1. **Online Coffee Chats** - Casual 15-minute catch-ups
2. **Virtual Game Sessions** - Online games and trivia
3. **Remote Lunch & Learns** - Educational sessions over lunch
4. **Digital Book Clubs** - Shared reading experiences
5. **Virtual Happy Hours** - End-of-week social time

### Maintaining Company Culture

#### Digital Culture Initiatives

- **Virtual onboarding programs** for new hires
- **Online mentorship programs** for career development
- **Digital recognition systems** for celebrating achievements
- **Remote-first meetings** that include everyone equally
- **Asynchronous culture sharing** through videos and stories

## Productivity and Well-being

### Setting Boundaries

Remote work can blur the lines between personal and professional life. Help employees establish healthy boundaries:

#### Work-Life Balance Strategies

1. **Defined work hours** - Clear start and end times
2. **Dedicated workspace** - Physical separation of work and home
3. **Regular breaks** - Encouraged movement and rest
4. **No-meeting time blocks** - Protected focus time
5. **Digital detox periods** - Time away from screens

### Supporting Mental Health

#### Remote Well-being Programs

- **Virtual fitness classes** and wellness challenges
- **Mental health resources** and counseling services
- **Flexible time off policies** for personal needs
- **Stress management workshops** and mindfulness sessions
- **Regular check-ins** with managers and team members

## Leadership in Remote Environments

### Managing Remote Teams

Effective remote leadership requires a different approach:

#### Key Leadership Qualities

1. **Empathy** - Understanding individual challenges
2. **Flexibility** - Adapting to different working styles
3. **Clarity** - Providing clear expectations and goals
4. **Availability** - Being accessible when needed
5. **Recognition** - Celebrating successes regularly

### Performance Management

#### Remote Performance Indicators

Instead of tracking hours, focus on:
- **Goal completion** and quality of work
- **Communication effectiveness** and collaboration
- **Initiative and proactivity** in problem-solving
- **Learning and development** progress
- **Team contribution** and support

## Technology and Infrastructure

### Essential Remote Work Tools

#### Productivity Stack

\`\`\`javascript
const remoteWorkStack = {
  communication: ['Slack', 'Zoom', 'Microsoft Teams'],
  collaboration: ['Miro', 'Figma', 'Google Workspace'],
  projectManagement: ['Asana', 'Jira', 'Monday.com'],
  development: ['GitHub', 'VS Code Live Share', 'Docker'],
  security: ['VPN', '1Password', 'Two-factor authentication']
};
\`\`\`

### Security Considerations

Remote work introduces new security challenges:

1. **VPN usage** for secure connections
2. **Password management** with tools like 1Password
3. **Regular security training** for employees
4. **Device management** and updates
5. **Data backup** and recovery procedures

## Measuring Success

### Key Metrics for Remote Culture

Track the health of your remote culture through:

#### Quantitative Metrics
- Employee satisfaction surveys
- Productivity and goal completion rates
- Employee retention and turnover
- Meeting effectiveness scores
- Tool adoption and usage

#### Qualitative Indicators
- Quality of team interactions
- Innovation and creativity levels
- Cross-team collaboration
- Learning and development participation
- Overall team morale

## Challenges and Solutions

### Common Remote Work Challenges

#### Challenge 1: Isolation and Loneliness
**Solution:** Regular social interactions, buddy systems, virtual co-working

#### Challenge 2: Communication Gaps
**Solution:** Over-communication, multiple channels, clear protocols

#### Challenge 3: Time Zone Differences
**Solution:** Asynchronous workflows, flexible scheduling, documentation

#### Challenge 4: Technology Issues
**Solution:** IT support, equipment stipends, backup solutions

## Future of Remote Work

### Hybrid Work Models

The future likely includes hybrid arrangements:

- **Flexible office days** for collaboration
- **Home office stipends** for proper setups
- **Co-working space memberships** for variety
- **Team retreats** for in-person connection
- **Digital-first processes** that work anywhere

## Conclusion

Building a sustainable remote work culture is an ongoing process that requires commitment from leadership and participation from all team members. By focusing on trust, communication, well-being, and continuous improvement, organizations can create remote work environments that are not just functional, but thriving.

The key is to remember that culture isn't about where people work—it's about how they work together, support each other, and achieve common goals. With intentional effort and the right approach, remote teams can be just as connected, productive, and successful as traditional in-office teams.

Remember: Remote work isn't just about working from home—it's about reimagining how work gets done in the digital age.`,
    author: {
      name: "Michael Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      bio: "Remote work consultant and organizational culture expert"
    },
    publishedAt: "2024-05-15",
    readTime: 15,
    categories: ["business"],
    tags: ["Remote Work", "Team Culture", "Leadership", "Productivity"],
    featuredImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=400&fit=crop",
    likes: 189,
    views: 2967
  },
  {
    id: "4",
    title: "The Ultimate Guide to Car Washing: Professional Tips for a Spotless Finish",
    slug: "ultimate-guide-car-washing",
    excerpt:
      "Learn the professional techniques used by car wash experts to achieve that perfect, streak-free shine every time.",
    content: `# The Ultimate Guide to Car Washing

Car washing might seem straightforward, but there's an art and science to achieving that perfect, showroom-quality finish. Whether you're washing your car at home or understanding what happens during a professional wash, these tips will help you get the best results.

## Pre-Wash Preparation

Before you even touch your car with soap and water, proper preparation is crucial:

- **Choose the right time**: Wash your car in shade, preferably during cooler parts of the day
- **Rinse thoroughly**: Remove loose dirt and debris with a strong water stream
- **Use the two-bucket method**: One for soapy water, one for rinsing your wash mitt

## The Washing Process

### 1. Start from the top
Always work from top to bottom, allowing gravity to help carry away dirt and soap.

### 2. Use quality products
- pH-neutral car shampoo
- Microfiber wash mitts
- Clean, soft towels for drying

### 3. Rinse frequently
Don't let soap dry on the surface. Rinse each section as you complete it.

## Professional Techniques

At Sparkle & Shine, we use advanced techniques including:
- **Foam cannons** for better soap coverage
- **Clay bar treatment** to remove embedded contaminants
- **Paint-safe drying methods** to prevent swirl marks

## Finishing Touches

The difference between a good wash and a great one lies in the details:
- Clean windows inside and out
- Dress tires and trim
- Apply protective wax or sealant

Remember, regular washing not only keeps your car looking great but also protects your investment by preventing damage from dirt, salt, and environmental contaminants.`,
    featuredImage: "/premium-car-wash-with-wax-application.jpg",
    publishedAt: "2024-01-15",
    readTime: 8,
    views: 1250,
    likes: 89,
    categories: ["car-care"],
    tags: ["washing", "detailing", "maintenance", "tips"],
    author: {
      id: "1",
      name: "Mike Johnson",
      avatar: "/man-avatar.png",
      bio: "Professional car detailer with 15+ years of experience",
    },
  },
  {
    id: "5",
    title: "Winter Car Care: Protecting Your Vehicle from Salt and Snow",
    slug: "winter-car-care-protection",
    excerpt:
      "Essential winter car care tips to protect your vehicle from harsh weather conditions and road salt damage.",
    content: `# Winter Car Care: Protecting Your Vehicle

Winter weather can be brutal on your car. From road salt to freezing temperatures, your vehicle faces unique challenges during the colder months. Here's how to keep it protected and looking great all winter long.

## Pre-Winter Preparation

### Protective Waxing
Apply a high-quality wax or paint sealant before winter arrives. This creates a barrier against:
- Road salt
- Ice and snow
- Harsh cleaning chemicals

### Undercarriage Protection
Don't forget the underside of your car:
- Apply undercarriage coating
- Check for existing rust spots
- Ensure proper drainage

## During Winter Maintenance

### Regular Washing
Contrary to popular belief, winter is when your car needs washing most:
- Wash every 2-3 weeks minimum
- Focus on removing salt buildup
- Don't forget wheel wells and undercarriage

### Interior Protection
- Use all-weather floor mats
- Keep interior dry to prevent mold
- Regular vacuuming prevents salt stains

## Professional Winter Services

At Sparkle & Shine, our winter package includes:
- **Salt removal treatment**
- **Undercarriage flush**
- **Interior protection**
- **Paint protection application**

## Spring Preparation

As winter ends, your car needs special attention:
- Thorough undercarriage cleaning
- Paint inspection and touch-ups
- Deep interior cleaning
- Fresh wax application

Don't let winter weather damage your investment. Regular care during the harsh months will keep your car looking and running great year-round.`,
    featuredImage: "/car-interior-detailing-cleaning.jpg",
    publishedAt: "2024-01-10",
    readTime: 6,
    views: 890,
    likes: 67,
    categories: ["seasonal"],
    tags: ["winter", "protection", "salt", "maintenance"],
    author: {
      id: "2",
      name: "Sarah Chen",
      avatar: "/woman-avatar-2.png",
      bio: "Automotive care specialist and winter driving expert",
    },
  },
  {
    id: "6",
    title: "Interior Detailing: Creating a Showroom-Quality Cabin",
    slug: "interior-detailing-showroom-quality",
    excerpt:
      "Transform your car's interior with professional detailing techniques that will make it look and feel like new.",
    content: `# Interior Detailing: Creating a Showroom-Quality Cabin

Your car's interior is where you spend most of your time, so keeping it clean and fresh is essential for both comfort and resale value. Professional interior detailing goes far beyond a simple vacuum job.

## Assessment and Preparation

### Initial Inspection
Before starting, assess:
- Fabric vs. leather surfaces
- Stain types and severity
- Odor sources
- Wear patterns

### Gather the Right Tools
- Various vacuum attachments
- Microfiber cloths
- Appropriate cleaners for each surface
- Brushes for textured surfaces

## Step-by-Step Process

### 1. Remove Everything
Take out floor mats, personal items, and trash. This gives you complete access to all surfaces.

### 2. Vacuum Thoroughly
- Start with seats and crevices
- Use brush attachments on fabric
- Don't forget under seats and in cup holders

### 3. Clean Surfaces
Different materials require different approaches:
- **Leather**: Specialized cleaners and conditioners
- **Fabric**: Steam cleaning or appropriate shampoos
- **Plastic/Vinyl**: All-purpose cleaners and protectants

### 4. Windows and Mirrors
Clean glass surfaces with streak-free products for optimal visibility.

## Professional Techniques

### Steam Cleaning
Steam effectively:
- Sanitizes surfaces
- Removes stubborn stains
- Eliminates odors naturally

### Ozone Treatment
For persistent odors, ozone treatment:
- Neutralizes smoke and pet odors
- Kills bacteria and mold
- Leaves interior fresh and clean

## Maintenance Tips

Keep your interior looking great:
- Regular vacuuming (weekly)
- Immediate stain treatment
- Use seat covers and floor mats
- Avoid eating in the car

## Our Interior Services

Sparkle & Shine offers comprehensive interior packages:
- **Basic Clean**: Vacuum and wipe down
- **Deep Clean**: Steam cleaning and conditioning
- **Premium Detail**: Complete restoration with protection

A clean interior isn't just about appearance—it's about creating a healthy, comfortable environment for you and your passengers.`,
    featuredImage: "/car-interior-detailing-cleaning.jpg",
    publishedAt: "2024-01-05",
    readTime: 7,
    views: 1100,
    likes: 78,
    categories: ["detailing"],
    tags: ["interior", "detailing", "cleaning", "leather"],
    author: {
      id: "1",
      name: "Mike Johnson",
      avatar: "/man-avatar.png",
      bio: "Professional car detailer with 15+ years of experience",
    },
  },
];
