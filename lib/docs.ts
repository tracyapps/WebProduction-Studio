import { generatedDocs } from '../generated/docs';

export type PublicDoc = {
  slug: string;
  label: string;
  eyebrow: string;
  description: string;
  content: string;
};

export const publicDocs: PublicDoc[] = generatedDocs.map((doc) => ({ ...doc }));

export function getDoc(slug: string) {
  return publicDocs.find((doc) => doc.slug === slug);
}
