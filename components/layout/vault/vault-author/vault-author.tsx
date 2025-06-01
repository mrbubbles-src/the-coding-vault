interface VaultAuthorProps {
  author:
    | {
        name?: string;
        email?: string;
        avatar?: string;
        authorSocials?: {
          website?: string;
          twitter?: string;
          github?: string;
        };
      }
    | string;
}
const VaultAuthor = ({ author }: VaultAuthorProps) => {
  return <div>Author: {typeof author === 'string' ? author : author.name}</div>;
};

export default VaultAuthor;
