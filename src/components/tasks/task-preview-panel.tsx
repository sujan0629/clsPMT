
"use client";

import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BookText, FileText, Type, Pencil, Save, X } from "lucide-react";
import type { FormSchemaType, FocusableField } from '@/app/admin/tasks/new/page';
import { cn } from '@/lib/utils';

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
                <div className="space-y-4">
                    {focusedField === 'title' ? (
                        <Input 
                            value={editValue} 
                            onChange={(e) => setEditValue(e.target.value)}
                            className="text-2xl font-bold h-auto p-0 border-0 focus-visible:ring-0 bg-transparent shadow-none"
                            autoFocus
                        />
                    ) : (
                        <Textarea 
                            value={editValue} 
                            onChange={(e) => setEditValue(e.target.value)}
                            className="text-sm min-h-[200px] p-0 border-0 focus-visible:ring-0 bg-transparent shadow-none"
                            autoFocus
                        />
                    )}
                    <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={handleCancel}><X className="mr-2 h-4 w-4"/>Cancel</Button>
                        <Button size="sm" onClick={handleSave}><Save className="mr-2 h-4 w-4"/>Save</Button>
                    </div>
                </div>
            );
        }

        switch (focusedField) {
            case 'title':
                return <p className="text-2xl font-bold break-words">{formData.title || '...'}</p>;
            case 'description':
                return <p className="text-sm break-words whitespace-pre-wrap">{formData.description || 'Start typing a description...'}</p>;
            default:
                return (
                    <div className="text-center text-muted-foreground space-y-3">
                        <BookText className="h-12 w-12 mx-auto" />
                        <h3 className="text-lg font-semibold">Live Preview</h3>
                        <p className="text-sm">Click on a field like 'Title' or 'Description' to see a live preview of your content here.</p>
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
            default:
                return null;
        }
    };

    const header = getPreviewHeader();

    return (
        <div className="flex flex-col h-full">
            {header && (
                <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-3 text-muted-foreground">
                        <header.icon className="h-5 w-5" />
                        <h3 className="text-lg font-semibold">{header.title}</h3>
                    </div>
                    {!isEditing && (
                         <Button variant="outline" size="sm" onClick={handleEditClick}>
                            <Pencil className="mr-2 h-4 w-4"/> Edit
                        </Button>
                    )}
                </div>
            )}
            <div className={cn(
                "flex-1 bg-muted/30 border-2 border-dashed rounded-xl p-8",
                 !header && "flex items-center justify-center"
            )}>
                <div className="w-full">
                   {getPreviewContent()}
                </div>
            </div>
        </div>
    );
}
