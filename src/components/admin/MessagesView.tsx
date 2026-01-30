
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Calendar, CheckCircle, Circle } from 'lucide-react';
import { ContactMessage, fetchContactMessages } from '@/services/contact';
import { format } from 'date-fns';

interface MessagesViewProps {
    onBack: () => void;
}

export const MessagesView: React.FC<MessagesViewProps> = ({ onBack }) => {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMessages = async () => {
            try {
                const data = await fetchContactMessages();
                setMessages(data);
            } catch (error) {
                console.error("Failed to load messages", error);
            } finally {
                setLoading(false);
            }
        };
        loadMessages();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={onBack}>
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Inquiries</h2>
                    <p className="text-muted-foreground">View messages from the contact form.</p>
                </div>
            </div>

            <div className="grid gap-4">
                {loading ? (
                    <div className="text-center py-10">Loading messages...</div>
                ) : messages.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-lg border border-dashed">
                        <p className="text-muted-foreground">No messages found.</p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <Card key={msg.id || Math.random()} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                        <CardTitle className="text-lg">{msg.name}</CardTitle>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${msg.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {msg.status?.toUpperCase() || 'NEW'}
                                        </span>
                                    </div>
                                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {msg.created_at ? format(new Date(msg.created_at), 'PPP p') : 'Unknown Date'}
                                    </div>
                                </div>
                                <CardDescription className="text-sm">
                                    {msg.email} • {msg.phone || 'No Phone'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-3 rounded-md border text-sm">
                                    {msg.message}
                                </p>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};
