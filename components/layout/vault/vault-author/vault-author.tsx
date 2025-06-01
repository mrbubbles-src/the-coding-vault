interface VaultAuthorProps {
  author:
    | {
        name?: string;
        email?: string;
        avatar?: string;
        authorSocials?: {
          website?: string;
          github?: string;
          linkedin?: string;
          codepen?: string;
          stackoverflow?: string;
          youtube?: string;
          twitter?: string;
          twitch?: string;
          discord?: string;
          instagram?: string;
          tiktok?: string;
          facebook?: string;
        };
      }
    | string;
}
const VaultAuthor = ({ author }: VaultAuthorProps) => {
  return <div>Author: {typeof author === 'string' ? author : author.name}</div>;
};

export default VaultAuthor;
