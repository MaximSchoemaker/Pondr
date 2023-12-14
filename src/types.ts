
export type CompiledRoot<Meta> = {
   uuid: string;
   dir: string;
   public_dir: string;
   meta: Meta;
}

export type CompiledPreview = {
   type: "image" | "video";
   file: string;
};

export type CompiledCourse = CompiledRoot<{
   title: string;
   preview: CompiledPreview;
}>;


export type Compiled<Meta> = {
   parent_uuid: string;
} & CompiledRoot<Meta>;

export type CompiledLesson = Compiled<{
   title: string;
   image?: string; // TODO: remove optional type
}>;

export type CompiledSlide = Compiled<{
   title: string;
   image: string;
   copy: string;
   code: string;
   lib?: string;
   explicit_setup?: boolean;
}>;