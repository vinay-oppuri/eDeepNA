'use client';

import Image from 'next/image';

interface PhylogeneticTreeProps {
  imageUrl: string;
}

export function PhylogeneticTree({ imageUrl }: PhylogeneticTreeProps) {
  return (
    <div>
      <Image
        src={imageUrl}
        alt="Phylogenetic Tree"
        width={500}
        height={500}
        className="rounded-lg border"
      />
    </div>
  );
}
