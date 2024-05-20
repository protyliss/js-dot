import {DotNodes} from './dot-nodes';
import {Dot} from '../classes/dot';

export type DotGetter<T = any> = ($: Dot & DotNodes) => T;
