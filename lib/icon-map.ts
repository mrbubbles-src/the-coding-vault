import {
  faHtml5,
  faReact,
  faNodeJs,
  faGithub,
  faCss3Alt,
  faJs,
  IconDefinition,
  faGit,
} from '@fortawesome/free-brands-svg-icons';
import {
  faDatabase,
  faQuestionCircle,
  faServer,
} from '@fortawesome/free-solid-svg-icons';
import { TIconKey } from './types';

export const iconMap: Record<TIconKey, IconDefinition> = {
  git: faGit,
  github: faGithub,
  node: faNodeJs,
  html: faHtml5,
  css: faCss3Alt,
  js: faJs,
  react: faReact,
  backend: faServer,
  database: faDatabase,
  default: faQuestionCircle,
};
