
export type CompiledRoot<Meta> = {
   uuid: string;
   dir: string;
   public_dir: string;
   meta: Meta;
}

export type Compiled<Meta> = {
   parent_uuid: string;
} & CompiledRoot<Meta>;

export type CompiledCourse = CompiledRoot<{
   title: string;
   image: string;
}>;

export type CompiledLesson = Compiled<{
   title: string;
   image?: string; // TODO: remove optional type
}>;

export type CompiledSlide = Compiled<{
   title: string;
   image: string;
   code: string;
   copy: string;
}>;