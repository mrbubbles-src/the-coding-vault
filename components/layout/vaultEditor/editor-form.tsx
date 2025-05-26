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
import { OutputData } from '@editorjs/editorjs';
import { toast } from 'sonner';

interface IEditorFormValues {
  title: string;
  slug: string;
  categoryId: string;
  content: string;
  authorId: string;
  order: number;
  categories: ICategories[];
}

const EditorForm = ({
  editorOutput,
  authorId,
  maxOrder,
  categories = [] as ICategories[],
}: {
  editorOutput: () => Promise<OutputData | undefined>;
  authorId: string;
  maxOrder: number;
  categories: ICategories[];
}) => {
  const form = useForm<IEditorFormValues>({
    defaultValues: {
      title: '',
      slug: '',
      categoryId: '',
      content: '',
      authorId: authorId || 'unknown',
      order: maxOrder + 1 || 0,
    },
  });

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
      formData.append('order', values.order.toString());

      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
      const response = await fetch('/api/vault/save-entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      if (!response.ok) {
        const errorText = await response.json();
        console.error(
          'Error saving entry:',
          errorText.message || 'Unknown error',
        );
        toast.error(`${errorText.message || 'Failed to save entry.'}`);
        return;
      }
      const data = await response.json();
      console.log('Entry saved successfully:', data);
      toast.success(`${data.message || 'Entry saved successfully!'}`);
    } catch (error) {
      console.error('Error saving editor content:', error);
      toast.error('An error occurred while saving the entry.');
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
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sorting Order</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Sorting Order" {...field} />
                </FormControl>
                <FormDescription className="min-h-[3rem]">
                  Currently,{' '}
                  <span className="font-bold text-amber-400">{maxOrder}</span>{' '}
                  is the highest{' '}
                  <span className="font-bold text-amber-400">order value</span>{' '}
                  for sorting vault entries. If you leave it as is, it will be
                  set to{' '}
                  <span className="font-bold text-amber-400">
                    {maxOrder + 1}
                  </span>{' '}
                  by default.
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
