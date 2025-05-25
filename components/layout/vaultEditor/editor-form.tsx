'use client';

import { Button } from '@/components/ui/shadcn/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/shadcn/form';
import { Input } from '@/components/ui/shadcn/input';
import { useForm } from 'react-hook-form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/shadcn/select';
import { ICategories } from '@/types/types';
import { useState, useEffect } from 'react';
import { OutputData } from '@editorjs/editorjs';
import { toast } from 'sonner';

interface IEditorFormValues {
  title: string;
  slug: string;
  categoryId: string;
  content: string;
  authorId: string;
}

const EditorForm = ({
  editorOutput,
  authorId,
}: {
  editorOutput: () => Promise<OutputData | undefined>;
  authorId: string;
}) => {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const form = useForm<IEditorFormValues>({
    defaultValues: {
      title: '',
      slug: '',
      categoryId: '',
      content: '',
      authorId: authorId || 'unknown',
    },
  });
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/vault/categories');
        if (!res.ok) {
          toast.error(
            'Failed to fetch categories. Please check console for details.',
          );
        }
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error(
          'Error fetching categories. Please check console for details.',
        );
      }
    };
    fetchCategories();
  }, []);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;
  const onSubmit = async (values: IEditorFormValues) => {
    try {
      const content = await editorOutput();
      if (content && content.blocks && content.blocks.length === 0) {
        toast.error('It is required to have at least one block in the editor.');
        return;
      }
      const formData = new FormData();
      formData.append('content', JSON.stringify(content));
      formData.append('title', values.title);
      formData.append('slug', values.slug);
      formData.append('categoryId', values.categoryId);
      formData.append('authorId', values.authorId);
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
    } catch (error) {
      console.error('Error saving editor content:', error);
      toast.error(
        'Error saving editor content, please check console for details.',
      );
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            rules={{ required: 'Title is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titel</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Entry Title" {...field} />
                </FormControl>
                <FormDescription className="min-h-[3rem]">
                  This is the title of your entry. It should be descriptive and
                  concise.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            rules={{ required: 'Slug is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Entry Slug" {...field} />
                </FormControl>
                <FormDescription className="min-h-[3rem]">
                  The slug is a URL-friendly version of the title.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            rules={{ required: 'Category is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select a category for your entry. This helps in organizing
                  your content.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Entry'}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EditorForm;
