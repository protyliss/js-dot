import {DotNodes} from './dot-nodes';
import {Dot} from '../classes/dot';

export type DotSetter = ($: Dot & DotNodes) => void;
