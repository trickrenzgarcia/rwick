import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { addProject } from '@/actions/add-actions';
import { uploadImageToSupabaseServer } from '@/actions/upload-image';
import { toast } from 'sonner';

const schema = z.object({
  title: z.string().min(1, "Project title is required"),
  description: z.string().min(1, "Project description is required"),
  image: z.any().refine((file) => file instanceof File, "Project image is required"),
  url: z.string().url("Project URL must be a valid URL"),
  repo: z.string().url("Project repository must be a valid URL").optional().or(z.literal("")),
  tags: z.array(z.string()).optional(),
  isVisible: z.boolean(),
  isPrivate: z.boolean(),
})

type ProjectFormData = z.infer<typeof schema>;

const selectTags: string[] = [
  "AI",
  "Blockchain",
  "E-Commerce",
  "Firebase",
  "JavaScript",
  "Next.js",
  "PHP",
  "React.js",
  "Shadcn",
  "TailwindCSS",
  "TypeScript",
];

export default function AddProject() {
  const [open, setOpen] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      image: undefined,
      url: '',
      repo: '',
      tags: [],
      isVisible: true,
      isPrivate: false,
    }
  });

  const onSubmit = async (data: ProjectFormData) => {
    try {
      setIsUploading(true);
      
      // Create FormData for secure server-side upload
      const formData = new FormData();
      formData.append('image', data.image);
      
      // Upload image using secure server action
      const uploadResult = await uploadImageToSupabaseServer(formData);
      
      if (!uploadResult.success) {
        throw new Error(uploadResult.error || 'Failed to upload image');
      }
      
      // Create project with the uploaded image URL
      await addProject({
        title: data.title,
        description: data.description,
        image: uploadResult.url!,
        url: data.url,
        repo: data.repo || null,
        tags: data.tags || [],
        isVisible: data.isVisible,
        isPrivate: data.isPrivate,
      });

      toast.success('Project added successfully!');
      setOpen(false);
      form.reset();
      
      // Reset the file input manually
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to add project. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="xs">Add</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Project</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form 
            className='space-y-4'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* ...existing form fields... */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Project Title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Project Description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange, name } }) => (
                <FormItem>
                  <FormLabel>Project Image</FormLabel>
                  <FormControl>
                    <Input 
                      name={name}
                      ref={fileInputRef}
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project URL</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Project URL" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repository URL (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Repository URL (optional)" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {selectTags.map((tag) => (
                        <label key={tag} className="cursor-pointer flex items-center gap-1">
                          <input
                            type="checkbox"
                            value={tag}
                            checked={field.value?.includes(tag)}
                            onChange={(e) => {
                              const newTags = e.target.checked
                                ? [...(field.value || []), tag]
                                : field.value?.filter(t => t !== tag) || [];
                              field.onChange(newTags);
                            }}
                          />
                          <span className="text-sm">{tag}</span>
                        </label>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Project Visibility Options */}
            <div className="space-y-4 p-4 border rounded-md">
              <h4 className="font-medium text-sm">Project Visibility</h4>
              
              <FormField
                control={form.control}
                name="isVisible"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Visible in portfolio</FormLabel>
                      <p className="text-xs text-muted-foreground">
                        Show this project on your public portfolio
                      </p>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isPrivate"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Private project</FormLabel>
                      <p className="text-xs text-muted-foreground">
                        Mark as private (accessible only to you)
                      </p>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter>
              <Button 
                type="submit" 
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Submit'}
              </Button>
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>Cancel</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
