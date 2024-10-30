'use client'

import { useState } from 'react'
import { usePostContext } from '@/context/post-context'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface NewPostFormProps {
  userId: number;
}

export function NewPostForm({ userId }: NewPostFormProps) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const { addPost } = usePostContext()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newPost = {
      id: Date.now(), // This is a temporary ID
      userId,
      title,
      body,
    }
    addPost(newPost)
    setTitle('')
    setBody('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <Input placeholder="Post title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <Textarea
        placeholder="Post body"
        value={body}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)}
        required
      />
      <Button type="submit">Create Post</Button>
    </form>
  )
}

export default NewPostForm
