
"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { projects } from '@/lib/data';
import { format } from 'date-fns';

const deadlineData = projects
    .filter(p => p.status === 'Active')
    .sort((a,b) => a.deadline.getTime() - b.deadline.getTime())
    .map(p => ({
        name: p.name.substring(0, 15) + (p.name.length > 15 ? '...' : ''),
        deadline: p.deadline.getTime(),
        formattedDeadline: format(p.deadline, 'MMM d'),
    }));

export function Deadlines() {
    return (
        <div className="h-[80px]">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={deadlineData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <Tooltip 
                        contentStyle={{ 
                            background: 'hsl(var(--background))', 
                            borderColor: 'hsl(var(--border))',
                            fontSize: '12px'
                        }}
                        labelFormatter={(value) => deadlineData.find(d => d.deadline === value)?.name}
                        formatter={(value, name, props) => [format(new Date(props.payload.deadline), 'PPP'), 'Deadline']}
                    />
                    <Line type="monotone" dataKey="deadline" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
