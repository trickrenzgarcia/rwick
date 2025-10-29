'use client';

import { Project } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from './ui/button';
import { ArrowUpRightIcon, Code, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { IconEdit, IconLoader2, IconTrash } from '@tabler/icons-react';
import { toast } from 'sonner';
import * as React from 'react';
import { deleteProject } from '@/actions/delete-actions';
import { Separator } from './ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from './ui/scroll-area';

export default function ProjectCard({ project }: { project: Project }) {
  const [deleteLoading, setDeleteLoading] = React.useState<boolean>(false);
  const { data: session } = useSession();
  const isMobile = useIsMobile();

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      await deleteProject(project.id);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to delete project. Please try again.'
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className='rounded-lg bg-transparent shadow-xs py-3 hover:bg-accent/40  cursor-pointer'>
          <CardContent className='px-4'>
            <Image
              src={project.image}
              alt={project.title}
              width={484}
              height={200}
              className='border border/5 rounded-sm select-none'
            />
          </CardContent>
          <CardHeader className='px-4 py-0'>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
            <div className='flex flex-wrap gap-2'>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className='text-xs bg-gray-100 dark:bg-zinc-900 px-2 py-1 rounded-sm'
                >
                  {tag}
                </span>
              ))}
            </div>
          </CardHeader>
          <CardFooter className='px-4 py-0 justify-between items-center'>
            <div className='flex items-center gap-2'>
              {!project.isPrivate ? (
                <Link href={project.url} target='_blank'>
                  <Button variant='outline' className='rounded-xs'>
                    <Globe /> See Demo
                  </Button>
                </Link>
              ) : (
                <Button variant='outline' className='rounded-xs' disabled>
                  <Globe /> Private
                </Button>
              )}

              {project.repo ? (
                <Link href={project.repo} target='_blank'>
                  <Button variant='outline' className='rounded-xs'>
                    <Code /> Source Code
                  </Button>
                </Link>
              ) : (
                <Button variant='outline' className='rounded-xs' disabled>
                  <Code /> Source Code
                </Button>
              )}
            </div>
            {session?.user ? (
              <div className='flex gap-1'>
                <Button
                  variant='default'
                  className='rounded-xs bg-blue-500/80 text-white hover:bg-blue-500/70'
                  size='sm'
                  disabled={deleteLoading}
                >
                  <IconEdit />
                </Button>
                <Button
                  variant='default'
                  onClick={handleDelete}
                  className='rounded-xs bg-red-500/80 text-white hover:bg-red-500/70'
                  size='sm'
                  disabled={deleteLoading}
                >
                  {deleteLoading ? (
                    <IconLoader2 className='animate-spin' />
                  ) : (
                    <IconTrash />
                  )}
                </Button>
              </div>
            ) : null}
          </CardFooter>
        </Card>
      </SheetTrigger>
      <SheetContent
        className='w-full md:max-w-2xl h-full'
        side={isMobile ? 'top' : 'right'}
      >
        <SheetHeader>
          <SheetTitle className='text-xl'>{project.title}</SheetTitle>
          <SheetDescription className='text-lg text-foreground'>
            {project.subtitle}
          </SheetDescription>
          {project.url && (
            <Link
              className='flex items-center hover:text-purple-500 text-[16px] hover:underline underline-offset-4'
              href={project.url}
              target='_blank'
            >
              {project.url}
              <ArrowUpRightIcon className='size-5' />
            </Link>
          )}
        </SheetHeader>
        <Separator />
        <ScrollArea className='overflow-auto'>
          <div className='px-6 py-4'>
            <Accordion type='multiple' className='w-full' defaultValue={['0']}>
              {project.contents.map((content, index) => (
                <AccordionItem key={`item-${index}`} value={content.id}>
                  <AccordionTrigger className='text-lg'>
                    {content.title}
                  </AccordionTrigger>
                  <AccordionContent className='text-lg leading-relaxed text-balancew-full'>
                    <div className='flex flex-col gap-6'>
                      <p>{content.description}</p>
                      {content.images && <span className='font-semibold'>Certificate</span>}
                      {content.images &&
                        content.images.map((image, imgIndex) => (
                          <Image
                            key={`content-image-${imgIndex}`}
                            src={image}
                            alt={`Content image ${imgIndex + 1}`}
                            width={462}
                            height={300}
                          />
                        ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
