import Image from "next/image";

type StoryCardProps = {
  title: string;
  content: string;
  image?: string;
}

const StoryCard = ({ title, content, image }: StoryCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-8 md:p-16 shadow-2xl shadow-primary/5 border border-primary/10">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        {image && (
          <div className="relative w-full md:w-2/5 aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        )}
        <div className={`flex-1 ${!image ? 'text-center' : ''}`}>
          <span className="font-gwendolyn text-3xl text-primary mb-2 block">Tâm tình người nông dân</span>
          <h3 className="text-3xl font-bold text-foreground mb-6 leading-tight">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed text-xl font-light italic">
            &ldquo;{content}&rdquo;
          </p>
          <div className="mt-8 flex items-center justify-start gap-4">
             <div className="h-0.5 w-16 bg-primary/20 rounded-full" />
             <span className="text-sm uppercase tracking-widest text-primary font-bold">HTX Minh Duy</span>
          </div>
        </div>
      </div>
      
      {/* Background decoration - subtle organic shapes */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/30 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};

export default StoryCard;
