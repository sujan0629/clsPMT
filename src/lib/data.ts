
import type { User, Project, Task, Activity, Team } from "@/types";

export const users: User[] = [
  { 
    id: "user-1", 
    name: "Alex Johnson", 
    avatarUrl: "https://placehold.co/100x100.png", 
    role: "Admin",
    title: "Lead Developer",
    email: "alex.johnson@clspmt.com",
    department: "Engineering",
    organization: "Codelits Studio",
    location: "San Francisco, CA"
  },
  { 
    id: "user-2", 
    name: "Maria Garcia", 
    avatarUrl: "https://placehold.co/100x100.png", 
    role: "Manager",
    title: "Project Manager",
    email: "maria.garcia@clspmt.com",
    department: "Product",
    organization: "Codelits Studio",
    location: "New York, NY"
  },
  { 
    id: "user-3", 
    name: "James Smith", 
    avatarUrl: "https://placehold.co/100x100.png", 
    role: "Member",
    title: "UI/UX Designer",
    email: "james.smith@clspmt.com",
    department: "Design",
    organization: "Codelits Studio",
    location: "London, UK"
  },
  { 
    id: "user-4", 
    name: "Patricia Williams", 
    avatarUrl: "https://placehold.co/100x100.png", 
    role: "Member",
    title: "Frontend Developer",
    email: "patricia.williams@clspmt.com",
    department: "Engineering",
    organization: "Codelits Studio",
    location: "Austin, TX"
  },
];

export const teams: Team[] = [
    {
        id: "team-1",
        name: "Engineering",
        members: [users[0], users[3]],
        description: "The core engineering team responsible for building and maintaining the product.",
    },
    {
        id: "team-2",
        name: "Product & Design",
        members: [users[1], users[2]],
        description: "The team responsible for product strategy, roadmapping, and user experience.",
    }
];

export const projects: Project[] = [
  {
    id: "proj-1",
    name: "Website Redesign",
    description: "Complete overhaul of the company website.",
    members: users.slice(0, 3),
    status: "Active",
    deadline: new Date("2024-12-15"),
    progress: 65,
  },
  {
    id: "proj-2",
    name: "Mobile App Development",
    description: "New mobile app for iOS and Android.",
    members: users.slice(1, 4),
    status: "Active",
    deadline: new Date("2025-02-28"),
    progress: 30,
  },
  {
    id: "proj-3",
    name: "Marketing Campaign Q4",
    description: "Q4 marketing push for new products.",
    members: [users[1], users[3]],
    status: "On Hold",
    deadline: new Date("2024-11-30"),
    progress: 10,
  },
];

export const tasks: Task[] = [
  {
    id: "task-1",
    title: "Design new homepage mockups",
    description: "Create 3-4 different mockup designs for the new homepage.",
    status: "In Progress",
    priority: "High",
    assignees: [users[2]],
    dueDate: new Date("2024-09-30"),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    subtasks: [
      { id: "sub-1-1", title: "Wireframing", completed: true },
      { id: "sub-1-2", title: "Visual design", completed: false },
    ],
    comments: [
        { id: "comment-1", author: users[1], content: "Hey @James, how is the progress on this? The deadline is approaching.", timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) },
        { id: "comment-2", author: users[2], content: "@Maria, the wireframes are done. I'm starting on the visual design now. Should have a first draft by EOD tomorrow.", timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    ],
    attachments: [],
    projectId: "proj-1",
    projectName: "Website Redesign",
  },
  {
    id: "task-2",
    title: "Develop user authentication",
    description: "Set up login, signup, and password reset functionality.",
    status: "To Do",
    priority: "High",
    assignees: [users[3]],
    dueDate: new Date("2024-10-15"),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    subtasks: [],
    comments: [],
    attachments: [],
    projectId: "proj-2",
    projectName: "Mobile App Development",
  },
  {
    id: "task-3",
    title: "Finalize marketing copy",
    status: "Done",
    priority: "Medium",
    assignees: [users[1]],
    dueDate: new Date("2024-09-10"),
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    subtasks: [],
    comments: [],
    attachments: [],
    projectId: "proj-3",
    projectName: "Marketing Campaign Q4",
  },
  {
    id: "task-4",
    title: "Setup CI/CD pipeline",
    status: "To Do",
    priority: "Medium",
    assignees: [users[0]],
    dueDate: new Date("2024-09-25"),
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    subtasks: [],
    comments: [],
    attachments: [],
    projectId: "proj-1",
    projectName: "Website Redesign",
  },
  {
    id: "task-5",
    title: "Create UI component library",
    status: "On Hold",
    priority: "High",
    assignees: [users[2], users[3]],
    dueDate: new Date("2024-11-01"),
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
    subtasks: [],
    comments: [],
    attachments: [],
    projectId: "proj-1",
    projectName: "Website Redesign",
  },
  {
    id: "task-6",
    title: "API integration for user profiles",
    status: "To Do",
    priority: "Medium",
    assignees: [users[3]],
    dueDate: new Date("2024-11-10"),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    subtasks: [],
    comments: [],
    attachments: [],
    projectId: "proj-2",
    projectName: "Mobile App Development",
  },
  {
    id: "task-7",
    title: "Deploy staging environment",
    status: "Done",
    priority: "Low",
    assignees: [users[0]],
    dueDate: new Date("2024-09-01"),
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    subtasks: [],
    comments: [],
    attachments: [],
    projectId: "proj-1",
    projectName: "Website Redesign",
  },
    {
    id: "task-8",
    title: "Write end-user documentation",
    status: "To Do",
    priority: "Low",
    assignees: [users[1]],
    dueDate: new Date("2024-12-01"),
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    subtasks: [],
    comments: [],
    attachments: [],
    projectId: "proj-1",
    projectName: "Website Redesign",
  },
];

export const activities: Activity[] = [
    { id: 'act-1', user: users[2], action: 'commented on', target: 'Design new homepage mockups', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    { id: 'act-2', user: users[1], action: 'completed', target: 'Finalize marketing copy', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) },
    { id: 'act-3', user: users[3], action: 'was assigned to', target: 'Develop user authentication', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    { id: 'act-4', user: users[0], action: 'created project', target: 'Website Redesign', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
];
