
"use client";

import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BookText, FileText, Type, Pencil, Save, X, Users, Calendar, Shield, ListTodo, Paperclip } from "lucide-react";
import type { FormSchemaType, FocusableField } from '@/app/admin/tasks/new/page';
import { cn } from '@/lib/utils';
import { users } from '@/lib/data';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';

interface TaskPreviewPanelProps {
    focusedField: FocusableField;
    formData: Partial<FormSchemaType>;
    form: UseFormReturn<FormSchemaType>;
}

export function TaskPreviewPanel({ focusedField, formData, form }: TaskPreviewPanelProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState('');

    const handleEditClick = () => {
        const value = focusedField === 'title' ? formData.title : formData.description;
        setEditValue(value || '');
        setIsEditing(true);
    };
    
    const handleSave = () => {
        if (focusedField) {
            form.setValue(focusedField as 'title' | 'description', editValue, { shouldValidate: true, shouldDirty: true });
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };
    
    const getPreviewContent = () => {
        if (isEditing && (focusedField === 'title' || focusedField === 'description')) {
            return (
                <div className="flex flex-col h-full">
                    {focusedField === 'title' ? (
                        <Input 
                            value={editValue} 
                            onChange={(e) => setEditValue(e.target.value)}
                            className="text-2xl font-bold h-auto p-0 border-0 focus-visible:ring-0 bg-transparent shadow-none flex-shrink-0"
                            autoFocus
                        />
                    ) : (
                        <Textarea 
                            value={editValue} 
                            onChange={(e) => setEditValue(e.target.value)}
                            className="text-sm p-0 border-0 focus-visible:ring-0 bg-transparent shadow-none flex-1"
                            autoFocus
                        />
                    )}
                    <div className="flex justify-end gap-2 mt-4 flex-shrink-0">
                        <Button variant="ghost" size="sm" onClick={handleCancel}><X className="mr-2 h-4 w-4"/>Cancel</Button>
                        <Button size="sm" onClick={handleSave}><Save className="mr-2 h-4 w-4"/>Save</Button>
                    </div>
                </div>
            );
        }

        switch (focusedField) {
            case 'title':
                return <p className="text-2xl font-bold break-words">{formData.title || 'Task title will appear here...'}</p>;
            case 'description':
                return <p className="text-sm break-words whitespace-pre-wrap">{formData.description || 'Start typing a description...'}</p>;
            case 'subtasks':
                 return (
                    <div className="space-y-3">
                        {formData.subtasks && formData.subtasks.length > 0 ? (
                            formData.subtasks.map((subtask, index) => (
                                <div key={index} className="flex flex-col p-3 bg-background/50 rounded-md border">
                                    <p className="font-semibold">{subtask.title || `Subtask ${index + 1}`}</p>
                                    <p className="text-sm text-muted-foreground">{subtask.description || 'No description'}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground">No subtasks added yet.</p>
                        )}
                    </div>
                );
            case 'priority':
            case 'dueDate':
            case 'assignees':
                const selectedAssignees = formData.assignees 
                    ? users.filter(u => formData.assignees?.includes(u.id))
                    : [];
                return (
                     <div className="space-y-4 text-sm">
                        {formData.priority && <div><span className="font-semibold">Priority: </span><Badge>{formData.priority}</Badge></div>}
                        {formData.dueDate && <div><span className="font-semibold">Due Date: </span>{format(formData.dueDate, "PPP")}</div>}
                        {selectedAssignees.length > 0 && (
                            <div>
                                <p className="font-semibold mb-2">Assignees:</p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedAssignees.map(user => (
                                        <div key={user.id} className="flex items-center gap-2 p-2 bg-background rounded-md border">
                                            <Avatar className="h-6 w-6">
                                                <AvatarImage src={user.avatarUrl} alt={user.name} />
                                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-xs">{user.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                     </div>
                );
            case 'attachments':
                 return <p className="text-sm text-muted-foreground">Your attachments will be shown here.</p>;

            default:
                return (
                    <div className="text-center text-muted-foreground space-y-3">
                        <BookText className="h-12 w-12 mx-auto" />
                        <h3 className="text-lg font-semibold">Live Preview</h3>
                        <p className="text-sm">Click on a field to see a live preview of your content here.</p>
                    </div>
                );
        }
    };

    const getPreviewHeader = () => {
        switch (focusedField) {
            case 'title':
                return { icon: Type, title: "Task Title Preview" };
            case 'description':
                return { icon: FileText, title: "Description Preview" };
            case 'subtasks':
                return { icon: ListTodo, title: "Subtasks Preview" };
            case 'priority':
                return { icon: Shield, title: "Priority Preview" };
            case 'dueDate':
                return { icon: Calendar, title: "Due Date Preview" };
            case 'assignees':
                return { icon: Users, title: "Assignees Preview" };
            case 'attachments':
                return { icon: Paperclip, title: "Attachments Preview" };
            default:
                return null;
        }
    };

    const header = getPreviewHeader();
    const canBeEdited = focusedField === 'title' || focusedField === 'description';

    return (
        <div className="flex flex-col h-full">
            {header && (
                <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-3 text-muted-foreground">
                        <header.icon className="h-5 w-5" />
                        <h3 className="text-lg font-semibold">{header.title}</h3>
                    </div>
                    {!isEditing && canBeEdited && (
                         <Button variant="outline" size="sm" onClick={handleEditClick}>
                            <Pencil className="mr-2 h-4 w-4"/> Edit
                        </Button>
                    )}
                </div>
            )}
            <div className={cn(
                "flex-1 bg-muted/30 border-2 border-dashed rounded-xl p-8",
                 !header && "flex items-center justify-center",
                 header && "flex flex-col items-start"
            )}>
                <div className="w-full h-full">
                   {getPreviewContent()}
                </div>
            </div>
        </div>
    );
}
